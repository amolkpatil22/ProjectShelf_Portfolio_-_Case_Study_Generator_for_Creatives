import { useState, useRef } from 'react';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ThemeSettings, CaseStudy, UsePortfolioBuilderReturn } from '../types/portfolioBuilderTypes';
import { DEFAULT_THEME_SETTINGS, DEFAULT_CASE_STUDIES } from '../constants/portfolioBuilderConstants';
import { savePortfolio, getPortfolio, saveCaseStudy } from '../action/portfolioBuilderAction';

export const usePortfolioBuilder = (): UsePortfolioBuilderReturn => {
    const [themeSettings, setThemeSettings] = useState<ThemeSettings>(DEFAULT_THEME_SETTINGS);
    const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(DEFAULT_CASE_STUDIES);
    const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editingCaseStudy, setEditingCaseStudy] = useState<CaseStudy | null>(null);
    const previewTimeoutRef = useRef<number | null>(null);
    const toast = useToast();
    const navigate = useNavigate();

    const updateTheme = (key: keyof ThemeSettings, value: string) => {
        setThemeSettings(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleEditCaseStudy = (caseStudy: CaseStudy) => {
        setEditingCaseStudy({ ...caseStudy });
        setIsEditing(true);
    };

    const handleUpdateCaseStudy = (updatedCaseStudy: CaseStudy) => {
        setCaseStudies(prev =>
            prev.map(cs => cs.id === updatedCaseStudy.id ? updatedCaseStudy : cs)
        );
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
            const response = await savePortfolio({
                themeSettings,
                caseStudies
            });

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
            `/preview?theme=${themeSettings.layout}&color=${encodeURIComponent(themeSettings.primaryColor)}&font=${encodeURIComponent(themeSettings.fontFamily)}`,
            '_blank'
        );
    };

    return {
        themeSettings,
        caseStudies,
        selectedCaseStudy,
        isEditing,
        editingCaseStudy,
        updateTheme,
        handleEditCaseStudy,
        handleUpdateCaseStudy,
        handleCancelEdit,
        handleSave,
        handlePreview,
    };
}; 