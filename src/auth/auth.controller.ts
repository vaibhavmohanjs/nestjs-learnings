import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

// import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body('username') username: string, @Body('password') password: string) {
    const user = await this.authService.validateUser(username, password);
    if (user) {
      return this.authService.generateTokens(user);
    }
    return { message: 'Invalid credentials' };
  }

  @Post('refresh')
  async refresh(@Body('refresh_token') refresh_token: string) {
    return this.authService.refreshToken(refresh_token);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logout(@Request() req) {
    await this.authService.logout(req.user.userId);
    return { message: 'Logged out successfully' };
  }
}