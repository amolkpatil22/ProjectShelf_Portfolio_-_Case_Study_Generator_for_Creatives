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
        id: string;
        title: string;
        subtitle: string;
        description: string;
        category: string;
        challenge: string;
        solution: string;
        outcome: string;
        image: string;
        images: string[];
        tools: string[];
        timeline: string[];
        videoLinks: string[];
    }>;
}