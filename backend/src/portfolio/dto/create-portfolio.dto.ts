import { IsString, IsNotEmpty, IsOptional, IsObject, IsUrl } from 'class-validator';

export class CreatePortfolioDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    bio?: string;

    @IsString()
    @IsOptional()
    profileImage?: string;

    @IsString()
    @IsOptional()
    email?: string;

    @IsUrl()
    @IsOptional()
    linkedin?: string;

    @IsUrl()
    @IsOptional()
    github?: string;

    @IsUrl()
    @IsOptional()
    website?: string;

    @IsUrl()
    @IsOptional()
    twitter?: string;

    @IsObject()
    @IsOptional()
    themeSettings?: {
        primaryColor?: string;
        fontFamily?: string;
        layout?: string;
    };
} 