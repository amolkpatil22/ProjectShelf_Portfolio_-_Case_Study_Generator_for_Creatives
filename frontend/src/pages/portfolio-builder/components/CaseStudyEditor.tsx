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
    IconButton,
    InputGroup,
    InputRightElement,
    Heading,
    Flex,
    Image,
    useToast,
    Tag,
    TagLabel,
    TagCloseButton,
    HStack,
    Text,
} from '@chakra-ui/react';
import { Plus, ChevronLeft, Upload, X } from 'lucide-react';
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
    const [imageLinks, setImageLinks] = React.useState<string[]>(['']);
    const toast = useToast();

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditingCaseStudy({
                    ...editingCaseStudy,
                    images: [...(editingCaseStudy?.images || []), reader.result as string]
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddTechnology = () => {
        if (newTech.trim()) {
            setEditingCaseStudy({
                ...editingCaseStudy,
                technologies: [...(editingCaseStudy?.technologies || []), newTech.trim()]
            });
            setNewTech('');
        }
    };

    const handleImageLinkChange = (index: number, value: string) => {
        const newImageLinks = [...imageLinks];
        newImageLinks[index] = value;
        setImageLinks(newImageLinks);
    };

    const handleAddImageLinkField = () => {
        setImageLinks([...imageLinks, '']);
    };

    const handleRemoveImageLinkField = (index: number) => {
        const newImageLinks = imageLinks.filter((_, i) => i !== index);
        setImageLinks(newImageLinks);
    };

    const handleSaveImageLinks = () => {
        const validLinks = imageLinks.filter(link => link.trim() !== '');
        if (validLinks.length > 0) {
            setEditingCaseStudy({
                ...editingCaseStudy,
                images: [...(editingCaseStudy?.images || []), ...validLinks]
            });
            setImageLinks(['']);
            toast({
                title: 'Image links added',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        }
    };

    const handleRemoveImage = (index: number) => {
        setEditingCaseStudy({
            ...editingCaseStudy,
            images: (editingCaseStudy?.images || []).filter((_: string, i: number) => i !== index)
        });
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
                        value={editingCaseStudy.results}
                        onChange={(e) => setEditingCaseStudy({
                            ...editingCaseStudy,
                            results: e.target.value
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
                        {editingCaseStudy?.technologies?.map((tech, index) => (
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
                                    technologies: (editingCaseStudy?.technologies || []).filter((_, i) => i !== index)
                                })} />
                            </Tag>
                        ))}
                    </HStack>
                </FormControl>

                <FormControl gridColumn={{ md: 'span 2' }}>
                    <FormLabel>Project Images</FormLabel>
                    <VStack spacing={4} align="stretch">
                        {/* Image Upload */}
                        <Box>
                            <Text mb={2} fontSize="sm" color="gray.600">Upload Images</Text>
                            <InputGroup size="md">
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    p={1}
                                />
                                <InputRightElement width="4.5rem">
                                    <Button h="1.75rem" size="sm" variant="ghost">
                                        Upload
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </Box>

                        {/* Image Links */}
                        <Box>
                            <Text mb={2} fontSize="sm" color="gray.600">Image Links</Text>
                            <VStack spacing={2} align="stretch">
                                {imageLinks.map((link, index) => (
                                    <HStack key={index} spacing={2}>
                                        <Input
                                            value={link}
                                            onChange={(e) => handleImageLinkChange(index, e.target.value)}
                                            placeholder="Add image URL"
                                            size="md"
                                        />
                                        <IconButton
                                            aria-label="Remove field"
                                            icon={<X />}
                                            onClick={() => handleRemoveImageLinkField(index)}
                                            size="md"
                                            isDisabled={imageLinks.length === 1}
                                        />
                                    </HStack>
                                ))}
                                <Button
                                    leftIcon={<Plus />}
                                    onClick={handleAddImageLinkField}
                                    size="sm"
                                    alignSelf="flex-start"
                                >
                                    Add Another Link
                                </Button>
                                <Button
                                    colorScheme="blue"
                                    onClick={handleSaveImageLinks}
                                    size="sm"
                                    alignSelf="flex-start"
                                >
                                    Save Image Links
                                </Button>
                            </VStack>
                        </Box>

                        {/* Media Preview Grid */}
                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mt={4}>
                            {editingCaseStudy?.images?.map((image, index) => (
                                <Box key={`img-${index}`} position="relative">
                                    <Image
                                        src={image}
                                        alt={`Project image ${index + 1}`}
                                        borderRadius="md"
                                        objectFit="cover"
                                        width="100%"
                                        height="200px"
                                    />
                                    <IconButton
                                        aria-label="Remove image"
                                        icon={<X />}
                                        size="sm"
                                        position="absolute"
                                        top={2}
                                        right={2}
                                        colorScheme="red"
                                        onClick={() => handleRemoveImage(index)}
                                    />
                                </Box>
                            ))}
                        </SimpleGrid>
                    </VStack>
                </FormControl>
            </SimpleGrid>
        </VStack>
    );
}; 