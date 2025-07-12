import { Injectable, UnauthorizedException, BadRequestException, Inject } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from './dtos/LoginUserDto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dtos/CreateUserDto';
import { ResetPasswordDto } from './dtos/ResetPasswordDto';
import { EmailService } from 'src/email/email.service';
import { TokenFactory } from './tokenFactory';
import { TokenPayload, TokenType } from '../../libs/types/src';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService,
    private readonly tokenFactory: TokenFactory,
    @Inject(CACHE_MANAGER) private cache: Cache
  ) {}

  async login(dto: LoginUserDto): Promise<{ accessToken: string; refreshToken: string; user: any }> {
    const foundUser = await this.userService.findUserByEmail(dto.email);
    if (!foundUser || !bcrypt.compareSync(dto.password, foundUser.hashPassword)) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const profile = await this.userService.getUserProfileById(foundUser.id);
    const isProfileCompleted = this.userService.isProfileCompleted(profile);
    const payload: Omit<TokenPayload, 'iat' | 'exp' | 'type'> = {
      sub: foundUser.id,
      email: foundUser.email,
      role: foundUser.role,
    };
    return {
      accessToken: await this.tokenFactory.signToken(payload, TokenType.ACCESS),
      refreshToken: await this.tokenFactory.signToken(payload, TokenType.REFRESH),
      user: {
        email: foundUser.email,
        id: foundUser.id,
        role: foundUser.role,
        isProfileCompleted,
        name:foundUser.name
      },
    };
  }

  async register(dto: CreateUserDto): Promise<{ accessToken: string; refreshToken: string; user: any }> {
    const existing = await this.userService.findUserByEmailOrNull(dto.email);
    if (existing) throw new BadRequestException('Email already registered');
    const hashPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.userService.createUser({
      email: dto.email,
      hashPassword,
      name: dto.firstName + ' ' + dto.lastName,
    });
    const payload: Omit<TokenPayload, 'iat' | 'exp' | 'type'> = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    return {
      accessToken: await this.tokenFactory.signToken(payload, TokenType.ACCESS),
      refreshToken: await this.tokenFactory.signToken(payload, TokenType.REFRESH),
      user: {
        email: user.email,
        id: user.id,
        role: user.role,
        isProfileCompleted: false,
        name:user.name
      },
    };
  }

  async refresh(user: TokenPayload): Promise<{ accessToken: string; refreshToken: string; user: any }> {
    const foundUser = await this.userService.findUserById(user.sub);
    if (!foundUser) throw new UnauthorizedException('User not found');
    const isProfileCompleted =  await this.userService.isProfileCompleted(foundUser);
    const payload: Omit<TokenPayload, 'iat' | 'exp' | 'type'> = {
      sub: foundUser.id,
      email: foundUser.email,
      role: foundUser.role,
    };
    return {
      accessToken: await this.tokenFactory.signToken(payload, TokenType.ACCESS),
      refreshToken: await this.tokenFactory.signToken(payload, TokenType.REFRESH),
      user: {
        email: foundUser.email,
        id: foundUser.id,
        role: foundUser.role,
        isProfileCompleted,
        name:foundUser.name
      },
    };
  }

  async forgetPassword(dto: Pick<LoginUserDto, 'email'>): Promise<void> {
    const user = await this.userService.findUserByEmail(dto.email);
    if (!user) throw new BadRequestException('User not found');
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await this.cache.set(`otp:reset:${otp}`, user.email, 21300);
    await this.emailService.sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      template: 'password-reset',
      variables: { name: user.name, otp },
      queue: false,
    });
  }

  async resetPassword(dto: ResetPasswordDto): Promise<void> {
    const cacheKey = `otp:reset:${dto.OTPCode}`;
    const email = await this.cache.get<string>(cacheKey);

    console.log('[resetPassword] Checking cacheKey:', cacheKey, '->', email);
    if (!email) {
      throw new BadRequestException('Invalid or expired OTP');
    }
    const user = await this.userService.findUserByEmail(email);
    if (!user) throw new BadRequestException('User not found');
    await this.userService.updateUser(user.id, { hashPassword: await bcrypt.hash(dto.password, 10) });
    await this.cache.del(cacheKey);
  }

  async sendVerificationEmail(user: TokenPayload): Promise<void> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await this.cache.set(`otp:verify:${user.email}`, otp, 21300); // 5 min TTL
    await this.emailService.sendEmail({
      to: user.email,
      subject: 'Verify Your Email',
      template: 'email-verification',
      variables: { name: user.email, verificationUrl: '', ctaText: 'Verify Email', otp },
      queue: false,
    });
  }

  async verifyEmail(dto: { OTPCode: string }, user: TokenPayload): Promise<void> {
    const cachedOtp = await this.cache.get<string>(`otp:verify:${user.email}`);
    if (!cachedOtp || cachedOtp !== dto.OTPCode) {
      throw new BadRequestException('Invalid or expired OTP');
    }
    await this.userService.updateUser(user.sub, { isEmailVerified: true });
    await this.cache.del(`otp:verify:${user.email}`);
  }
}
