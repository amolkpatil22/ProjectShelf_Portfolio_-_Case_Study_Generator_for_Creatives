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
  useBreakpointValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Hero = () => {
  const headingSize = useBreakpointValue({ base: '2xl', md: '3xl', lg: '4xl' });
  
  return (
    <Box 
      position="relative" 
      overflow="hidden"
      bg="white"
      pt={{ base: 6, md: 8, lg: 20 }}
      pb={{ base: 16, md: 20, lg: 28 }}
    >
      {/* Background Elements */}
      <MotionBox
        position="absolute"
        top="-5%"
        right="-10%"
        width="500px"
        height="500px"
        borderRadius="full"
        bgGradient="linear(to-r, primary.100, primary.50)"
        opacity="0.4"
        zIndex="0"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1, rotate: 5 }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
      />
      <MotionBox
        position="absolute"
        bottom="-10%"
        left="-5%"
        width="400px"
        height="400px"
        borderRadius="full"
        bgGradient="linear(to-r, accent.100, accent.50)"
        opacity="0.3"
        zIndex="0"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1, rotate: -5 }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
      />
      
      <Container maxW="container.xl" position="relative" zIndex="1">
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          align="center"
          spacing={{ base: 8, md: 10 }}
          py={{ base: 8, md: 12 }}
          textAlign={{ base: 'center', lg: 'left' }}
        >
          <Stack flex={1} spacing={{ base: 5, md: 8 }}>
            <Box>
              <Text
                as={motion.p}
                color="accent.400"
                fontWeight="semibold"
                fontSize={{ base: 'md', md: 'lg' }}
                textTransform="uppercase"
                mb={3}
                letterSpacing="wider"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Portfolio Generator for Creatives
              </Text>
              <Heading
                as={motion.h1}
                size={headingSize}
                fontWeight="bold"
                color="gray.900"
                lineHeight="1.1"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Showcase Your Creative Work{' '}
                <Text as="span" bgGradient="linear(to-r, primary.400, accent.400)" bgClip="text">
                  Beautifully
                </Text>
              </Heading>
            </Box>
            <Text
              as={motion.p}
              fontSize={{ base: 'lg', md: 'xl' }}
              color="gray.600"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Build stunning portfolios and detailed case studies that highlight your design process, development work, or writing projects. Stand out with custom themes and analytics.
            </Text>
            <Stack
              as={motion.div}
              direction={{ base: 'column', sm: 'row' }}
              spacing={4}
              justify={{ base: 'center', lg: 'flex-start' }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button 
                size="lg" 
                colorScheme="primary"
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
            <Flex 
              align="center" 
              justify={{ base: 'center', lg: 'flex-start' }}
              mt={4}
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Text fontSize="sm" fontWeight="medium" color="gray.500">
                Trusted by designers, developers and writers at companies like
              </Text>
            </Flex>
            <Flex 
              wrap="wrap" 
              justify={{ base: 'center', lg: 'flex-start' }} 
              gap={6}
              opacity={0.7}
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {['Adobe', 'Figma', 'Webflow', 'AWS', 'Dribbble'].map((company) => (
                <Text key={company} fontWeight="bold" color="gray.500" fontSize="lg">
                  {company}
                </Text>
              ))}
            </Flex>
          </Stack>
          <Flex
            flex={1}
            justify="center"
            align="center"
            position="relative"
            w="full"
            as={motion.div}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Box
              position="relative"
              width="full"
              rounded="2xl"
              boxShadow="2xl"
              overflow="hidden"
            >
              <Image
                alt="Portfolio Dashboard"
                fit="cover"
                align="center"
                w="100%"
                h="100%"
                src="https://images.pexels.com/photos/5926386/pexels-photo-5926386.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                rounded="xl"
              />
            </Box>
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
};

export default Hero;