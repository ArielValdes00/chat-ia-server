import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        try {
            const authorization = request.headers.authorization;
            const token = authorization.split(' ')[1];
            const decoded = this.jwtService.verify(token);
            return !!decoded;
        } catch (e) {
            return false;
        }
    }
}
