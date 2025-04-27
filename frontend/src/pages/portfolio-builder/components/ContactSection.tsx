import React from 'react';
import {
    VStack,
    FormControl,
    FormLabel,
    Input,
    SimpleGrid,
    Heading,
    Button,
    InputGroup,
    InputLeftElement,
    Icon,
} from '@chakra-ui/react';
import { Mail, Linkedin, Github, Globe, Twitter } from 'lucide-react';

interface ContactSectionProps {
    email: string;
    linkedin: string;
    github: string;
    website: string;
    twitter: string;
    onUpdate: (field: string, value: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
    email,
    linkedin,
    github,
    website,
    twitter,
    onUpdate,
}) => {
    return (
        <VStack spacing={6} align="stretch">
            <Heading size="md">Contact Information</Heading>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <Icon as={Mail} color="gray.400" />
                        </InputLeftElement>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => onUpdate('email', e.target.value)}
                            placeholder="your@email.com"
                            size="md"
                            borderRadius="md"
                        />
                    </InputGroup>
                </FormControl>

                <FormControl>
                    <FormLabel>LinkedIn</FormLabel>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <Icon as={Linkedin} color="gray.400" />
                        </InputLeftElement>
                        <Input
                            value={linkedin}
                            onChange={(e) => onUpdate('linkedin', e.target.value)}
                            placeholder="LinkedIn profile URL"
                            size="md"
                            borderRadius="md"
                        />
                    </InputGroup>
                </FormControl>

                <FormControl>
                    <FormLabel>GitHub</FormLabel>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <Icon as={Github} color="gray.400" />
                        </InputLeftElement>
                        <Input
                            value={github}
                            onChange={(e) => onUpdate('github', e.target.value)}
                            placeholder="GitHub profile URL"
                            size="md"
                            borderRadius="md"
                        />
                    </InputGroup>
                </FormControl>

                <FormControl>
                    <FormLabel>Portfolio Website</FormLabel>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <Icon as={Globe} color="gray.400" />
                        </InputLeftElement>
                        <Input
                            value={website}
                            onChange={(e) => onUpdate('website', e.target.value)}
                            placeholder="Your website URL"
                            size="md"
                            borderRadius="md"
                        />
                    </InputGroup>
                </FormControl>

                <FormControl>
                    <FormLabel>Twitter</FormLabel>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <Icon as={Twitter} color="gray.400" />
                        </InputLeftElement>
                        <Input
                            value={twitter}
                            onChange={(e) => onUpdate('twitter', e.target.value)}
                            placeholder="Twitter profile URL"
                            size="md"
                            borderRadius="md"
                        />
                    </InputGroup>
                </FormControl>
            </SimpleGrid>
        </VStack>
    );
}; 