import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';

const Landing: React.FC = () => {
    return (
        <Box textAlign="center" py={10} px={6}>
            <Heading as="h1" size="2xl" mb={4}>
                Welcome to ProjectShelf
            </Heading>
            <Text fontSize="lg" color="gray.600" mb={6}>
                Your ultimate case study generator for creatives.
            </Text>
            <Button colorScheme="teal" size="lg">
                Get Started
            </Button>
        </Box>
    );
};

export default Landing;