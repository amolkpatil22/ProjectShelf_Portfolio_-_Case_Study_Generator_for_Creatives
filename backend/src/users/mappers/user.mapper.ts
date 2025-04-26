import { User, UserDocument } from '../entities/user.entity';
import { UserResponseDto } from '../dto/user-response.dto';

export function mapToUserResponse(user: UserDocument | null): UserResponseDto | null {
    if (!user) return null;

    const userResponse = new UserResponseDto();
    userResponse.id = (user as any)._id.toString();
    userResponse.firstName = user.firstName;
    userResponse.lastName = user.lastName;
    userResponse.email = user.email;
    userResponse.isActive = user.isActive;
    userResponse.role = user.role;

    // Handle timestamps if they exist
    if ('createdAt' in user) {
        userResponse.createdAt = (user as any).createdAt;
    }

    if ('updatedAt' in user) {
        userResponse.updatedAt = (user as any).updatedAt;
    }

    return userResponse;
} 