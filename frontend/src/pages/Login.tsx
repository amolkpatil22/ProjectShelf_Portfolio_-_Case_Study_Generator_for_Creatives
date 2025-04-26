import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    Input,
    VStack,
    Text,
    Link,
    useToast,
    InputGroup,
    InputRightElement,
    IconButton,
    Flex,
} from '@chakra-ui/react';
import { Eye, EyeOff } from 'lucide-react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // TODO: Implement actual login logic here
            // For now, just simulate a successful login
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast({
                title: 'Login successful',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            navigate('/builder');
        } catch (error) {
            toast({
                title: 'Login failed',
                description: 'Please check your credentials and try again.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box minH="100vh" bg="gray.50" py={20}>
            <Container maxW="container.md">
                <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    bg="white"
                    p={8}
                    borderRadius="xl"
                    boxShadow="lg"
                >
                    <VStack spacing={8} width="full">
                        <VStack spacing={3} textAlign="center">
                            <Heading
                                size="xl"
                                bgGradient="linear(to-r, primary.400, accent.400)"
                                bgClip="text"
                            >
                                Welcome Back
                            </Heading>
                            <Text color="gray.600">
                                Sign in to continue building your portfolio
                            </Text>
                        </VStack>

                        <Box as="form" onSubmit={handleSubmit} width="full">
                            <VStack spacing={6}>
                                <FormControl isRequired>
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        size="lg"
                                        borderColor="gray.200"
                                        _hover={{ borderColor: 'primary.400' }}
                                        _focus={{ borderColor: 'primary.400', boxShadow: 'none' }}
                                    />
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>Password</FormLabel>
                                    <InputGroup size="lg">
                                        <Input
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter your password"
                                            borderColor="gray.200"
                                            _hover={{ borderColor: 'primary.400' }}
                                            _focus={{ borderColor: 'primary.400', boxShadow: 'none' }}
                                        />
                                        <InputRightElement>
                                            <IconButton
                                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                                icon={showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                variant="ghost"
                                                onClick={() => setShowPassword(!showPassword)}
                                            />
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>

                                <Button
                                    type="submit"
                                    colorScheme="primary"
                                    size="lg"
                                    width="full"
                                    isLoading={isLoading}
                                    bgGradient="linear(to-r, primary.400, accent.400)"
                                    _hover={{
                                        bgGradient: "linear(to-r, primary.500, accent.500)",
                                    }}
                                >
                                    Sign In
                                </Button>

                                <Text color="gray.600" textAlign="center">
                                    Don't have an account?{' '}
                                    <Link as={RouterLink} to="/signup" color="primary.500">
                                        Sign up
                                    </Link>
                                </Text>
                            </VStack>
                        </Box>
                    </VStack>
                </Flex>
            </Container>
        </Box>
    );
};

export default Login; 