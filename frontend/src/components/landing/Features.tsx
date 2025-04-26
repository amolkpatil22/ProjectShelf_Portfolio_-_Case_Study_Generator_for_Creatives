import React from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { PenTool, Layout, Image as ImageIcon, BarChart, PaintBucket, Users } from 'lucide-react';

const MotionBox = motion(Box);

interface FeatureProps {
  title: string;
  text: string;
  icon: React.ReactElement;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Stack
        align="start"
        p={6}
        bg="white"
        rounded="xl"
        boxShadow="md"
        height="full"
        borderWidth="1px"
        borderColor="gray.100"
        _hover={{
          transform: 'translateY(-5px)',
          boxShadow: 'lg',
          borderColor: 'primary.100',
        }}
        transition="all 0.3s ease"
      >
        <Flex
          w={12}
          h={12}
          align="center"
          justify="center"
          rounded="full"
          mb={4}
          bg="primary.50"
          color="primary.400"
        >
          {icon}
        </Flex>
        <Heading size="md" fontWeight="700" mb={2}>
          {title}
        </Heading>
        <Text color="gray.600">{text}</Text>
      </Stack>
    </MotionBox>
  );
};

const Features = () => {
  return (
    <Box id="features" py={{ base: 16, md: 24 }} bg="gray.50">
      <Container maxW="container.xl">
        <Stack spacing={12}>
          <Stack spacing={4} as={Container} maxW="3xl" textAlign="center" mb={8}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Text
                color="primary.400"
                fontWeight="semibold"
                fontSize="md"
                textTransform="uppercase"
                mb={2}
                letterSpacing="wider"
              >
                Project Showcase
              </Text>
              <Heading
                mb={4}
                fontSize={{ base: '3xl', md: '4xl' }}
                fontWeight="bold"
                lineHeight="shorter"
              >
                Every creative deserves a{' '}
                <Text as="span" bgGradient="linear(to-r, primary.400, accent.400)" bgClip="text">
                  professional portfolio
                </Text>
              </Heading>
              <Text color="gray.600" fontSize={{ base: 'md', md: 'lg' }} maxW="2xl" mx="auto">
                Build a portfolio that showcases your best work and highlights your creative process from start to finish.
              </Text>
            </MotionBox>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            <Feature
              icon={<Icon as={Layout} w={6} h={6} />}
              title="Custom Portfolios"
              text="Create a personalized portfolio site with your own domain and unique branding that stands out from the crowd."
            />
            <Feature
              icon={<Icon as={PenTool} w={6} h={6} />}
              title="Detailed Case Studies"
              text="Document your creative process with rich media galleries, timelines, and outcome metrics that tell the full story."
            />
            <Feature
              icon={<Icon as={ImageIcon} w={6} h={6} />}
              title="Media Galleries"
              text="Showcase high-resolution images, videos, and interactive elements that demonstrate the quality of your work."
            />
            <Feature
              icon={<Icon as={PaintBucket} w={6} h={6} />}
              title="Theme Engine"
              text="Choose from beautiful pre-built themes or customize your own to match your personal brand identity."
            />
            <Feature
              icon={<Icon as={BarChart} w={6} h={6} />}
              title="Analytics Dashboard"
              text="Track portfolio traffic, engagement metrics, and potential client interest to optimize your presentation."
            />
            <Feature
              icon={<Icon as={Users} w={6} h={6} />}
              title="Client Feedback"
              text="Collect and display testimonials and feedback directly on your portfolio to build credibility."
            />
          </SimpleGrid>

          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            w="full"
            mt={12}
          >
            <Box
              bg="white"
              rounded="xl"
              boxShadow="xl"
              overflow="hidden"
              borderWidth="1px"
              borderColor="gray.200"
            >
              <Image
                src="https://images.pexels.com/photos/5926393/pexels-photo-5926393.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt="Portfolio dashboard preview"
                w="full"
                h="auto"
              />
            </Box>
          </MotionBox>
        </Stack>
      </Container>
    </Box>
  );
};

export default Features;