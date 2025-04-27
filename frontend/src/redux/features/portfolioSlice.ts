import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CaseStudy, ThemeSettings } from '../../pages/portfolio-builder/types/portfolioBuilderTypes';
import { RootState } from '../store';

// Types
interface Portfolio {
    id?: string;
    title: string;
    description: string;
    themeSettings: ThemeSettings;
    caseStudies: CaseStudy[];
}

interface PortfolioState {
    currentPortfolio: Portfolio | null;
    loading: boolean;
    error: string | null;
}

// Initial state
const initialState: PortfolioState = {
    currentPortfolio: null,
    loading: false,
    error: null,
};

// Slice
const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState,
    reducers: {
        setPortfolio: (state, action: PayloadAction<Portfolio>) => {
            state.currentPortfolio = action.payload;
            state.error = null;
        },
        updateThemeSettings: (state, action: PayloadAction<ThemeSettings>) => {
            if (state.currentPortfolio) {
                state.currentPortfolio.themeSettings = action.payload;
            }
        },
        addCaseStudy: (state, action: PayloadAction<CaseStudy>) => {
            if (state.currentPortfolio) {
                state.currentPortfolio.caseStudies.push(action.payload);
            }
        },
        updateCaseStudy: (state, action: PayloadAction<CaseStudy>) => {
            if (state.currentPortfolio) {
                const index = state.currentPortfolio.caseStudies.findIndex(
                    study => study.id === action.payload.id
                );
                if (index !== -1) {
                    state.currentPortfolio.caseStudies[index] = action.payload;
                }
            }
        },
        deleteCaseStudy: (state, action: PayloadAction<string>) => {
            if (state.currentPortfolio) {
                state.currentPortfolio.caseStudies = state.currentPortfolio.caseStudies.filter(
                    study => study.id !== action.payload
                );
            }
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        clearPortfolio: (state) => {
            state.currentPortfolio = null;
            state.error = null;
        }
    },
});

export const {
    setPortfolio,
    updateThemeSettings,
    addCaseStudy,
    updateCaseStudy,
    deleteCaseStudy,
    setLoading,
    setError,
    clearPortfolio
} = portfolioSlice.actions;

// Selectors
export const selectPortfolio = (state: RootState) => state.portfolio.currentPortfolio;
export const selectPortfolioLoading = (state: RootState) => state.portfolio.loading;
export const selectPortfolioError = (state: RootState) => state.portfolio.error;

export default portfolioSlice.reducer; 