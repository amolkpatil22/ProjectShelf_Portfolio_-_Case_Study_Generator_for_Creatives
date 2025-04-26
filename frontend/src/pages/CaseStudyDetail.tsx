import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
} from '@chakra-ui/react';
import { ArrowLeft, ExternalLink, Github, Linkedin, Mail } from 'lucide-react';

interface CaseStudy {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    tools: string[];
    challenge: string;
    solution: string;
    outcome: string;
}

const sampleCaseStudy: CaseStudy = {
    id: '1',
    title: 'E-Commerce Website Redesign',
    description: 'Complete redesign of an online retail platform focusing on user experience and conversion optimization.',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
    category: 'UX Design',
    tools: ['Figma', 'React', 'Node.js'],
    challenge: 'The client needed to improve their conversion rate and user engagement.',
    solution: 'Implemented a new user-centered design with improved navigation and checkout flow.',
    outcome: 'Increased conversions by 47% and reduced cart abandonment by 30%.'
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
                                <Image
                                    src={caseStudy.image}
                                    alt={caseStudy.title}
                                    w="full"
                                    h="400px"
                                    objectFit="cover"
                                />
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
                                    {caseStudy.tools.map((tool) => (
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

                            <HStack spacing={4}>
                                <Button
                                    leftIcon={<ExternalLink />}
                                    colorScheme="primary"
                                    size="lg"
                                    flex={1}
                                >
                                    View Live Project
                                </Button>
                                <Button
                                    leftIcon={<Github />}
                                    variant="outline"
                                    size="lg"
                                    flex={1}
                                >
                                    View Code
                                </Button>
                            </HStack>
                        </VStack>
                    </Grid>
                </VStack>
            </Container>
        </Box>
    );
};

const CreativeTheme = ({ caseStudy }: { caseStudy: CaseStudy }) => {
    const navigate = useNavigate();
    return (
        <Box bg="gray.50">
            <Container maxW="container.xl" py={20}>
                <Button
                    leftIcon={<ArrowLeft />}
                    variant="ghost"
                    mb={8}
                    onClick={() => navigate(-1)}
                >
                    Back to Portfolio
                </Button>

                <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={12}>
                    <Box position="relative">
                        <Box
                            position="absolute"
                            top="-20px"
                            left="-20px"
                            right="20px"
                            bottom="20px"
                            bg="accent.400"
                            zIndex={0}
                            borderRadius="2xl"
                        />
                        <Image
                            src={caseStudy.image}
                            alt={caseStudy.title}
                            borderRadius="2xl"
                            position="relative"
                            zIndex={1}
                            objectFit="cover"
                            h="full"
                        />
                    </Box>
                    <VStack align="start" spacing={6} justify="center">
                        <Badge
                            fontSize="sm"
                            color="white"
                            bg="primary.400"
                            px={3}
                            py={1}
                            borderRadius="full"
                        >
                            {caseStudy.category}
                        </Badge>
                        <Heading
                            size="3xl"
                            bgGradient="linear(to-r, primary.400, accent.400)"
                            bgClip="text"
                        >
                            {caseStudy.title}
                        </Heading>
                        <Text fontSize="lg" color="gray.600">{caseStudy.description}</Text>
                        <HStack wrap="wrap" spacing={2}>
                            {caseStudy.tools.map((tool) => (
                                <Badge key={tool} variant="outline">{tool}</Badge>
                            ))}
                        </HStack>
                    </VStack>
                </Grid>

                <VStack spacing={12} mt={16}>
                    <Box
                        bg="white"
                        p={8}
                        borderRadius="xl"
                        borderWidth="1px"
                        w="full"
                    >
                        <VStack spacing={8} align="stretch">
                            <Box>
                                <Heading size="lg" mb={4}>Challenge</Heading>
                                <Text fontSize="lg" color="gray.600">{caseStudy.challenge}</Text>
                            </Box>
                            <Divider />
                            <Box>
                                <Heading size="lg" mb={4}>Solution</Heading>
                                <Text fontSize="lg" color="gray.600">{caseStudy.solution}</Text>
                            </Box>
                            <Divider />
                            <Box>
                                <Heading size="lg" mb={4}>Outcome</Heading>
                                <Text fontSize="lg" color="gray.600">{caseStudy.outcome}</Text>
                            </Box>
                        </VStack>
                    </Box>

                    <HStack spacing={4} w="full">
                        <Button
                            leftIcon={<ExternalLink />}
                            colorScheme="primary"
                            size="lg"
                            flex={1}
                        >
                            View Live Project
                        </Button>
                        <Button
                            leftIcon={<Github />}
                            variant="outline"
                            size="lg"
                            flex={1}
                        >
                            View Code
                        </Button>
                    </HStack>
                </VStack>
            </Container>
        </Box>
    );
};

const BoldTheme = ({ caseStudy }: { caseStudy: CaseStudy }) => {
    const navigate = useNavigate();
    return (
        <Box bg="black" color="white">
            <Container maxW="container.xl" py={20}>
                <Button
                    leftIcon={<ArrowLeft />}
                    variant="ghost"
                    colorScheme="whiteAlpha"
                    mb={8}
                    onClick={() => navigate(-1)}
                >
                    Back to Portfolio
                </Button>

                <Box
                    position="relative"
                    minH="70vh"
                    display="flex"
                    alignItems="center"
                    mb={20}
                >
                    <Grid
                        templateColumns={{ base: '1fr', lg: '1.5fr 1fr' }}
                        gap={20}
                        alignItems="center"
                    >
                        <Box position="relative">
                            <Box
                                position="absolute"
                                top="-20px"
                                left="-20px"
                                right="20px"
                                bottom="20px"
                                bg="primary.400"
                                borderRadius="2xl"
                                opacity={0.3}
                            />
                            <Image
                                src={caseStudy.image}
                                alt={caseStudy.title}
                                borderRadius="2xl"
                                position="relative"
                            />
                        </Box>
                        <VStack align="start" spacing={8}>
                            <Badge
                                color="white"
                                bg="primary.400"
                                px={3}
                                py={1}
                                borderRadius="full"
                            >
                                {caseStudy.category}
                            </Badge>
                            <Heading
                                size="4xl"
                                lineHeight="shorter"
                                bgGradient="linear(to-r, primary.400, accent.400)"
                                bgClip="text"
                            >
                                {caseStudy.title}
                            </Heading>
                            <Text fontSize="xl" color="gray.400">
                                {caseStudy.description}
                            </Text>
                            <HStack spacing={2}>
                                {caseStudy.tools.map((tool) => (
                                    <Badge
                                        key={tool}
                                        bg="gray.800"
                                        color="gray.300"
                                    >
                                        {tool}
                                    </Badge>
                                ))}
                            </HStack>
                        </VStack>
                    </Grid>
                </Box>

                <VStack spacing={16}>
                    <Box
                        bg="gray.900"
                        p={12}
                        borderRadius="2xl"
                        w="full"
                    >
                        <VStack spacing={12} align="stretch">
                            <Box>
                                <Heading size="2xl" mb={6}>Challenge</Heading>
                                <Text fontSize="xl" color="gray.400">{caseStudy.challenge}</Text>
                            </Box>
                            <Divider borderColor="gray.700" />
                            <Box>
                                <Heading size="2xl" mb={6}>Solution</Heading>
                                <Text fontSize="xl" color="gray.400">{caseStudy.solution}</Text>
                            </Box>
                            <Divider borderColor="gray.700" />
                            <Box>
                                <Heading size="2xl" mb={6}>Outcome</Heading>
                                <Text fontSize="xl" color="gray.400">{caseStudy.outcome}</Text>
                            </Box>
                        </VStack>
                    </Box>

                    <HStack spacing={6} w="full">
                        <Button
                            leftIcon={<ExternalLink />}
                            colorScheme="primary"
                            size="lg"
                            flex={1}
                            height="60px"
                            fontSize="lg"
                        >
                            View Live Project
                        </Button>
                        <Button
                            leftIcon={<Github />}
                            variant="outline"
                            colorScheme="whiteAlpha"
                            size="lg"
                            flex={1}
                            height="60px"
                            fontSize="lg"
                        >
                            View Code
                        </Button>
                    </HStack>
                </VStack>
            </Container>
        </Box>
    );
};

const CaseStudyDetail = ({ theme = 'minimal' }: CaseStudyDetailProps) => {
    const { id } = useParams();
    // In a real application, you would fetch the case study data based on the ID
    const caseStudy = sampleCaseStudy;

    switch (theme) {
        case 'creative':
            return <CreativeTheme caseStudy={caseStudy} />;
        case 'bold':
            return <BoldTheme caseStudy={caseStudy} />;
        default:
            return <MinimalTheme caseStudy={caseStudy} />;
    }
};

export default CaseStudyDetail; 