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
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiCookieAuth } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({ status: 200, description: 'Login successful, sets access and refresh token cookies.' })
  async login(@Body() dto: LoginUserDto, @Res() res: Response) {
    const result = await this.authService.login(dto);
    return res.json(buildAuthResponse(res, result.accessToken, result.refreshToken, result.user));
  }

  @Post('register')
  @ApiOperation({ summary: 'User registration' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Registration successful, sets access and refresh token cookies.' })
  async register(@Body() dto : CreateUserDto, @Res() res: Response) {
    const result = await this.authService.register(dto);
    return res.json(buildAuthResponse(res, result.accessToken, result.refreshToken, result.user));
  }

  @Get('refresh')
  @UseGuards(JwtRefreshGuard)
  @ApiOperation({ summary: 'Refresh access and refresh tokens' })
  @ApiCookieAuth('refreshToken')
  @ApiResponse({ status: 200, description: 'Tokens refreshed, sets new access and refresh token cookies.' })
  async refresh(@Req() req : CustomRequest, @Res() res: Response){
    const result = await this.authService.refresh(req.user);
    return res.json(buildAuthResponse(res, result.accessToken, result.refreshToken, result.user));
  }

  @Post('forget-password')
  @ApiOperation({ summary: 'Request password reset (send OTP to email)' })
  @ApiBody({ schema: { properties: { email: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: 'OTP sent to email if user exists.' })
  async forgetPassword(@Body() dto : Pick<LoginUserDto ,  'email'>){
    return  await this.authService.forgetPassword(dto);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password using OTP' })
  @ApiBody({ type: ResetPasswordDto })
  @ApiResponse({ status: 200, description: 'Password reset successful.' })
  async resetPassword(@Body() dto: ResetPasswordDto) {
    console.log('reset-password DTO received:', dto);
    return await this.authService.resetPassword(dto);
  }

  @Get('verify-email')
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: 'Send verification email to user' })
  @ApiCookieAuth('accessToken')
  @ApiResponse({ status: 200, description: 'Verification email sent.' })
  async  sendVerificationEmail(@Req() req : CustomRequest ){
    return  await this.authService.sendVerificationEmail(req.user);
  }

  @Post('verify-email')
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: 'Verify email using OTP' })
  @ApiCookieAuth('accessToken')
  @ApiBody({ schema: { properties: { OTPCode: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: 'Email verified.' })
  async  verifyEmail (@Body() dto : Pick<ResetPasswordDto , 'OTPCode'> , @Req() req :CustomRequest){
    return await this.authService.verifyEmail(dto , req.user);
  }

  @Get('me')
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: 'Get current authenticated user' })
  @ApiCookieAuth('accessToken')
  @ApiResponse({ status: 200, description: 'Returns the current user.' })
  async me(@Req() req: CustomRequest , @Res() res: Response) {
    const result = await this.authService.refresh(req.user);
    return res.json(buildAuthResponse(res, result.accessToken, result.refreshToken, result.user));
  }
}
