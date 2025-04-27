import { authApi } from '../../../axios/api';
import { SignupRequest, SignupResponse } from '../types/signupTypes';
import { ApiResponse } from '../../../axios/types';

export const signupUser = async (data: SignupRequest): Promise<ApiResponse<SignupResponse>> => {
    try {
        const response = await authApi.signup(data);

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
            data: {} as SignupResponse,
            errors: [error.response?.data?.message || 'Signup failed. Please try again.']
        };
    }
};