import React from 'react';
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
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, ChevronRight } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const MotionBox = motion(Box);

interface PreviewProps {
  theme: 'minimal' | 'creative' | 'bold';
  data: {
    name: string;
    title: string;
    bio: string;
    avatar: string;
    caseStudies: Array<{
      id: string;
      title: string;
      description: string;
      image: string;
      category: string;
      tools: string[];
    }>;
    contact: {
      email: string;
      linkedin: string;
      github: string;
      website: string;
    };
  };
}

const MinimalTheme = ({ data }: PreviewProps) => {
  const navigate = useNavigate();

  return (
    <Box bg="white">
      <Container maxW="container.xl" py={20}>
        <VStack spacing={20} align="stretch" className="theme-content">
          {/* Hero Section */}
          <VStack spacing={6} align="center" textAlign="center">
            <Avatar size="2xl" src={data.avatar} />
            <VStack spacing={3}>
              <Heading size="2xl">{data.name}</Heading>
              <Text fontSize="xl" color="gray.600">{data.title}</Text>
            </VStack>
            <Text maxW="2xl" color="gray.600">{data.bio}</Text>
            <HStack spacing={4}>
              <Link href={data.contact.github}><Icon as={Github} boxSize={6} /></Link>
              <Link href={data.contact.linkedin}><Icon as={Linkedin} boxSize={6} /></Link>
              <Link href={`mailto:${data.contact.email}`}><Icon as={Mail} boxSize={6} /></Link>
            </HStack>
          </VStack>

          {/* Case Studies */}
          <VStack spacing={12}>
            <Heading size="xl">Selected Work</Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
              {data.caseStudies.map((study) => (
                <Box
                  key={study.id}
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
                  transition="all 0.3s"
                  cursor="pointer"
                  onClick={() => navigate(`/case-study/${study.id}?theme=minimal`)}
                >
                  <Image
                    src={study.image}
                    alt={study.title}
                    h="200px"
                    w="full"
                    objectFit="cover"
                  />
                  <Box p={6}>
                    <Badge mb={2}>{study.category}</Badge>
                    <Heading size="md" mb={2}>{study.title}</Heading>
                    <Text color="gray.600" noOfLines={2}>{study.description}</Text>
                    <HStack mt={4} spacing={2}>
                      {study.tools.map((tool) => (
                        <Badge key={tool} colorScheme="gray">{tool}</Badge>
                      ))}
                    </HStack>
                    <Button
                      rightIcon={<ChevronRight />}
                      variant="ghost"
                      size="sm"
                      mt={4}
                      w="full"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/case-study/${study.id}?theme=minimal`);
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

const CreativeTheme = ({ data }: PreviewProps) => {
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
            <Image
              src={data.avatar}
              alt={data.name}
              borderRadius="2xl"
              position="relative"
              zIndex={1}
              objectFit="cover"
              h="full"
            />
          </Box>
          <VStack align="start" spacing={6} justify="center">
            <Heading
              size="3xl"
              bgGradient="linear(to-r, primary.400, accent.400)"
              bgClip="text"
            >
              {data.name}
            </Heading>
            <Text fontSize="2xl" fontWeight="bold" color="gray.700">
              {data.title}
            </Text>
            <Text fontSize="lg" color="gray.600">{data.bio}</Text>
            <HStack spacing={4}>
              <Button leftIcon={<Github />} variant="outline">GitHub</Button>
              <Button leftIcon={<Linkedin />} variant="outline">LinkedIn</Button>
              <Button leftIcon={<Mail />} variant="outline">Email</Button>
            </HStack>
          </VStack>
        </Grid>

        {/* Case Studies */}
        <VStack spacing={16} className="theme-content">
          {data.caseStudies.map((study, index) => (
            <Flex
              key={study.id}
              direction={{ base: 'column', lg: index % 2 === 0 ? 'row' : 'row-reverse' }}
              gap={12}
              align="center"
            >
              <Box
                position="relative"
                cursor="pointer"
                onClick={() => navigate(`/case-study/${study.id}?theme=creative`)}
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
                <Image
                  src={study.image}
                  alt={study.title}
                  borderRadius="xl"
                  objectFit="cover"
                />
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
                  onClick={() => navigate(`/case-study/${study.id}?theme=creative`)}
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

const BoldTheme = ({ data }: PreviewProps) => {
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
                {data.name}
              </Heading>
              <Heading size="2xl" color="gray.300">{data.title}</Heading>
              <Text fontSize="xl" color="gray.400" maxW="2xl">
                {data.bio}
              </Text>
              <HStack spacing={6}>
                <Link href={data.contact.github}>
                  <Icon as={Github} boxSize={8} color="white" />
                </Link>
                <Link href={data.contact.linkedin}>
                  <Icon as={Linkedin} boxSize={8} color="white" />
                </Link>
                <Link href={`mailto:${data.contact.email}`}>
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
              <Image
                src={data.avatar}
                alt={data.name}
                borderRadius="2xl"
                position="relative"
              />
            </Box>
          </Grid>
        </Box>

        {/* Case Studies */}
        <VStack spacing={20} className="theme-content">
          <Heading size="2xl" textAlign="center">Featured Work</Heading>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12}>
            {data.caseStudies.map((study) => (
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
                <Image
                  src={study.image}
                  alt={study.title}
                  h="300px"
                  w="full"
                  objectFit="cover"
                  transition="all 0.3s"
                />
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
  const [searchParams] = useSearchParams();
  const theme = (searchParams.get('theme') || 'minimal') as 'minimal' | 'creative' | 'bold';
  const primaryColor = searchParams.get('color') || '#3358FF';
  const fontFamily = searchParams.get('font') || 'Inter';

  // Apply custom theme settings
  React.useEffect(() => {
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

  const sampleData = {
    name: "Sarah Anderson",
    title: "Product Designer & Developer",
    bio: "I'm a multidisciplinary designer and developer with over 8 years of experience creating digital products that solve real problems. I specialize in user interface design, brand identity, and front-end development.",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    caseStudies: [
      {
        id: '1',
        title: 'E-Commerce Website Redesign',
        description: 'Complete redesign of an online retail platform focusing on user experience and conversion optimization.',
        image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
        category: 'UX Design',
        tools: ['Figma', 'React', 'Node.js'],
      },
      {
        id: '2',
        title: 'Mobile Banking App',
        description: 'A secure and intuitive mobile banking application with advanced features and biometric authentication.',
        image: 'https://images.pexels.com/photos/6804065/pexels-photo-6804065.jpeg',
        category: 'Development',
        tools: ['React Native', 'TypeScript', 'Firebase'],
      },
      {
        id: '3',
        title: 'Brand Identity System',
        description: 'Comprehensive brand identity design for a technology startup, including logo, guidelines, and marketing materials.',
        image: 'https://images.pexels.com/photos/6444/pencil-typography-black-design.jpg',
        category: 'Branding',
        tools: ['Illustrator', 'Photoshop', 'InDesign'],
      },
    ],
    contact: {
      email: "sarah@example.com",
      linkedin: "https://linkedin.com/in/sarah",
      github: "https://github.com/sarah",
      website: "https://sarah.design"
    }
  };

  switch (theme) {
    case 'creative':
      return <CreativeTheme theme={theme} data={sampleData} />;
    case 'bold':
      return <BoldTheme theme={theme} data={sampleData} />;
    default:
      return <MinimalTheme theme={theme} data={sampleData} />;
  }
};

export default PortfolioPreview;