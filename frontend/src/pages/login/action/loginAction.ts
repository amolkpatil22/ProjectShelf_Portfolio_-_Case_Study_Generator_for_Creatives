import { authApi } from '../../../axios/api';
import { LoginRequest, ApiResponse, LoginResponse } from '../../../axios/types';

export const loginUser = async (credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    try {
        const response = await authApi.login(credentials);

        // Store the tokens and user data
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.user));

        return {
            success: true,
            data: response
        };
    } catch (error: any) {
        // Handle error and return a consistent error response
        return {
            success: false,
            data: {} as LoginResponse,
            errors: [error.response?.data?.message || 'Login failed. Please try again.']
        };
    }
}; 