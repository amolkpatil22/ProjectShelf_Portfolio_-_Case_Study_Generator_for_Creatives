import React from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    VStack,
    SimpleGrid,
    Select,
    IconButton,
    InputGroup,
    InputRightElement,
    Heading,
    Flex,
    Text,
    Image,
    useToast,
    Tag,
    TagLabel,
    TagCloseButton,
    HStack,
} from '@chakra-ui/react';
import { Plus, Trash2, ChevronLeft, Upload, X } from 'lucide-react';
import { CaseStudy } from '../types/portfolioBuilderTypes';

interface CaseStudyEditorProps {
    editingCaseStudy: CaseStudy;
    setEditingCaseStudy: (caseStudy: CaseStudy) => void;
    onCancel: () => void;
    onSave: (caseStudy: CaseStudy) => void;
}

export const CaseStudyEditor: React.FC<CaseStudyEditorProps> = ({
    editingCaseStudy,
    setEditingCaseStudy,
    onCancel,
    onSave,
}) => {
    const [newTech, setNewTech] = React.useState('');
    const toast = useToast();

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setEditingCaseStudy({
                ...editingCaseStudy,
                images: [...editingCaseStudy.images, URL.createObjectURL(file)]
            });
        }
    };

    const handleAddTechnology = () => {
        if (newTech.trim()) {
            setEditingCaseStudy({
                ...editingCaseStudy,
                technologies: [...editingCaseStudy.technologies, newTech.trim()]
            });
            setNewTech('');
        }
    };

    return (
        <VStack spacing={8} align="stretch">
            <Flex justify="space-between" align="center">
                <Button
                    leftIcon={<ChevronLeft />}
                    variant="ghost"
                    onClick={onCancel}
                >
                    Back to Case Studies
                </Button>
                <Button
                    colorScheme="primary"
                    onClick={() => onSave(editingCaseStudy)}
                >
                    Save Changes
                </Button>
            </Flex>

            <Heading size="md">Case Study Details</Heading>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input
                        value={editingCaseStudy.title}
                        onChange={(e) => setEditingCaseStudy({
                            ...editingCaseStudy,
                            title: e.target.value
                        })}
                        placeholder="Project Title"
                        size="md"
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Subtitle</FormLabel>
                    <Input
                        value={editingCaseStudy.subtitle}
                        onChange={(e) => setEditingCaseStudy({
                            ...editingCaseStudy,
                            subtitle: e.target.value
                        })}
                        placeholder="Brief project description"
                        size="md"
                    />
                </FormControl>

                <FormControl gridColumn={{ md: 'span 2' }}>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                        value={editingCaseStudy.description}
                        onChange={(e) => setEditingCaseStudy({
                            ...editingCaseStudy,
                            description: e.target.value
                        })}
                        placeholder="Detailed project description"
                        size="md"
                        rows={4}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Role</FormLabel>
                    <Input
                        value={editingCaseStudy.role}
                        onChange={(e) => setEditingCaseStudy({
                            ...editingCaseStudy,
                            role: e.target.value
                        })}
                        placeholder="Your role in the project"
                        size="md"
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Duration</FormLabel>
                    <Input
                        value={editingCaseStudy.duration}
                        onChange={(e) => setEditingCaseStudy({
                            ...editingCaseStudy,
                            duration: e.target.value
                        })}
                        placeholder="Project duration"
                        size="md"
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Team Size</FormLabel>
                    <Input
                        value={editingCaseStudy.teamSize}
                        onChange={(e) => setEditingCaseStudy({
                            ...editingCaseStudy,
                            teamSize: e.target.value
                        })}
                        placeholder="Number of team members"
                        size="md"
                    />
                </FormControl>

                <FormControl gridColumn={{ md: 'span 2' }}>
                    <FormLabel>Challenge</FormLabel>
                    <Textarea
                        value={editingCaseStudy.challenge}
                        onChange={(e) => setEditingCaseStudy({
                            ...editingCaseStudy,
                            challenge: e.target.value
                        })}
                        placeholder="What were the main challenges?"
                        size="md"
                        rows={4}
                    />
                </FormControl>

                <FormControl gridColumn={{ md: 'span 2' }}>
                    <FormLabel>Solution</FormLabel>
                    <Textarea
                        value={editingCaseStudy.solution}
                        onChange={(e) => setEditingCaseStudy({
                            ...editingCaseStudy,
                            solution: e.target.value
                        })}
                        placeholder="How did you solve these challenges?"
                        size="md"
                        rows={4}
                    />
                </FormControl>

                <FormControl gridColumn={{ md: 'span 2' }}>
                    <FormLabel>Results</FormLabel>
                    <Textarea
                        value={editingCaseStudy.outcome}
                        onChange={(e) => setEditingCaseStudy({
                            ...editingCaseStudy,
                            outcome: e.target.value
                        })}
                        placeholder="What were the outcomes?"
                        size="md"
                        rows={4}
                    />
                </FormControl>

                <FormControl gridColumn={{ md: 'span 2' }}>
                    <FormLabel>Technologies Used</FormLabel>
                    <HStack spacing={2} mb={2}>
                        <Input
                            value={newTech}
                            onChange={(e) => setNewTech(e.target.value)}
                            placeholder="Add a technology"
                            size="md"
                        />
                        <IconButton
                            aria-label="Add technology"
                            icon={<Plus />}
                            onClick={handleAddTechnology}
                            size="md"
                        />
                    </HStack>
                    <HStack spacing={2} flexWrap="wrap">
                        {editingCaseStudy.technologies.map((tech, index) => (
                            <Tag
                                key={index}
                                size="md"
                                borderRadius="full"
                                variant="solid"
                                colorScheme="blue"
                            >
                                <TagLabel>{tech}</TagLabel>
                                <TagCloseButton onClick={() => setEditingCaseStudy({
                                    ...editingCaseStudy,
                                    technologies: editingCaseStudy.technologies.filter((_, i) => i !== index)
                                })} />
                            </Tag>
                        ))}
                    </HStack>
                </FormControl>

                <FormControl gridColumn={{ md: 'span 2' }}>
                    <FormLabel>Project Images</FormLabel>
                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                        {editingCaseStudy.images.map((image, index) => (
                            <Box key={index} position="relative">
                                <Image
                                    src={image}
                                    alt={`Project image ${index + 1}`}
                                    borderRadius="md"
                                    objectFit="cover"
                                    height="200px"
                                    width="100%"
                                />
                                <IconButton
                                    aria-label="Remove image"
                                    icon={<X />}
                                    size="sm"
                                    position="absolute"
                                    top={2}
                                    right={2}
                                    onClick={() => setEditingCaseStudy({
                                        ...editingCaseStudy,
                                        images: editingCaseStudy.images.filter((_, i) => i !== index)
                                    })}
                                    colorScheme="red"
                                />
                            </Box>
                        ))}
                        <Box
                            border="2px dashed"
                            borderColor="gray.200"
                            borderRadius="md"
                            p={4}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            height="200px"
                            cursor="pointer"
                            _hover={{ borderColor: 'blue.500' }}
                        >
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                display="none"
                                id="image-upload"
                            />
                            <label htmlFor="image-upload">
                                <Button
                                    as="span"
                                    leftIcon={<Upload />}
                                    variant="outline"
                                    cursor="pointer"
                                >
                                    Add Image
                                </Button>
                            </label>
                        </Box>
                    </SimpleGrid>
                </FormControl>
            </SimpleGrid>
        </VStack>
    );
}; 