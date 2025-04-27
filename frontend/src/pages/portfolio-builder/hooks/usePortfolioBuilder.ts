import { useState, useRef, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ThemeSettings, CaseStudy, UsePortfolioBuilderReturn, Portfolio } from '../types/portfolioBuilderTypes';
import { DEFAULT_THEME_SETTINGS, DEFAULT_CASE_STUDIES } from '../constants/portfolioBuilderConstants';
import { savePortfolio, getPortfolio, saveCaseStudy, getPortfolioFromLocalStorage } from '../action/portfolioBuilderAction';

const DEFAULT_PORTFOLIO: Portfolio = {
    _id: '',
    name: '',
    title: '',
    bio: '',
    profileImage: '',
    email: '',
    linkedin: '',
    github: '',
    website: '',
    twitter: '',
    themeSettings: DEFAULT_THEME_SETTINGS,
    userId: '',
    caseStudies: DEFAULT_CASE_STUDIES,
};

export const usePortfolioBuilder = (): UsePortfolioBuilderReturn => {
    const [portfolio, setPortfolio] = useState<Portfolio>(DEFAULT_PORTFOLIO);
    const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editingCaseStudy, setEditingCaseStudy] = useState<CaseStudy | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const previewTimeoutRef = useRef<number | null>(null);
    const toast = useToast();
    const navigate = useNavigate();

    // Fetch portfolio data when component mounts
    useEffect(() => {
        const fetchPortfolioData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await getPortfolioFromLocalStorage();

                if (response.success && response.data) {
                    setPortfolio(response.data);
                } else {
                    setError(response.errors?.[0] || 'Failed to fetch portfolio data');
                }
            } catch (err: any) {
                setError(err.message || 'An error occurred while fetching portfolio data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchPortfolioData();
    }, []);

    const updatePortfolio = (field: keyof Portfolio, value: any) => {
        setPortfolio(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const updateTheme = (key: keyof ThemeSettings, value: string) => {
        setPortfolio(prev => ({
            ...prev,
            themeSettings: {
                ...prev.themeSettings,
                [key]: value,
            }
        }));
    };

    const handleEditCaseStudy = (caseStudy: CaseStudy) => {
        setEditingCaseStudy({ ...caseStudy });
        setIsEditing(true);
    };

    const handleUpdateCaseStudy = (updatedCaseStudy: CaseStudy) => {
        setPortfolio(prev => ({
            ...prev,
            caseStudies: prev.caseStudies.map(cs =>
                cs.id === updatedCaseStudy.id ? updatedCaseStudy : cs
            )
        }));
        setIsEditing(false);
        setEditingCaseStudy(null);

        toast({
            title: 'Case study updated',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditingCaseStudy(null);
    };

    const handleSave = async () => {
        try {
            const response = await savePortfolio(portfolio);

            if (response.success) {
                toast({
                    title: 'Changes saved',
                    description: 'Your portfolio has been updated successfully.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                throw new Error(response.errors?.[0]);
            }
        } catch (error: any) {
            toast({
                title: 'Error saving changes',
                description: error.message || 'Failed to save changes. Please try again.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handlePreview = () => {
        window.open(
            `/preview?theme=${portfolio.themeSettings.layout}&color=${encodeURIComponent(portfolio.themeSettings.primaryColor)}&font=${encodeURIComponent(portfolio.themeSettings.fontFamily)}`,
            '_blank'
        );
    };

    return {
        portfolio,
        selectedCaseStudy,
        isEditing,
        editingCaseStudy,
        isLoading,
        error,
        updatePortfolio,
        updateTheme,
        handleEditCaseStudy,
        handleUpdateCaseStudy,
        handleCancelEdit,
        handleSave,
        handlePreview,
    };
}; 