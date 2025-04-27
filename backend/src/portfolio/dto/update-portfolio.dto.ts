import { IsString, IsOptional, IsObject, IsUrl, isArray } from 'class-validator';

export class UpdatePortfolioDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    title?: string;

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

    @IsOptional()
    caseStudies?: Array<{
        title: string;
        description: string;
        imageUrl?: string;
        link?: string;
    }>;
}