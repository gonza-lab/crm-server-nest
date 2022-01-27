import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { Payload } from '../interfaces/payload.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getClass(),
      context.getHandler(),
    ]);

    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest<{ user: Payload }>();

    const access = requiredRoles.some((role) => user.role.name === role);

    if (access) return true;

    throw new ForbiddenException('No tienes rol');
  }
}
