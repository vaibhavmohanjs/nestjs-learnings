import { Controller, Post, Body, Get, Request, UseGuards  } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';

@Controller('user')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.userService.createUser(username, password);
  }

  @Get()
  async getAllUsers() {
    return this.userService.findAll();
  }

  // ✅ Protected route: Requires a valid JWT token
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getUserProfile(@Request() req) {
    return { message: 'Protected route accessed', user: req.user };
  }


  @UseGuards(AuthGuard('jwt'))
  @Get('get-user-profile')
  @Roles(Role.USER, Role.ADMIN) // Both USER and ADMIN can access
  getProfile(@Request() req) {
    console.log("User", req.user);
    return {user: req.user};
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('admin')
  @Roles(Role.ADMIN) // Only ADMIN can access
  getAdminData() {
    return { message: 'Only admin can see this' };
  }
}