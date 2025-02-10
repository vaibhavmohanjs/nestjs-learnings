import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'your_jwt_secret', // Use an environment variable in production
      signOptions: { expiresIn: '1m' },
    }),
    UserModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

