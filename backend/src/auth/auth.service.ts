import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { LoginDto } from './dto';
import { UserDocument } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user.toObject();
            return result;
        }
        return null;
    }

    async generateTokens(user: any) {
        const payload = {
            email: user.email,
            sub: user._id.toString(),
            role: user.role
        };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: process.env.JWT_SECRET,
                expiresIn: '15m',
            }),
            this.jwtService.signAsync(payload, {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: '7d',
            }),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }

    async login(loginDto: LoginDto, res: Response) {
        const user: UserDocument = await this.validateUser(
            loginDto.email,
            loginDto.password,
        );

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const tokens = await this.generateTokens(user);
        this.setTokenCookies(res, tokens);

        // Get portfolio ID
        const portfolioId = await this.usersService.getPortfolioId((user as any)._id.toString());

        return {
            ...tokens,
            user: {
                ...user,
                portfolioId
            }
        };
    }

    async refreshTokens(refreshToken: string, res: Response) {
        try {
            const payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET,
            });

            const user = await this.usersService.findOne(payload.sub);
            if (!user) {
                throw new UnauthorizedException();
            }

            const tokens = await this.generateTokens(user);
            this.setTokenCookies(res, tokens);
            return { message: 'Tokens refreshed successfully' };
        } catch {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    async logout(res: Response) {
        this.clearTokenCookies(res);
        return { message: 'Logout successful' };
    }

    private setTokenCookies(res: Response, tokens: { accessToken: string; refreshToken: string }) {
        res.cookie('accessToken', tokens.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
    }

    private clearTokenCookies(res: Response) {
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
    }
} 