import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./decorator/roles.decorator";
import { Role } from "./role.enum";


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector
    ) { }
    canActivate(
        context: ExecutionContext

    ): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
            ROLES_KEY,
            [
                context.getHandler(),
                context.getClass()
            ],
        )

        if (!requiredRoles) return true;

        const { user } = context.switchToHttp().getRequest();

        return requiredRoles.every(role => user?.roles?.includes(role))
    }
}