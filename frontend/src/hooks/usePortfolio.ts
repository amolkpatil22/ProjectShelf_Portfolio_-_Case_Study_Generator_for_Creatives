import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
    setPortfolio,
    updateThemeSettings,
    addCaseStudy,
    updateCaseStudy,
    deleteCaseStudy,
    setLoading,
    setError,
    clearPortfolio
} from '../redux/features/portfolioSlice';
import { Portfolio, CaseStudy, ThemeSettings } from '../pages/portfolio-builder/types/portfolioBuilderTypes';
import { portfolioService } from '../services/portfolioService';

export const usePortfolio = () => {
    const dispatch = useDispatch();
    const { currentPortfolio, loading, error } = useSelector((state: RootState) => state.portfolio);

    const fetchPortfolio = useCallback(async (portfolioId: string) => {
        try {
            dispatch(setLoading(true));
            const portfolio = await portfolioService.getPortfolio(portfolioId);
            dispatch(setPortfolio(portfolio));
        } catch (err) {
            dispatch(setError(err instanceof Error ? err.message : 'Failed to fetch portfolio'));
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    const createPortfolio = useCallback(async (portfolioData: Omit<Portfolio, 'id'>) => {
        try {
            dispatch(setLoading(true));
            const newPortfolio = await portfolioService.createPortfolio(portfolioData);
            dispatch(setPortfolio(newPortfolio));
            return newPortfolio;
        } catch (err) {
            dispatch(setError(err instanceof Error ? err.message : 'Failed to create portfolio'));
            throw err;
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    const updatePortfolio = useCallback(async (portfolioId: string, updates: Partial<Portfolio>) => {
        try {
            dispatch(setLoading(true));
            const updatedPortfolio = await portfolioService.updatePortfolio(portfolioId, updates);
            dispatch(setPortfolio(updatedPortfolio));
            return updatedPortfolio;
        } catch (err) {
            dispatch(setError(err instanceof Error ? err.message : 'Failed to update portfolio'));
            throw err;
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    const handleThemeUpdate = useCallback(async (portfolioId: string, themeSettings: ThemeSettings) => {
        try {
            dispatch(setLoading(true));
            const updatedPortfolio = await portfolioService.updatePortfolio(portfolioId, { themeSettings });
            dispatch(updateThemeSettings(themeSettings));
            return updatedPortfolio;
        } catch (err) {
            dispatch(setError(err instanceof Error ? err.message : 'Failed to update theme settings'));
            throw err;
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    const handleCaseStudyAdd = useCallback(async (portfolioId: string, caseStudy: CaseStudy) => {
        try {
            dispatch(setLoading(true));
            const updatedPortfolio = await portfolioService.addCaseStudy(portfolioId, caseStudy);
            dispatch(addCaseStudy(caseStudy));
            return updatedPortfolio;
        } catch (err) {
            dispatch(setError(err instanceof Error ? err.message : 'Failed to add case study'));
            throw err;
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    const handleCaseStudyUpdate = useCallback(async (portfolioId: string, caseStudyId: string, updates: Partial<CaseStudy>) => {
        try {
            dispatch(setLoading(true));
            const updatedPortfolio = await portfolioService.updateCaseStudy(portfolioId, caseStudyId, updates);
            dispatch(updateCaseStudy({ id: caseStudyId, ...updates }));
            return updatedPortfolio;
        } catch (err) {
            dispatch(setError(err instanceof Error ? err.message : 'Failed to update case study'));
            throw err;
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    const handleCaseStudyDelete = useCallback(async (portfolioId: string, caseStudyId: string) => {
        try {
            dispatch(setLoading(true));
            const updatedPortfolio = await portfolioService.deleteCaseStudy(portfolioId, caseStudyId);
            dispatch(deleteCaseStudy(caseStudyId));
            return updatedPortfolio;
        } catch (err) {
            dispatch(setError(err instanceof Error ? err.message : 'Failed to delete case study'));
            throw err;
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    return {
        portfolio: currentPortfolio,
        loading,
        error,
        fetchPortfolio,
        createPortfolio,
        updatePortfolio,
        handleThemeUpdate,
        handleCaseStudyAdd,
        handleCaseStudyUpdate,
        handleCaseStudyDelete,
        clearPortfolio: () => dispatch(clearPortfolio())
    };
}; 