import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Types
export interface Portfolio {
    id: string;
    title: string;
    description: string;
    caseStudies: string[]; // IDs of case studies
    theme: string;
    layout: string;
    createdAt: string;
    updatedAt: string;
}

interface PortfolioState {
    portfolio: Portfolio | null;
    loading: boolean;
    error: string | null;
}

// Initial state
const initialState: PortfolioState = {
    portfolio: null,
    loading: false,
    error: null,
};

// Slice
const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState,
    reducers: {
        setPortfolio: (state, action: PayloadAction<Portfolio>) => {
            state.portfolio = action.payload;
            state.loading = false;
            state.error = null;
        },
        updatePortfolio: (state, action: PayloadAction<Partial<Portfolio>>) => {
            if (state.portfolio) {
                state.portfolio = { ...state.portfolio, ...action.payload };
            }
        },
        deletePortfolio: (state) => {
            state.portfolio = null;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const {
    setPortfolio,
    updatePortfolio,
    deletePortfolio,
    setLoading,
    setError,
    clearError,
} = portfolioSlice.actions;

// Selectors
export const selectPortfolio = (state: RootState) => state.portfolio.portfolio;
export const selectPortfolioLoading = (state: RootState) => state.portfolio.loading;
export const selectPortfolioError = (state: RootState) => state.portfolio.error;

export default portfolioSlice.reducer; 