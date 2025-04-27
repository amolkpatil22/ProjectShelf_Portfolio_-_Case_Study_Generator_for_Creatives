import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private jwtService: JwtService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const token = req.cookies['accessToken'];

        if (!token) {
            throw new UnauthorizedException('No token provided');
        }

        try {
            const payload = await this.jwtService.verify(token);
            req['user'] = payload;
            next();
        } catch(err) {
            console.error('Token verification failed:', err);
            throw new UnauthorizedException('Invalid token');
        }
    }
} 