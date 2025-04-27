import React from 'react';
import {
    Box,
    VStack,
    FormControl,
    FormLabel,
    Input,
    Select,
    Heading,
} from '@chakra-ui/react';
import { ThemeSettings } from '../types/portfolioBuilderTypes';

interface PortfolioSettingsProps {
    themeSettings: ThemeSettings;
    onUpdateTheme: (key: keyof ThemeSettings, value: string) => void;
}

export const PortfolioSettings: React.FC<PortfolioSettingsProps> = ({
    themeSettings,
    onUpdateTheme,
}) => {
    return (
        <Box
            bg="white"
            p={6}
            borderRadius="lg"
            borderWidth="1px"
            h="fit-content"
        >
            <VStack spacing={6} align="stretch">
                <Heading size="sm">Theme Settings</Heading>
                <FormControl>
                    <FormLabel>Primary Color</FormLabel>
                    <Input
                        type="color"
                        value={themeSettings.primaryColor}
                        onChange={(e) => onUpdateTheme('primaryColor', e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Font Family</FormLabel>
                    <Select
                        value={themeSettings.fontFamily}
                        onChange={(e) => onUpdateTheme('fontFamily', e.target.value)}
                    >
                        <option value="Inter">Inter</option>
                        <option value="Playfair Display">Playfair Display</option>
                        <option value="Roboto">Roboto</option>
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>Layout</FormLabel>
                    <Select
                        value={themeSettings.layout}
                        onChange={(e) => onUpdateTheme('layout', e.target.value)}
                    >
                        <option value="minimal">Minimal</option>
                        <option value="creative">Creative</option>
                        <option value="bold">Bold</option>
                    </Select>
                </FormControl>
            </VStack>
        </Box>
    );
}; 