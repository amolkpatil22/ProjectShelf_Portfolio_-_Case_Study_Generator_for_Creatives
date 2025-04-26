import React from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const MotionBox = motion(Box);

const CallToAction = () => {
  return (
    <Box id="pricing" bg="gray.50">
      <Container maxW="container.xl" py={{ base: 16, md: 20 }}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            bg="white"
            boxShadow="xl"
            rounded="2xl"
            overflow="hidden"
            position="relative"
          >
            {/* Background decorative elements */}
            <Box
              position="absolute"
              top="0"
              right="0"
              bottom="0"
              width="40%"
              bg="primary.50"
              clipPath="polygon(100% 0, 0 0, 100% 100%)"
              opacity="0.8"
              display={{ base: 'none', lg: 'block' }}
            />
            <Box
              position="absolute"
              bottom="0"
              left="0"
              width="30%"
              height="30%"
              bg="accent.50"
              clipPath="polygon(0 100%, 100% 100%, 0 0)"
              opacity="0.8"
              display={{ base: 'none', lg: 'block' }}
            />

            <Stack
              direction="column"
              spacing={6}
              w={{ base: 'full', lg: '60%' }}
              p={{ base: 8, md: 12 }}
              position="relative"
              zIndex="1"
            >
              <Heading
                fontSize={{ base: '3xl', md: '4xl' }}
                lineHeight={1.1}
                fontWeight="bold"
              >
                Ready to showcase your{' '}
                <Text as="span" bgGradient="linear(to-r, primary.400, accent.400)" bgClip="text">
                  creative work?
                </Text>
              </Heading>
              <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.600" maxW="lg">
                Join thousands of designers, developers, and writers who use ProjectShelf to build impressive portfolios that win clients and land dream jobs.
              </Text>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                spacing={4}
                mt={2}
              >
                <Button
                  size="lg"
                  colorScheme="primary"
                  rightIcon={<Icon as={ArrowRight} />}
                  px={8}
                >
                  Get Started Free
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  px={8}
                >
                  View Examples
                </Button>
              </Stack>
              <Text fontSize="sm" color="gray.500">
                No credit card required. Free plan includes 3 case studies and 1 custom domain.
              </Text>
            </Stack>

            <Flex
              w={{ base: 'full', lg: '40%' }}
              bg="primary.50"
              justify="center"
              align="center"
              p={{ base: 8, md: 12 }}
              position="relative"
              zIndex="1"
            >
              <Stack spacing={6} maxW="sm" textAlign="center">
                <Box
                  w={20}
                  h={20}
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                  rounded="full"
                  bg="primary.400"
                  color="white"
                  fontSize="4xl"
                  fontWeight="bold"
                  mx="auto"
                >
                  <Text>1</Text>
                </Box>
                <Text fontWeight="bold" fontSize="xl">
                  Sign up for free
                </Text>
                <Box
                  w={20}
                  h={20}
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                  rounded="full"
                  bg="secondary.500"
                  color="white"
                  fontSize="4xl"
                  fontWeight="bold"
                  mx="auto"
                >
                  <Text>2</Text>
                </Box>
                <Text fontWeight="bold" fontSize="xl">
                  Create your first case study
                </Text>
                <Box
                  w={20}
                  h={20}
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                  rounded="full"
                  bg="accent.400"
                  color="white"
                  fontSize="4xl"
                  fontWeight="bold"
                  mx="auto"
                >
                  <Text>3</Text>
                </Box>
                <Text fontWeight="bold" fontSize="xl">
                  Share your portfolio
                </Text>
              </Stack>
            </Flex>
          </Flex>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default CallToAction;