import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const isValid = await this.userService.validateUser(username, password);
    if (isValid) {
      const user = await this.userService.findByUsername(username);
      return { id: user.id, username: user.username, role: user.role };
    }
    return null;
  }

  async generateTokens(user: any) {
    console.log({user});
    const payload = { username: user.username, role: user.role, sub: user.id };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' }); // Short-lived
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });  // Long-lived

    // Hash and store refresh token in DB
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userService.updateRefreshToken(user.id, hashedRefreshToken);

    return { accessToken, refreshToken };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken); // Verify refresh token
      const user = await this.userService.findByUsername(payload.username);
      
      if (!user) throw new UnauthorizedException('User not found');

      return {
        access_token: this.jwtService.sign({ username: user.username, sub: user.id }, { expiresIn: '1m' }),
        refresh_token: this.jwtService.sign({ username: user.username, sub: user.id }, { expiresIn: '7d' }),
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: number) {
    await this.userService.updateRefreshToken(userId, null);
  }

  async login(user: any) {
    const payload = { username: user.username, role: user.role, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
