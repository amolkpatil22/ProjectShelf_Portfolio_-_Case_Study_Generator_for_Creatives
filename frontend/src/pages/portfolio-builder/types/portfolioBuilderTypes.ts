export interface ThemeSettings {
    primaryColor: string;
    fontFamily: string;
    layout: string;
}

export interface TimelineEntry {
    date: string;
    title: string;
    description: string;
}

export interface CaseStudy {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    tools: string[];
    challenge: string;
    solution: string;
    outcome: string;
    images: string[];
    videoLinks: string[];
    timeline: TimelineEntry[];
}

export interface Portfolio {
    _id?: string;
    name: string;
    title: string;
    bio: string;
    profileImage: string;
    email: string;
    linkedin: string;
    github: string;
    website: string;
    twitter: string;
    userId: string;
    themeSettings: ThemeSettings;
    caseStudies: CaseStudy[];
}

export interface PortfolioBuilderState {
    portfolio: Portfolio;
    isLoading: boolean;
    error: string | null;
    selectedCaseStudy: CaseStudy | null;
    isEditing: boolean;
    editingCaseStudy: CaseStudy | null;
}

export interface UsePortfolioBuilderReturn {
    portfolio: Portfolio;
    selectedCaseStudy: CaseStudy | null;
    isEditing: boolean;
    editingCaseStudy: CaseStudy | null;
    isLoading: boolean;
    error: string | null;
    updatePortfolio: (field: keyof Portfolio, value: any) => void;
    updateTheme: (key: keyof ThemeSettings, value: string) => void;
    handleEditCaseStudy: (caseStudy: CaseStudy) => void;
    handleUpdateCaseStudy: (updatedCaseStudy: CaseStudy) => void;
    handleCancelEdit: () => void;
    handleSave: () => Promise<void>;
    handlePreview: () => void;
    handleAddCaseStudy: () => void;
} 