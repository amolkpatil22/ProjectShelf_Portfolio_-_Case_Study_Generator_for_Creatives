import { ThemeSettings, CaseStudy } from '../types/portfolioBuilderTypes';

export const DEFAULT_THEME_SETTINGS: ThemeSettings = {
    primaryColor: '#3182CE',
    fontFamily: 'Inter',
    layout: 'modern'
};

export const DEFAULT_CASE_STUDIES: CaseStudy[] = [];

export const FONT_FAMILIES = [
    'Inter',
    'Roboto',
    'Open Sans',
    'Lato',
    'Montserrat',
    'Poppins',
    'Source Sans Pro',
    'Raleway',
    'Ubuntu',
    'Playfair Display'
];

export const LAYOUTS = [
    {
        id: 'modern',
        name: 'Modern',
        description: 'A clean and contemporary layout with a focus on typography and whitespace.'
    },
    {
        id: 'minimal',
        name: 'Minimal',
        description: 'A stripped-down design that emphasizes content and simplicity.'
    },
    {
        id: 'creative',
        name: 'Creative',
        description: 'A bold and expressive layout with dynamic elements and visual hierarchy.'
    }
];

export const COLOR_PRESETS = [
    {
        name: 'Blue',
        value: '#3182CE'
    },
    {
        name: 'Purple',
        value: '#805AD5'
    },
    {
        name: 'Green',
        value: '#38A169'
    },
    {
        name: 'Red',
        value: '#E53E3E'
    },
    {
        name: 'Orange',
        value: '#DD6B20'
    },
    {
        name: 'Teal',
        value: '#319795'
    }
]; 