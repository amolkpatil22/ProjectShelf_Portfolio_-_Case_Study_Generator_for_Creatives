import { portfolioApi } from '../../../axios/api';
import { CaseStudy } from '../types/portfolioBuilderTypes';
import { ApiResponse } from '../../../axios/types';

export const savePortfolio = async (data: any): Promise<ApiResponse> => {
    try {
        const { _id, ...rest } = data;
        // Clean up payload
        const payload: any = {};
        for (const [key, value] of Object.entries(rest)) {
            if (
                value !== undefined &&
                value !== null &&
                value !== '' &&
                !['createdAt', 'updatedAt', 'userId', '__v'].includes(key)
            ) {
                payload[key] = value;
            }
        }
        const response = await portfolioApi.update(_id, payload);
        return {
            success: true,
            data: response.data
        };
    } catch (error: any) {
        return {
            success: false,
            errors: [error.response?.data?.message || 'Failed to save portfolio. Please try again.']
        };
    }
};

export const getPortfolio = async (): Promise<ApiResponse> => {
    try {
        const response = await portfolioApi.get('current');
        return {
            success: true,
            data: response.data
        };
    } catch (error: any) {
        return {
            success: false,
            errors: [error.response?.data?.message || 'Failed to fetch portfolio. Please try again.']
        };
    }
};

export const getPortfolioById = async (portfolioId: string): Promise<ApiResponse> => {
    try {
        const response = await portfolioApi.get(portfolioId);
        return {
            success: true,
            data: response
        };
    } catch (error: any) {
        return {
            success: false,
            errors: [error.response?.data?.message || 'Failed to fetch portfolio. Please try again.']
        };
    }
};

export const getPortfolioFromLocalStorage = async (): Promise<ApiResponse> => {
    try {
        const user = localStorage.getItem('user');
        const portfolioId = JSON.parse(user || '{}').portfolioId;
        if (!portfolioId) {
            return {
                success: false,
                errors: ['No portfolio ID found. Please create a portfolio first.']
            };
        }

        return await getPortfolioById(portfolioId);
    } catch (error: any) {
        return {
            success: false,
            errors: [error.message || 'Failed to fetch portfolio. Please try again.']
        };
    }
};

export const saveCaseStudy = async (caseStudy: CaseStudy): Promise<ApiResponse> => {
    try {
        const response = await portfolioApi.update('current', {
            caseStudies: [caseStudy]
        });
        return {
            success: true,
            data: response.data
        };
    } catch (error: any) {
        return {
            success: false,
            errors: [error.response?.data?.message || 'Failed to save case study. Please try again.']
        };
    }
}; 