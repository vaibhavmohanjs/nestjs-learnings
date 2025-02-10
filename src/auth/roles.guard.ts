import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './roles.enum';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user?: { role: Role }; // Define user property with role
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>('roles', context.getHandler());
    if (!requiredRoles) return true; // No roles required, allow access

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>(); // Use custom type
    console.log('User from request:', request.user);

    const user = request.user;
    if (!user) {
      console.log('No user found in request. Ensure authentication is working.');
      return false;
    }
    console.log({ requiredRoles, user })

    return requiredRoles.includes(user.role);
  }
}
