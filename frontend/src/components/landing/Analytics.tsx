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
    useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { BarChart, LineChart, Users, MousePointer, Eye, TrendingUp } from 'lucide-react';

const MotionBox = motion(Box);

interface AnalyticsCardProps {
    title: string;
    description: string;
    icon: React.ReactElement;
    metrics: {
        label: string;
        value: string;
    }[];
}

const AnalyticsCard = ({ title, description, icon, metrics }: AnalyticsCardProps) => {
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
                <Text color="gray.600" mb={4}>
                    {description}
                </Text>
                <SimpleGrid columns={2} spacing={4} w="full">
                    {metrics.map((metric, index) => (
                        <Box key={index}>
                            <Text fontSize="2xl" fontWeight="bold" color="primary.400">
                                {metric.value}
                            </Text>
                            <Text fontSize="sm" color="gray.500">
                                {metric.label}
                            </Text>
                        </Box>
                    ))}
                </SimpleGrid>
            </Stack>
        </MotionBox>
    );
};

const Analytics = () => {
    return (
        <Box id="analytics" py={{ base: 16, md: 24 }} bg="gray.50">
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
                                Analytics Dashboard
                            </Text>
                            <Heading
                                mb={4}
                                fontSize={{ base: '3xl', md: '4xl' }}
                                fontWeight="bold"
                                lineHeight="shorter"
                            >
                                Track your portfolio's{' '}
                                <Text as="span" bgGradient="linear(to-r, primary.400, accent.400)" bgClip="text">
                                    performance
                                </Text>
                            </Heading>
                            <Text color="gray.600" fontSize={{ base: 'md', md: 'lg' }} maxW="2xl" mx="auto">
                                Get detailed insights into your portfolio's traffic, engagement, and visitor behavior to optimize your showcase.
                            </Text>
                        </MotionBox>
                    </Stack>

                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                        <AnalyticsCard
                            title="Traffic Analytics"
                            description="Monitor your portfolio's visitor traffic and growth over time"
                            icon={<Icon as={LineChart} boxSize={6} />}
                            metrics={[
                                { label: "Monthly Visitors", value: "2.5K" },
                                { label: "Growth", value: "+32%" }
                            ]}
                        />
                        <AnalyticsCard
                            title="Engagement Metrics"
                            description="Track how visitors interact with your case studies"
                            icon={<Icon as={MousePointer} boxSize={6} />}
                            metrics={[
                                { label: "Avg. Time", value: "4m 32s" },
                                { label: "Bounce Rate", value: "28%" }
                            ]}
                        />
                        <AnalyticsCard
                            title="Case Study Performance"
                            description="See which projects attract the most attention"
                            icon={<Icon as={BarChart} boxSize={6} />}
                            metrics={[
                                { label: "Top Project", value: "1.2K" },
                                { label: "Views", value: "views" }
                            ]}
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
                            p={6}
                        >
                            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
                                <Box textAlign="center">
                                    <Icon as={Users} boxSize={8} color="primary.400" mb={4} />
                                    <Text fontSize="3xl" fontWeight="bold" color="primary.400">5.2K</Text>
                                    <Text color="gray.600">Total Visitors</Text>
                                </Box>
                                <Box textAlign="center">
                                    <Icon as={Eye} boxSize={8} color="accent.400" mb={4} />
                                    <Text fontSize="3xl" fontWeight="bold" color="accent.400">12.8K</Text>
                                    <Text color="gray.600">Page Views</Text>
                                </Box>
                                <Box textAlign="center">
                                    <Icon as={MousePointer} boxSize={8} color="secondary.500" mb={4} />
                                    <Text fontSize="3xl" fontWeight="bold" color="secondary.500">3m 45s</Text>
                                    <Text color="gray.600">Avg. Time</Text>
                                </Box>
                                <Box textAlign="center">
                                    <Icon as={TrendingUp} boxSize={8} color="green.400" mb={4} />
                                    <Text fontSize="3xl" fontWeight="bold" color="green.400">42%</Text>
                                    <Text color="gray.600">Engagement Rate</Text>
                                </Box>
                            </SimpleGrid>
                        </Box>
                    </MotionBox>
                </Stack>
            </Container>
        </Box>
    );
};

export default Analytics; 