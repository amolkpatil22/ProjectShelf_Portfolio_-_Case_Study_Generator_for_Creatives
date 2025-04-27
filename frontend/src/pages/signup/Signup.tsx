import React, { useState, useEffect } from 'react';
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
    HStack,
    Flex,
    Alert,
    AlertIcon,
    FormErrorMessage,
} from '@chakra-ui/react';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { useSignupForm } from './hooks/useSignupForm';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState<boolean | null>(null);
    const {
        formData,
        isLoading,
        error,
        handleChange,
        handleSubmit,
    } = useSignupForm();

    // Check if passwords match whenever either password field changes
    useEffect(() => {
        if (formData.password && formData.confirmPassword) {
            setPasswordsMatch(formData.password === formData.confirmPassword);
        } else {
            setPasswordsMatch(null);
        }
    }, [formData.password, formData.confirmPassword]);

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
                                Create Account
                            </Heading>
                            <Text color="gray.600">
                                Join us to start building your portfolio
                            </Text>
                        </VStack>

                        {error && (
                            <Alert status="error" borderRadius="md">
                                <AlertIcon />
                                {error}
                            </Alert>
                        )}

                        <Box as="form" onSubmit={handleSubmit} width="full">
                            <VStack spacing={6}>
                                <HStack spacing={4} width="full">
                                    <FormControl isRequired>
                                        <FormLabel>First Name</FormLabel>
                                        <Input
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            placeholder="Enter your first name"
                                            size="lg"
                                            borderColor="gray.200"
                                            _hover={{ borderColor: 'primary.400' }}
                                            _focus={{ borderColor: 'primary.400', boxShadow: 'none' }}
                                        />
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>Last Name</FormLabel>
                                        <Input
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            placeholder="Enter your last name"
                                            size="lg"
                                            borderColor="gray.200"
                                            _hover={{ borderColor: 'primary.400' }}
                                            _focus={{ borderColor: 'primary.400', boxShadow: 'none' }}
                                        />
                                    </FormControl>
                                </HStack>

                                <FormControl isRequired>
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        size="lg"
                                        borderColor="gray.200"
                                        _hover={{ borderColor: 'primary.400' }}
                                        _focus={{ borderColor: 'primary.400', boxShadow: 'none' }}
                                    />
                                </FormControl>

                                <FormControl isRequired isInvalid={passwordsMatch === false}>
                                    <FormLabel>Password</FormLabel>
                                    <InputGroup size="lg">
                                        <Input
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Create a password"
                                            borderColor={passwordsMatch === false ? "red.300" : "gray.200"}
                                            _hover={{ borderColor: passwordsMatch === false ? "red.400" : 'primary.400' }}
                                            _focus={{ borderColor: passwordsMatch === false ? "red.400" : 'primary.400', boxShadow: 'none' }}
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
                                    {formData.password && (
                                        <Text fontSize="sm" color="gray.500" mt={1}>
                                            Password must be at least 8 characters long
                                        </Text>
                                    )}
                                </FormControl>

                                <FormControl isRequired isInvalid={passwordsMatch === false}>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <InputGroup size="lg">
                                        <Input
                                            name="confirmPassword"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="Confirm your password"
                                            borderColor={passwordsMatch === false ? "red.300" : "gray.200"}
                                            _hover={{ borderColor: passwordsMatch === false ? "red.400" : 'primary.400' }}
                                            _focus={{ borderColor: passwordsMatch === false ? "red.400" : 'primary.400', boxShadow: 'none' }}
                                        />
                                        <InputRightElement>
                                            <IconButton
                                                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                                                icon={showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                variant="ghost"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            />
                                        </InputRightElement>
                                    </InputGroup>
                                    {formData.confirmPassword && (
                                        <FormErrorMessage>
                                            {passwordsMatch === false ? "Passwords do not match" : ""}
                                        </FormErrorMessage>
                                    )}
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
                                    isDisabled={passwordsMatch === false}
                                >
                                    Create Account
                                </Button>

                                <Text color="gray.600" textAlign="center">
                                    Already have an account?{' '}
                                    <Link as={RouterLink} to="/login" color="primary.500">
                                        Sign in
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

export default Signup;