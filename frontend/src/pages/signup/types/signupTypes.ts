export interface SignupRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface SignupResponse {
    user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
    };
    accessToken: string;
    refreshToken: string;
}
