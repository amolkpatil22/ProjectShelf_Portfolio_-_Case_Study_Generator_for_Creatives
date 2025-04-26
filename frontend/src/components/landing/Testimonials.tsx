import React from 'react';
import {
  Avatar,
  Box,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const MotionBox = motion(Box);

interface TestimonialProps {
  content: string;
  name: string;
  title: string;
  avatar: string;
  index: number;
}

const testimonials = [
  {
    content: "ProjectShelf transformed how I present my work to clients. The case study templates made it easy to showcase my design process in a professional way that has impressed potential clients.",
    name: "Sarah Johnson",
    title: "UI/UX Designer",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    content: "As a freelance developer, I needed a portfolio that could showcase complex projects in an understandable way. ProjectShelf's templates and analytics have helped me land more clients.",
    name: "Michael Rodriguez",
    title: "Full-stack Developer",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    content: "The analytics dashboard gives me insights into which projects attract the most attention, allowing me to refine my portfolio strategy and highlight my most impactful work.",
    name: "Emily Chen",
    title: "Creative Director",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
];

const Testimonial = ({ content, name, title, avatar, index }: TestimonialProps) => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Stack
        bg="white"
        boxShadow="lg"
        p={8}
        rounded="xl"
        align="start"
        pos="relative"
        _after={{
          content: `""`,
          w: 0,
          h: 0,
          borderLeft: 'solid transparent',
          borderLeftWidth: 16,
          borderRight: 'solid transparent',
          borderRightWidth: 16,
          borderTop: 'solid',
          borderTopWidth: 16,
          borderTopColor: 'white',
          pos: 'absolute',
          bottom: '-16px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Icon 
          as={Quote} 
          w={10} 
          h={10} 
          color="primary.100" 
          mb={2}
        />
        <Text
          textAlign="left"
          color="gray.600"
          fontSize="md"
          fontStyle="italic"
        >
          {content}
        </Text>
      </Stack>
      <Flex align="center" mt={8} direction="column">
        <Avatar 
          src={avatar} 
          mb={2} 
          size="lg" 
          borderWidth={4}
          borderColor="white"
          boxShadow="md"
        />
        <Stack spacing={-1} align="center">
          <Text fontWeight="bold" fontSize="md">{name}</Text>
          <Text fontSize="sm" color="gray.600">{title}</Text>
        </Stack>
      </Flex>
    </MotionBox>
  );
};

const Testimonials = () => {
  return (
    <Box py={{ base: 16, md: 24 }} bg="white">
      <Container maxW="container.xl">
        <Stack spacing={8}>
          <Stack spacing={4} as={Container} maxW="3xl" textAlign="center" mb={10}>
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
                Testimonials
              </Text>
              <Heading
                mb={4}
                fontSize={{ base: '3xl', md: '4xl' }}
                fontWeight="bold"
                lineHeight="shorter"
              >
                What our users are{' '}
                <Text as="span" bgGradient="linear(to-r, primary.400, accent.400)" bgClip="text">
                  saying about us
                </Text>
              </Heading>
              <Text color="gray.600" fontSize={{ base: 'md', md: 'lg' }} maxW="2xl" mx="auto">
                Join thousands of creative professionals who use ProjectShelf to showcase their work and attract new opportunities.
              </Text>
            </MotionBox>
          </Stack>

          <Flex 
            flexWrap="wrap" 
            gridGap={6} 
            justify="center"
          >
            {testimonials.map((testimonial, index) => (
              <Box 
                key={index} 
                maxW={{ base: '100%', md: 'calc(33.33% - 24px)' }}
                flex="1"
                minW={{ base: '100%', md: '300px' }}
              >
                <Testimonial
                  content={testimonial.content}
                  name={testimonial.name}
                  title={testimonial.title}
                  avatar={testimonial.avatar}
                  index={index}
                />
              </Box>
            ))}
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
};

export default Testimonials;