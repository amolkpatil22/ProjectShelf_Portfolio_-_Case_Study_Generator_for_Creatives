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
    InputGroup,
    InputRightElement,
    IconButton,
    Flex,
    Alert,
    AlertIcon,
} from '@chakra-ui/react';
import { Eye, EyeOff } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { useLogin } from './hooks/useLogin';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {
        email,
        setEmail,
        password,
        setPassword,
        isLoading,
        error,
        handleLogin,
    } = useLogin();

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

                        {error && (
                            <Alert status="error" borderRadius="md">
                                <AlertIcon />
                                {error}
                            </Alert>
                        )}

                        <Box as="form" onSubmit={handleLogin} width="full">
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