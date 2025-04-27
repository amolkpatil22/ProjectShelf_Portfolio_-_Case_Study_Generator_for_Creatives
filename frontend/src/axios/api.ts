import axiosInstance from './config';
import {
    ApiResponse,
    LoginRequest,
    LoginResponse,
    PortfolioRequest,
    PortfolioResponse,
    CaseStudyRequest,
    CaseStudyResponse,
} from './types';
import { SignupRequest, SignupResponse } from '../pages/signup/types/signupTypes';

// Create a type without confirmPassword
type SignupRequestWithoutConfirm = Omit<SignupRequest, 'confirmPassword'>;

// Auth API calls
export const authApi = {
    login: async (data: LoginRequest): Promise<LoginResponse> => {
        const response = await axiosInstance.post<LoginResponse>('/auth/login', data);
        return response.data;
    },

    signup: async (data: SignupRequestWithoutConfirm): Promise<SignupResponse> => {
        const response = await axiosInstance.post<SignupResponse>('/users', data);
        return response.data;
    },

    refreshToken: async (refreshToken: string): Promise<ApiResponse<{ token: string }>> => {
        const response = await axiosInstance.post<ApiResponse<{ token: string }>>('/auth/refresh-token', { refreshToken });
        return response.data;
    },

    logout: async (): Promise<void> => {
        await axiosInstance.post('/auth/logout');
    },
};

// Portfolio API calls
export const portfolioApi = {
    create: async (data: PortfolioRequest): Promise<ApiResponse<PortfolioResponse>> => {
        const response = await axiosInstance.post<ApiResponse<PortfolioResponse>>('/portfolios', data);
        return response.data;
    },

    update: async (id: string, data: Partial<PortfolioRequest>): Promise<ApiResponse<PortfolioResponse>> => {
        const response = await axiosInstance.patch<ApiResponse<PortfolioResponse>>(`/portfolios/${id}`, data);
        return response.data;
    },

    get: async (id: string): Promise<ApiResponse<PortfolioResponse>> => {
        const response = await axiosInstance.get<ApiResponse<PortfolioResponse>>(`/portfolios/${id}`);
        return response.data;
    },

    getAll: async (): Promise<ApiResponse<PortfolioResponse[]>> => {
        const response = await axiosInstance.get<ApiResponse<PortfolioResponse[]>>('/portfolios');
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await axiosInstance.delete(`/portfolios/${id}`);
    },
};

// Case Study API calls
export const caseStudyApi = {
    create: async (portfolioId: string, data: CaseStudyRequest): Promise<ApiResponse<CaseStudyResponse>> => {
        const response = await axiosInstance.post<ApiResponse<CaseStudyResponse>>(`/portfolios/${portfolioId}/case-studies`, data);
        return response.data;
    },

    update: async (portfolioId: string, caseStudyId: string, data: Partial<CaseStudyRequest>): Promise<ApiResponse<CaseStudyResponse>> => {
        const response = await axiosInstance.put<ApiResponse<CaseStudyResponse>>(`/portfolios/${portfolioId}/case-studies/${caseStudyId}`, data);
        return response.data;
    },

    get: async (portfolioId: string, caseStudyId: string): Promise<ApiResponse<CaseStudyResponse>> => {
        const response = await axiosInstance.get<ApiResponse<CaseStudyResponse>>(`/portfolios/${portfolioId}/case-studies/${caseStudyId}`);
        return response.data;
    },

    getAll: async (portfolioId: string): Promise<ApiResponse<CaseStudyResponse[]>> => {
        const response = await axiosInstance.get<ApiResponse<CaseStudyResponse[]>>(`/portfolios/${portfolioId}/case-studies`);
        return response.data;
    },

    delete: async (portfolioId: string, caseStudyId: string): Promise<void> => {
        await axiosInstance.delete(`/portfolios/${portfolioId}/case-studies/${caseStudyId}`);
    },
}; 