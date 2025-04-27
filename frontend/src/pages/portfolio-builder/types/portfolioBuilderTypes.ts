export interface ThemeSettings {
    primaryColor: string;
    fontFamily: string;
    layout: string;
}

export interface TimelineEvent {
    date: string;
    title: string;
    description: string;
}

export interface CaseStudy {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    challenge: string;
    solution: string;
    results: string;
    technologies: string[];
    images: string[];
    role: string;
    duration: string;
    teamSize: string;
    createdAt: string;
    updatedAt: string;
}

export interface PortfolioBuilderState {
    themeSettings: ThemeSettings;
    caseStudies: CaseStudy[];
    currentCaseStudy: CaseStudy | null;
    isLoading: boolean;
    error: string | null;
    selectedCaseStudy: CaseStudy | null;
    isEditing: boolean;
    editingCaseStudy: CaseStudy | null;
}

export interface UsePortfolioBuilderReturn {
    themeSettings: ThemeSettings;
    caseStudies: CaseStudy[];
    selectedCaseStudy: CaseStudy | null;
    isEditing: boolean;
    editingCaseStudy: CaseStudy | null;
    updateTheme: (key: keyof ThemeSettings, value: string) => void;
    handleEditCaseStudy: (caseStudy: CaseStudy) => void;
    handleUpdateCaseStudy: (updatedCaseStudy: CaseStudy) => void;
    handleCancelEdit: () => void;
    handleSave: () => Promise<void>;
    handlePreview: () => void;
} 