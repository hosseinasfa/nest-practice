import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext) {
        const rolesHandler = this.reflector.get("roles", context.getHandler());
        const rolesClass = this.reflector.get("roles", context.getClass());
        const roles = [...rolesHandler, ...rolesClass];

        const { user } = context.switchToHttp().getRequest();

        return roles.some((role: string) => role === user.role);
    }
}
