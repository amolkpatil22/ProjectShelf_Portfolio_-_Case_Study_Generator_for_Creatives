// API Response Types
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    errors?: string[];
}

// Auth Types
export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface RefreshTokenResponse {
    accessToken: string;
    refreshToken: string;
}

export interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

// Portfolio Types
export interface PortfolioRequest {
    title: string;
    description: string;
    theme: string;
    isPublic: boolean;
}

export interface PortfolioResponse extends PortfolioRequest {
    id: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    caseStudies: CaseStudyResponse[];
}

// Case Study Types
export interface CaseStudyRequest {
    title: string;
    description: string;
    challenge: string;
    solution: string;
    outcome: string;
    tools: string[];
    images: string[];
    portfolioId: string;
}

export interface CaseStudyResponse extends CaseStudyRequest {
    id: string;
    createdAt: string;
    updatedAt: string;
}

// Theme Types
export interface ThemeSettings {
    primaryColor: string;
    fontFamily: string;
    layout: string;
}

// Error Types
export interface ApiError {
    message: string;
    code?: string;
    status?: number;
} 