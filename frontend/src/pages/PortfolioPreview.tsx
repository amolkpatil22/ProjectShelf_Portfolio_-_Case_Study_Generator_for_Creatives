import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  SimpleGrid,
  Flex,
  Badge,
  VStack,
  HStack,
  Button,
  Link,
  Grid,
  Avatar,
  Icon,
  useColorModeValue,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, ChevronRight } from 'lucide-react';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setPortfolio, setLoading, setError } from '../redux/features/portfolioSlice';
import { getPortfolioById } from './portfolio-builder/action/portfolioBuilderAction';
import { Portfolio } from './portfolio-builder/types/portfolioBuilderTypes';

const MotionBox = motion(Box);

// Fallback images
const FALLBACK_PROFILE_IMAGE = 'https://ui-avatars.com/api/?background=random';
const FALLBACK_CASE_STUDY_IMAGE = 'https://source.unsplash.com/random/800x600/?design,technology';

const getImageUrl = (imageUrl: string | undefined, type: 'profile' | 'case-study' = 'case-study') => {
  if (!imageUrl) {
    return type === 'profile' ? FALLBACK_PROFILE_IMAGE : FALLBACK_CASE_STUDY_IMAGE;
  }
  return imageUrl;
};

interface ThemeProps {
  portfolio: Portfolio;
}

const MinimalTheme = ({ portfolio }: ThemeProps) => {
  const navigate = useNavigate();

  return (
    <Box bg="white">
      <Container maxW="container.xl" py={20}>
        <VStack spacing={20} align="stretch" className="theme-content">
          {/* Hero Section */}
          <VStack spacing={6} align="center" textAlign="center">
            <Avatar size="2xl" src={getImageUrl(portfolio.profileImage, 'profile')} />
            <VStack spacing={3}>
              <Heading size="2xl">{portfolio.name}</Heading>
              <Text fontSize="xl" color="gray.600">{portfolio.title}</Text>
            </VStack>
            <Text maxW="2xl" color="gray.600">{portfolio.bio}</Text>
            <HStack spacing={4}>
              <Link href={portfolio.github}><Icon as={Github} boxSize={6} /></Link>
              <Link href={portfolio.linkedin}><Icon as={Linkedin} boxSize={6} /></Link>
              <Link href={`mailto:${portfolio.email}`}><Icon as={Mail} boxSize={6} /></Link>
            </HStack>
          </VStack>

          {/* Case Studies */}
          <VStack spacing={12}>
            <Heading size="xl">Selected Work</Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
              {portfolio.caseStudies.map((study) => (
                <Box
                  key={study.id}
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
                  transition="all 0.3s"
                  cursor="pointer"
                  onClick={() => navigate(`/case-study/${study.id}`)}
                >
                  <Box position="relative" width="100%" paddingTop="56.25%"> {/* 16:9 Aspect Ratio */}
                    <Image
                      src={getImageUrl(study.image)}
                      alt={study.title}
                      position="absolute"
                      top="0"
                      left="0"
                      width="100%"
                      height="100%"
                      objectFit="cover"
                    />
                  </Box>
                  <Box p={6}>
                    <Badge colorScheme="blue" mb={2}>{study.category}</Badge>
                    <Heading size="md" mb={2}>{study.title}</Heading>
                    <Text color="gray.600" noOfLines={2}>{study.description}</Text>
                    <HStack mt={4} spacing={2} flexWrap="wrap">
                      {study.tools.map((tool) => (
                        <Badge key={tool} colorScheme="gray">{tool}</Badge>
                      ))}
                    </HStack>
                    <Button
                      rightIcon={<ChevronRight />}
                      variant="ghost"
                      mt={4}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/case-study/${study.id}`);
                      }}
                    >
                      View Case Study
                    </Button>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

const CreativeTheme = ({ portfolio }: ThemeProps) => {
  const navigate = useNavigate();

  return (
    <Box bg="gray.50">
      <Container maxW="container.xl" py={20}>
        {/* Hero Section */}
        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={20} mb={20} className="theme-content">
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
            <Box position="relative" width="100%" paddingTop="100%"> {/* 1:1 Aspect Ratio */}
              <Image
                src={getImageUrl(portfolio.profileImage, 'profile')}
                alt={portfolio.name}
                borderRadius="2xl"
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                objectFit="cover"
                zIndex={1}
              />
            </Box>
          </Box>
          <VStack align="start" spacing={6} justify="center">
            <Heading
              size="3xl"
              bgGradient="linear(to-r, primary.400, accent.400)"
              bgClip="text"
            >
              {portfolio.name}
            </Heading>
            <Text fontSize="2xl" fontWeight="bold" color="gray.700">
              {portfolio.title}
            </Text>
            <Text fontSize="lg" color="gray.600">{portfolio.bio}</Text>
            <HStack spacing={4}>
              <Button leftIcon={<Github />} variant="outline">GitHub</Button>
              <Button leftIcon={<Linkedin />} variant="outline">LinkedIn</Button>
              <Button leftIcon={<Mail />} variant="outline">Email</Button>
            </HStack>
          </VStack>
        </Grid>

        {/* Case Studies */}
        <VStack spacing={16} className="theme-content">
          {portfolio.caseStudies.map((study, index) => (
            <Flex
              key={study.id}
              direction={{ base: 'column', lg: index % 2 === 0 ? 'row' : 'row-reverse' }}
              gap={12}
              align="center"
            >
              <Box
                position="relative"
                cursor="pointer"
                onClick={() => navigate(`/case-study/${study.id}`)}
                flex="1"
                _before={{
                  content: '""',
                  position: 'absolute',
                  top: '-10px',
                  left: '-10px',
                  right: '10px',
                  bottom: '10px',
                  bg: index % 2 === 0 ? 'primary.400' : 'accent.400',
                  opacity: 0.1,
                  borderRadius: 'xl',
                }}
              >
                <Box position="relative" width="100%" paddingTop="75%"> {/* 4:3 Aspect Ratio */}
                  <Image
                    src={getImageUrl(study.image)}
                    alt={study.title}
                    borderRadius="xl"
                    position="absolute"
                    top="0"
                    left="0"
                    width="100%"
                    height="100%"
                    objectFit="cover"
                  />
                </Box>
              </Box>
              <VStack align="start" spacing={6} flex="1">
                <Badge
                  fontSize="sm"
                  color="white"
                  bg={index % 2 === 0 ? 'primary.400' : 'accent.400'}
                  px={3}
                  py={1}
                  borderRadius="full"
                >
                  {study.category}
                </Badge>
                <Heading size="lg">{study.title}</Heading>
                <Text color="gray.600">{study.description}</Text>
                <HStack wrap="wrap" spacing={2}>
                  {study.tools.map((tool) => (
                    <Badge key={tool} variant="outline">{tool}</Badge>
                  ))}
                </HStack>
                <Button
                  rightIcon={<ChevronRight />}
                  variant="ghost"
                  colorScheme={index % 2 === 0 ? 'primary' : 'accent'}
                  onClick={() => navigate(`/case-study/${study.id}`)}
                >
                  View Case Study
                </Button>
              </VStack>
            </Flex>
          ))}
        </VStack>
      </Container>
    </Box>
  );
};

const BoldTheme = ({ portfolio }: ThemeProps) => {
  const navigate = useNavigate();

  return (
    <Box bg="black" color="white">
      <Container maxW="container.xl" py={20}>
        {/* Hero Section */}
        <Box
          position="relative"
          minH="90vh"
          display="flex"
          alignItems="center"
          mb={20}
          className="theme-content"
        >
          <Grid
            templateColumns={{ base: '1fr', lg: '1.5fr 1fr' }}
            gap={20}
            alignItems="center"
          >
            <VStack align="start" spacing={8}>
              <Heading
                size="4xl"
                lineHeight="shorter"
                bgGradient="linear(to-r, primary.400, accent.400)"
                bgClip="text"
              >
                {portfolio.name}
              </Heading>
              <Heading size="2xl" color="gray.300">{portfolio.title}</Heading>
              <Text fontSize="xl" color="gray.400" maxW="2xl">
                {portfolio.bio}
              </Text>
              <HStack spacing={6}>
                <Link href={portfolio.github}><Icon as={Github} boxSize={8} color="white" /></Link>
                <Link href={portfolio.linkedin}><Icon as={Linkedin} boxSize={8} color="white" /></Link>
                <Link href={`mailto:${portfolio.email}`}>
                  <Icon as={Mail} boxSize={8} color="white" />
                </Link>
              </HStack>
            </VStack>
            <Box
              position="relative"
              _before={{
                content: '""',
                position: 'absolute',
                top: '-20px',
                left: '-20px',
                right: '20px',
                bottom: '20px',
                bg: 'primary.400',
                borderRadius: '2xl',
                opacity: 0.3,
              }}
            >
              <Box position="relative" width="100%" paddingTop="100%"> {/* 1:1 Aspect Ratio */}
                <Image
                  src={getImageUrl(portfolio.profileImage, 'profile')}
                  alt={portfolio.name}
                  borderRadius="2xl"
                  position="absolute"
                  top="0"
                  left="0"
                  width="100%"
                  height="100%"
                  objectFit="cover"
                />
              </Box>
            </Box>
          </Grid>
        </Box>

        {/* Case Studies */}
        <VStack spacing={20} className="theme-content">
          <Heading size="2xl" textAlign="center">Featured Work</Heading>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12}>
            {portfolio.caseStudies.map((study) => (
              <Box
                key={study.id}
                bg="gray.900"
                borderRadius="2xl"
                overflow="hidden"
                position="relative"
                cursor="pointer"
                onClick={() => navigate(`/case-study/${study.id}?theme=bold`)}
                _hover={{
                  transform: 'scale(1.02)',
                  '& > img': { transform: 'scale(1.1)' },
                }}
                transition="all 0.3s"
              >
                <Box position="relative" width="100%" paddingTop="56.25%"> {/* 16:9 Aspect Ratio */}
                  <Image
                    src={getImageUrl(study.image)}
                    alt={study.title}
                    position="absolute"
                    top="0"
                    left="0"
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    transition="all 0.3s"
                  />
                </Box>
                <Box
                  position="absolute"
                  bottom={0}
                  left={0}
                  right={0}
                  bg="rgba(0,0,0,0.8)"
                  backdropFilter="blur(10px)"
                  p={8}
                >
                  <VStack align="start" spacing={4}>
                    <Badge
                      color="white"
                      bg="primary.400"
                      px={3}
                      py={1}
                      borderRadius="full"
                    >
                      {study.category}
                    </Badge>
                    <Heading size="lg">{study.title}</Heading>
                    <Text color="gray.300">{study.description}</Text>
                    <HStack spacing={2}>
                      {study.tools.map((tool) => (
                        <Badge
                          key={tool}
                          bg="gray.800"
                          color="gray.300"
                        >
                          {tool}
                        </Badge>
                      ))}
                    </HStack>
                    <Button
                      rightIcon={<ExternalLink />}
                      variant="outline"
                      colorScheme="whiteAlpha"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/case-study/${study.id}?theme=bold`);
                      }}
                    >
                      View Project
                    </Button>
                  </VStack>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

const PortfolioPreview = () => {
  const { portfolioId } = useParams<{ portfolioId: string }>();
  const [searchParams] = useSearchParams();
  const theme = (searchParams.get('theme') || 'minimal') as 'minimal' | 'creative' | 'bold';
  const primaryColor = searchParams.get('color') || '#3358FF';
  const fontFamily = searchParams.get('font') || 'Inter';

  const dispatch = useDispatch();
  const portfolio = useSelector((state: RootState) => state.portfolio.currentPortfolio);
  const isLoading = useSelector((state: RootState) => state.portfolio.loading);
  const error = useSelector((state: RootState) => state.portfolio.error);

  // Fetch portfolio data
  useEffect(() => {
    const fetchPortfolioData = async () => {
      if (!portfolioId) {
        dispatch(setError('Portfolio ID is required'));
        return;
      }

      try {
        dispatch(setLoading(true));
        const response = await getPortfolioById(portfolioId);
        if (response.success && response.data) {
          dispatch(setPortfolio(response.data));
        } else {
          dispatch(setError(response.errors?.[0] || 'Failed to fetch portfolio'));
        }
      } catch (err) {
        dispatch(setError(err instanceof Error ? err.message : 'Failed to fetch portfolio'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchPortfolioData();
  }, [portfolioId, dispatch]);

  // Apply custom theme settings
  useEffect(() => {
    // Create a style element to inject custom CSS
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      :root {
        --chakra-colors-primary-400: ${primaryColor};
        --chakra-colors-primary-500: ${primaryColor};
        --chakra-colors-accent-400: ${primaryColor};
        --chakra-colors-accent-500: ${primaryColor};
      }
      
      /* Apply font family to the entire body */
      body {
        font-family: "${fontFamily}", sans-serif;
      }
      
      /* Create a class for theme-specific elements */
      .theme-content {
        --theme-primary-color: ${primaryColor};
        --theme-accent-color: ${primaryColor};
      }
      
      /* Ensure navbar and footer don't use theme colors */
      nav, footer {
        --chakra-colors-primary-400: #3358FF !important;
        --chakra-colors-primary-500: #3358FF !important;
        --chakra-colors-accent-400: #9061F9 !important;
        --chakra-colors-accent-500: #9061F9 !important;
      }
    `;
    document.head.appendChild(styleElement);

    // Clean up on unmount
    return () => {
      document.head.removeChild(styleElement);
    };
  }, [primaryColor, fontFamily]);

  if (isLoading) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error || !portfolio) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Alert status="error" maxW="container.md">
          <AlertIcon />
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>{error || 'Portfolio not found'}</AlertDescription>
        </Alert>
      </Box>
    );
  }

  switch (theme) {
    case 'creative':
      return <CreativeTheme portfolio={portfolio} />;
    case 'bold':
      return <BoldTheme portfolio={portfolio} />;
    default:
      return <MinimalTheme portfolio={portfolio} />;
  }
};

export default PortfolioPreview;