import React, { useState } from 'react';
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
  Icon,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const MotionBox = motion(Box);

const themes = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean, simple, and elegant design',
    image: 'https://images.pexels.com/photos/5939401/pexels-photo-5939401.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    color: '#3358FF',
  },
  {
    id: 'bold',
    name: 'Bold',
    description: 'Strong visuals with high contrast',
    image: 'https://images.pexels.com/photos/5483071/pexels-photo-5483071.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    color: '#9061F9',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Artistic layout with unique elements',
    image: 'https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    color: '#10B981',
  },
];

const ThemePreview = () => {
  const [selectedTheme, setSelectedTheme] = useState('minimal');

  return (
    <Box id="themes" py={{ base: 16, md: 24 }} bg="gray.50">
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
                color="secondary.500"
                fontWeight="semibold"
                fontSize="md"
                textTransform="uppercase"
                mb={2}
                letterSpacing="wider"
              >
                Theme Engine
              </Text>
              <Heading
                mb={4}
                fontSize={{ base: '3xl', md: '4xl' }}
                fontWeight="bold"
                lineHeight="shorter"
              >
                Choose a theme that{' '}
                <Text as="span" bgGradient="linear(to-r, secondary.500, accent.400)" bgClip="text">
                  reflects your style
                </Text>
              </Heading>
              <Text color="gray.600" fontSize={{ base: 'md', md: 'lg' }} maxW="2xl" mx="auto">
                Select from our professionally designed themes or customize your own to match your personal brand. Preview in real-time before publishing.
              </Text>
            </MotionBox>
          </Stack>

          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10} alignItems="center">
            <Stack spacing={8}>
              <MotionBox
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                  {themes.map((theme) => (
                    <Box
                      key={theme.id}
                      p={5}
                      borderWidth="2px"
                      borderRadius="lg"
                      borderColor={selectedTheme === theme.id ? theme.color : 'gray.200'}
                      bg={selectedTheme === theme.id ? `${theme.id === 'minimal' ? 'primary.50' : theme.id === 'bold' ? 'accent.50' : 'secondary.50'}` : 'white'}
                      cursor="pointer"
                      onClick={() => setSelectedTheme(theme.id)}
                      position="relative"
                      transition="all 0.2s"
                      _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: 'md',
                      }}
                    >
                      {selectedTheme === theme.id && (
                        <Flex
                          position="absolute"
                          top={2}
                          right={2}
                          w={6}
                          h={6}
                          bg={theme.color}
                          borderRadius="full"
                          justify="center"
                          align="center"
                          color="white"
                        >
                          <Icon as={Check} w={4} h={4} />
                        </Flex>
                      )}
                      <Heading size="md" mb={2} color={selectedTheme === theme.id ? theme.color : 'gray.700'}>
                        {theme.name}
                      </Heading>
                      <Text fontSize="sm" color="gray.600">
                        {theme.description}
                      </Text>
                    </Box>
                  ))}
                </SimpleGrid>
              </MotionBox>

              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Heading size="md" mb={4}>
                  Theme Features
                </Heading>
                <Stack spacing={3}>
                  {[
                    'Fully responsive layouts',
                    'Custom color options',
                    'Typography settings',
                    'Layout configuration',
                    'Multiple page templates',
                    'Animation settings'
                  ].map((feature, index) => (
                    <HStack key={index}>
                      <Flex
                        w={5}
                        h={5}
                        bg={selectedTheme === 'minimal' ? 'primary.400' : selectedTheme === 'bold' ? 'accent.400' : 'secondary.500'}
                        borderRadius="full"
                        justify="center"
                        align="center"
                        color="white"
                        fontSize="xs"
                      >
                        <Icon as={Check} w={3} h={3} />
                      </Flex>
                      <Text>{feature}</Text>
                    </HStack>
                  ))}
                </Stack>
              </MotionBox>

              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Button 
                  size="lg"
                  colorScheme={selectedTheme === 'minimal' ? 'primary' : selectedTheme === 'bold' ? 'accent' : 'secondary'}
                  bg={selectedTheme === 'minimal' ? 'primary.400' : selectedTheme === 'bold' ? 'accent.400' : 'secondary.500'}
                >
                  Try This Theme
                </Button>
              </MotionBox>
            </Stack>

            <MotionBox
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Box
                borderRadius="xl"
                overflow="hidden"
                boxShadow="2xl"
                position="relative"
              >
                <Image
                  src={themes.find(t => t.id === selectedTheme)?.image}
                  alt={`${selectedTheme} theme preview`}
                  w="full"
                  h="auto"
                  objectFit="cover"
                  transition="all 0.5s ease"
                />
              </Box>
            </MotionBox>
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
};

export default ThemePreview;