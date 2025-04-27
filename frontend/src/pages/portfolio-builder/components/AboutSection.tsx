import React from 'react';
import {
    VStack,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    SimpleGrid,
    Box,
    Image,
    Button,
    InputGroup,
    InputRightElement,
    Heading,
    Text,
} from '@chakra-ui/react';

interface AboutSectionProps {
    name: string;
    title: string;
    bio: string;
    profileImage: string;
    onUpdate: (field: string, value: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
    name,
    title,
    bio,
    profileImage,
    onUpdate,
}) => {
    return (
        <VStack spacing={6} align="stretch">
            <Heading size="md">About You</Heading>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                        value={name}
                        onChange={(e) => onUpdate('name', e.target.value)}
                        placeholder="Your name"
                        size="md"
                        borderRadius="md"
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input
                        value={title}
                        onChange={(e) => onUpdate('title', e.target.value)}
                        placeholder="e.g., UI/UX Designer"
                        size="md"
                        borderRadius="md"
                    />
                </FormControl>
            </SimpleGrid>

            <FormControl>
                <FormLabel>Bio</FormLabel>
                <Textarea
                    value={bio}
                    onChange={(e) => onUpdate('bio', e.target.value)}
                    placeholder="Tell us about yourself"
                    rows={4}
                    borderRadius="md"
                />
            </FormControl>

            <FormControl>
                <FormLabel>Profile Image</FormLabel>
                <InputGroup size="md">
                    <Input
                        value={profileImage}
                        onChange={(e) => onUpdate('profileImage', e.target.value)}
                        placeholder="https://example.com/profile.jpg"
                        borderRadius="md"
                    />

                </InputGroup>
                {profileImage && (
                    <Box mt={4} borderRadius="md" overflow="hidden" boxShadow="sm" maxW="200px">
                        <Image
                            src={profileImage}
                            alt="Profile preview"
                            width="100%"
                            objectFit="cover"
                        />
                    </Box>
                )}
            </FormControl>
        </VStack>
    );
}; 