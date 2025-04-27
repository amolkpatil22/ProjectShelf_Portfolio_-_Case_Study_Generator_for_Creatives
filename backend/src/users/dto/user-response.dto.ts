export class UserResponseDto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    isActive: boolean;
    role: string;
    portfolioId?: string;
    createdAt: Date;
    updatedAt: Date;
} 