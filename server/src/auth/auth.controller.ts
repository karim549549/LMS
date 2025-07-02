import { Controller, Post, Body, Req , Get, UseGuards, Res, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/LoginUserDto';
import { CreateUserDto } from 'src/user/dtos/CreateUserDto';
import { ResetPasswordDto } from './dtos/ResetPasswordDto';
import { CustomRequest } from 'y/types';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { JwtAccessGuard } from './guards/jwt-access.guard';
import { Response } from 'express';
import { buildAuthResponse } from './AuthResponseBuilder';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: LoginUserDto, @Res() res: Response) {
    console.log(dto);
    const result = await this.authService.login(dto);
    return res.json(buildAuthResponse(res, result.accessToken, result.refreshToken, result.user));
  }

  @Post('register')
  async register(@Body() dto : CreateUserDto, @Res() res: Response) {
    const result = await this.authService.register(dto);
    return res.json(buildAuthResponse(res, result.accessToken, result.refreshToken, result.user));
  }

  @Get('refresh') 
  @UseGuards(JwtRefreshGuard)
  async refresh(@Req() req : CustomRequest, @Res() res: Response){
    const result = await this.authService.refresh(req.user);
    return res.json(buildAuthResponse(res, result.accessToken, result.refreshToken, result.user));
  }

  @Post('forget-password')
  async forgetPassword(@Body() dto : Pick<LoginUserDto ,  'email'>){
    return  await this.authService.forgetPassword(dto);
  }

  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    console.log('reset-password DTO received:', dto);
    return await this.authService.resetPassword(dto);
  }

  @Get('verify-email')
  @UseGuards(JwtAccessGuard)
  async  sendVerificationEmail(@Req() req : CustomRequest ){
    return  await this.authService.sendVerificationEmail(req.user);
  }

  @Post('verify-email')
  @UseGuards(JwtAccessGuard)
  async  verifyEmail (@Body() dto : Pick<ResetPasswordDto , 'OTPCode'> , @Req() req :CustomRequest){
    return await this.authService.verifyEmail(dto , req.user);
  }
}
