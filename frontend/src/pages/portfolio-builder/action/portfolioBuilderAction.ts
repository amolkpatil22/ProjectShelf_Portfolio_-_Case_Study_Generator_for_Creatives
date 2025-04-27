import { portfolioApi } from '../../../axios/api';
import { CaseStudy } from '../types/portfolioBuilderTypes';
import { ApiResponse } from '../../../axios/types';

export const savePortfolio = async (data: any): Promise<ApiResponse> => {
    try {
        const response = await portfolioApi.update('current', data);
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