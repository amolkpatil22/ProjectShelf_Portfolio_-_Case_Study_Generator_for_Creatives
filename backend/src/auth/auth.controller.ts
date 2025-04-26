import { Controller, Post, Body, Request, Response, UnauthorizedException } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(
        @Response({ passthrough: true }) res: ExpressResponse,
        @Body() loginDto: LoginDto,
    ) {
        return this.authService.login(loginDto, res);
    }

    @Post('refresh')
    async refresh(
        @Request() req,
        @Response({ passthrough: true }) res: ExpressResponse,
    ) {
        const refreshToken = req.cookies['refresh_token'];
        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token not found');
        }

        return this.authService.refreshTokens(refreshToken, res);
    }

    @Post('logout')
    async logout(@Response({ passthrough: true }) res: ExpressResponse) {
        return this.authService.logout(res);
    }
} 