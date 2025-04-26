import React from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  SimpleGrid,
  useColorModeValue,
  Badge,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const MotionBox = motion(Box);

interface CaseStudyCardProps {
  title: string;
  category: string;
  image: string;
  description: string;
  index: number;
}

const CaseStudyCard = ({ title, category, image, description, index }: CaseStudyCardProps) => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Box
        bg="white"
        borderWidth="1px"
        borderColor="gray.200"
        borderRadius="xl"
        overflow="hidden"
        boxShadow="md"
        _hover={{
          transform: 'translateY(-5px)',
          boxShadow: 'lg',
        }}
        transition="all 0.3s ease"
        height="100%"
      >
        <Box position="relative" height="220px" overflow="hidden">
          <Image
            src={image}
            alt={title}
            objectFit="cover"
            w="full"
            h="full"
            transition="transform 0.3s ease"
            _groupHover={{ transform: 'scale(1.05)' }}
          />
          <Badge 
            position="absolute" 
            top="4" 
            right="4" 
            colorScheme="purple" 
            bg="accent.400"
            color="white"
            px="3"
            py="1"
            borderRadius="full"
          >
            {category}
          </Badge>
        </Box>
        <Stack p="6" spacing="3">
          <Heading size="md" fontWeight="bold">
            {title}
          </Heading>
          <Text color="gray.600" fontSize="sm">
            {description}
          </Text>
          <Flex pt="2" justify="flex-end">
            <Button 
              rightIcon={<ChevronRight size={16} />} 
              variant="link" 
              colorScheme="primary" 
              size="sm"
            >
              View case study
            </Button>
          </Flex>
        </Stack>
      </Box>
    </MotionBox>
  );
};

const caseStudies = [
  {
    title: "E-Commerce Website Redesign",
    category: "UX Design",
    image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description: "Increasing conversions by 47% through a comprehensive UX research and design process for an online retailer."
  },
  {
    title: "Mobile Banking App",
    category: "Development",
    image: "https://images.pexels.com/photos/6804065/pexels-photo-6804065.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description: "Building a secure, intuitive mobile banking application with React Native and implementing biometric authentication."
  },
  {
    title: "Brand Identity System",
    category: "Branding",
    image: "https://images.pexels.com/photos/6444/pencil-typography-black-design.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description: "Creating a comprehensive brand identity system for a tech startup, including logo, color palette, and style guide."
  }
];

const CaseStudies = () => {
  return (
    <Box id="casestudies" py={{ base: 16, md: 24 }} bg="white">
      <Container maxW="container.xl">
        <Stack spacing={12}>
          <Stack 
            spacing={4} 
            direction={{ base: 'column', md: 'row' }} 
            justify="space-between"
            align={{ base: 'flex-start', md: 'flex-end' }}
            mb={8}
          >
            <Box maxW="2xl">
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Text
                  color="accent.400"
                  fontWeight="semibold"
                  fontSize="md"
                  textTransform="uppercase"
                  mb={2}
                  letterSpacing="wider"
                >
                  Case Study Templates
                </Text>
                <Heading
                  mb={4}
                  fontSize={{ base: '3xl', md: '4xl' }}
                  fontWeight="bold"
                  lineHeight="shorter"
                >
                  Tell your creative{' '}
                  <Text as="span" bgGradient="linear(to-r, primary.400, accent.400)" bgClip="text">
                    success stories
                  </Text>
                </Heading>
                <Text color="gray.600" fontSize={{ base: 'md', md: 'lg' }}>
                  Our modular case study builder makes it easy to document your design process, development work, or writing projects with beautiful templates.
                </Text>
              </MotionBox>
            </Box>
            
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button
                size="lg"
                rightIcon={<ChevronRight />}
                colorScheme="primary"
              >
                Browse All Templates
              </Button>
            </MotionBox>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {caseStudies.map((study, index) => (
              <CaseStudyCard
                key={index}
                title={study.title}
                category={study.category}
                image={study.image}
                description={study.description}
                index={index}
              />
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
};

export default CaseStudies;