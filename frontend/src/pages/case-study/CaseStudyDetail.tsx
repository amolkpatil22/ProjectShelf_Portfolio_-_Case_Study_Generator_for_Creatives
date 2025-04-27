import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Heading,
    Text,
    Image,
    Badge,
    VStack,
    HStack,
    Button,
    Grid,
    Icon,
    useColorModeValue,
    Divider,
    Flex,
    Avatar,
    SimpleGrid,
    Spinner,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react';
import { ArrowLeft, ExternalLink, Github, Linkedin, Mail } from 'lucide-react';
import { useCaseStudy } from './hooks/useCaseStudy';
import { CaseStudy } from '../../pages/portfolio-builder/types/portfolioBuilderTypes';

// Fallback images
const FALLBACK_PROFILE_IMAGE = 'https://ui-avatars.com/api/?background=random';
const FALLBACK_CASE_STUDY_IMAGE = 'https://source.unsplash.com/random/800x600/?design,technology';

const getImageUrl = (imageUrl: string | undefined, type: 'profile' | 'case-study' = 'case-study') => {
    if (!imageUrl) {
        return type === 'profile' ? FALLBACK_PROFILE_IMAGE : FALLBACK_CASE_STUDY_IMAGE;
    }
    return imageUrl;
};

interface CaseStudyDetailProps {
    theme?: 'minimal' | 'creative' | 'bold';
}

const MinimalTheme = ({ caseStudy }: { caseStudy: CaseStudy }) => {
    const navigate = useNavigate();
    return (
        <Box bg="white">
            <Container maxW="container.xl" py={20}>
                <VStack spacing={20} align="stretch">
                    <Button
                        leftIcon={<ArrowLeft />}
                        variant="ghost"
                        alignSelf="flex-start"
                        onClick={() => navigate(-1)}
                    >
                        Back to Portfolio
                    </Button>

                    <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={12}>
                        <VStack spacing={8} align="stretch">
                            <Box borderRadius="xl" overflow="hidden" boxShadow="xl">
                                <Box position="relative" width="100%" paddingTop="56.25%"> {/* 16:9 Aspect Ratio */}
                                    <Image
                                        src={getImageUrl(caseStudy.image)}
                                        alt={caseStudy.title}
                                        position="absolute"
                                        top="0"
                                        left="0"
                                        width="100%"
                                        height="100%"
                                        objectFit="cover"
                                    />
                                </Box>
                            </Box>
                            <VStack spacing={4} align="stretch">
                                <Badge colorScheme="purple" alignSelf="flex-start">
                                    {caseStudy.category}
                                </Badge>
                                <Heading size="xl">{caseStudy.title}</Heading>
                                <Text fontSize="lg" color="gray.600">
                                    {caseStudy.description}
                                </Text>
                                <HStack spacing={2} wrap="wrap">
                                    {caseStudy.tools.map((tool: string) => (
                                        <Badge key={tool} colorScheme="gray">
                                            {tool}
                                        </Badge>
                                    ))}
                                </HStack>
                            </VStack>
                        </VStack>

                        <VStack spacing={8} align="stretch">
                            <Box p={8} borderRadius="xl" borderWidth="1px">
                                <VStack spacing={6} align="stretch">
                                    <Box>
                                        <Heading size="md" mb={2}>Challenge</Heading>
                                        <Text color="gray.600">{caseStudy.challenge}</Text>
                                    </Box>
                                    <Divider />
                                    <Box>
                                        <Heading size="md" mb={2}>Solution</Heading>
                                        <Text color="gray.600">{caseStudy.solution}</Text>
                                    </Box>
                                    <Divider />
                                    <Box>
                                        <Heading size="md" mb={2}>Outcome</Heading>
                                        <Text color="gray.600">{caseStudy.outcome}</Text>
                                    </Box>
                                </VStack>
                            </Box>

                            {caseStudy.images && caseStudy.images.length > 0 && (
                                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                                    {caseStudy.images.map((image: string, index: number) => (
                                        <Box key={index} borderRadius="lg" overflow="hidden">
                                            <Box position="relative" width="100%" paddingTop="75%"> {/* 4:3 Aspect Ratio */}
                                                <Image
                                                    src={getImageUrl(image)}
                                                    alt={`${caseStudy.title} - Image ${index + 1}`}
                                                    position="absolute"
                                                    top="0"
                                                    left="0"
                                                    width="100%"
                                                    height="100%"
                                                    objectFit="cover"
                                                />
                                            </Box>
                                        </Box>
                                    ))}
                                </SimpleGrid>
                            )}

                            {caseStudy.videoLinks && caseStudy.videoLinks.length > 0 && (
                                <VStack spacing={4} align="stretch">
                                    <Heading size="md">Videos</Heading>
                                    {caseStudy.videoLinks.map((videoLink: string, index: number) => (
                                        <Box key={index} position="relative" width="100%" paddingTop="56.25%"> {/* 16:9 Aspect Ratio */}
                                            <iframe
                                                src={videoLink}
                                                title={`${caseStudy.title} - Video ${index + 1}`}
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    border: 0,
                                                }}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        </Box>
                                    ))}
                                </VStack>
                            )}

                            {caseStudy.timeline && caseStudy.timeline.length > 0 && (
                                <Box p={8} borderRadius="xl" borderWidth="1px">
                                    <VStack spacing={6} align="stretch">
                                        <Heading size="md">Timeline</Heading>
                                        {caseStudy.timeline.map((entry: { date: string; title: string; description: string }, index: number) => (
                                            <Box key={index}>
                                                <Text fontWeight="bold" color="gray.700">
                                                    {new Date(entry.date).toLocaleDateString()}
                                                </Text>
                                                <Heading size="sm" mt={1}>{entry.title}</Heading>
                                                <Text color="gray.600">{entry.description}</Text>
                                                {index < caseStudy.timeline.length - 1 && <Divider mt={4} />}
                                            </Box>
                                        ))}
                                    </VStack>
                                </Box>
                            )}
                        </VStack>
                    </Grid>
                </VStack>
            </Container>
        </Box>
    );
};

// For now, we'll use the same MinimalTheme for all themes
const CreativeTheme = ({ caseStudy }: { caseStudy: CaseStudy }) => {
    return <MinimalTheme caseStudy={caseStudy} />;
};

const BoldTheme = ({ caseStudy }: { caseStudy: CaseStudy }) => {
    return <MinimalTheme caseStudy={caseStudy} />;
};

const CaseStudyDetail = ({ theme = 'minimal' }: CaseStudyDetailProps) => {
    const [searchParams] = useSearchParams();
    const { caseStudy, loading, error, notFound } = useCaseStudy();
    const selectedTheme = (searchParams.get('theme') || theme) as 'minimal' | 'creative' | 'bold';

    if (loading) {
        return (
            <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
                <Spinner size="xl" />
            </Box>
        );
    }

    if (error) {
        return (
            <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
                <Alert status="error" maxW="container.md">
                    <AlertIcon />
                    <AlertTitle>Error!</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </Box>
        );
    }

    if (notFound) {
        return (
            <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
                <Alert status="warning" maxW="container.md">
                    <AlertIcon />
                    <AlertTitle>Not Found</AlertTitle>
                    <AlertDescription>The case study you're looking for doesn't exist.</AlertDescription>
                </Alert>
            </Box>
        );
    }

    if (!caseStudy) {
        return null;
    }

    switch (selectedTheme) {
        case 'creative':
            return <CreativeTheme caseStudy={caseStudy} />;
        case 'bold':
            return <BoldTheme caseStudy={caseStudy} />;
        default:
            return <MinimalTheme caseStudy={caseStudy} />;
    }
};

export default CaseStudyDetail; 