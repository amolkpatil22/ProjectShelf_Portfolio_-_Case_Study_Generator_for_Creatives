import React, { useState } from 'react';
import {
    Box,
    Container,
    Flex,
    Heading,
    Icon,
    SimpleGrid,
    Stack,
    Text,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Select,
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Badge,
    Card,
    CardBody,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
    BarChart,
    LineChart,
    Users,
    MousePointer,
    Eye,
    TrendingUp,
    Calendar,
    Download,
    Filter,
    ChevronDown,
} from 'lucide-react';

const MotionBox = motion(Box);

// Sample data - In a real app, this would come from your backend
const sampleData = {
    overview: {
        totalVisitors: '5,234',
        pageViews: '12,845',
        avgTime: '3m 45s',
        bounceRate: '28%',
        growth: '+32%',
    },
    caseStudies: [
        {
            id: 1,
            title: 'E-Commerce Website Redesign',
            views: 1245,
            uniqueVisitors: 892,
            avgTime: '4m 12s',
            bounceRate: '22%',
            trend: 'up',
        },
        {
            id: 2,
            title: 'Mobile Banking App',
            views: 986,
            uniqueVisitors: 654,
            avgTime: '5m 30s',
            bounceRate: '18%',
            trend: 'up',
        },
        {
            id: 3,
            title: 'Brand Identity System',
            views: 756,
            uniqueVisitors: 523,
            avgTime: '3m 45s',
            bounceRate: '25%',
            trend: 'down',
        },
    ],
    traffic: {
        sources: [
            { source: 'Direct', visitors: 2345, percentage: 45 },
            { source: 'Social Media', visitors: 1567, percentage: 30 },
            { source: 'Search Engines', visitors: 876, percentage: 17 },
            { source: 'Referrals', visitors: 446, percentage: 8 },
        ],
    },
};

const AnalyticsDashboard = () => {
    const [timeRange, setTimeRange] = useState('30d');
    const bgColor = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    return (
        <Box minH="100vh" bg="gray.50" py={8}>
            <Container maxW="container.xl">
                <Stack spacing={8}>
                    {/* Header */}
                    <Flex justify="space-between" align="center">
                        <Stack>
                            <Heading size="lg">Analytics Dashboard</Heading>
                            <Text color="gray.600">Track your portfolio's performance</Text>
                        </Stack>
                        <Stack direction="row" spacing={4}>
                            <Select
                                value={timeRange}
                                onChange={(e) => setTimeRange(e.target.value)}
                                w="150px"
                                icon={<ChevronDown />}
                            >
                                <option value="7d">Last 7 days</option>
                                <option value="30d">Last 30 days</option>
                                <option value="90d">Last 90 days</option>
                                <option value="1y">Last year</option>
                            </Select>
                            <Button leftIcon={<Download />} variant="outline">
                                Export
                            </Button>
                        </Stack>
                    </Flex>

                    {/* Overview Stats */}
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
                        <Card bg={bgColor} borderWidth="1px" borderColor={borderColor}>
                            <CardBody>
                                <Stat>
                                    <StatLabel>Total Visitors</StatLabel>
                                    <StatNumber>{sampleData.overview.totalVisitors}</StatNumber>
                                    <StatHelpText>
                                        <StatArrow type="increase" />
                                        {sampleData.overview.growth}
                                    </StatHelpText>
                                </Stat>
                            </CardBody>
                        </Card>
                        <Card bg={bgColor} borderWidth="1px" borderColor={borderColor}>
                            <CardBody>
                                <Stat>
                                    <StatLabel>Page Views</StatLabel>
                                    <StatNumber>{sampleData.overview.pageViews}</StatNumber>
                                    <StatHelpText>
                                        <StatArrow type="increase" />
                                        23.36%
                                    </StatHelpText>
                                </Stat>
                            </CardBody>
                        </Card>
                        <Card bg={bgColor} borderWidth="1px" borderColor={borderColor}>
                            <CardBody>
                                <Stat>
                                    <StatLabel>Avg. Time on Site</StatLabel>
                                    <StatNumber>{sampleData.overview.avgTime}</StatNumber>
                                    <StatHelpText>
                                        <StatArrow type="decrease" />
                                        12%
                                    </StatHelpText>
                                </Stat>
                            </CardBody>
                        </Card>
                        <Card bg={bgColor} borderWidth="1px" borderColor={borderColor}>
                            <CardBody>
                                <Stat>
                                    <StatLabel>Bounce Rate</StatLabel>
                                    <StatNumber>{sampleData.overview.bounceRate}</StatNumber>
                                    <StatHelpText>
                                        <StatArrow type="decrease" />
                                        5%
                                    </StatHelpText>
                                </Stat>
                            </CardBody>
                        </Card>
                    </SimpleGrid>

                    {/* Main Content */}
                    <Tabs variant="enclosed">
                        <TabList>
                            <Tab>Case Studies</Tab>
                            <Tab>Traffic Sources</Tab>
                            <Tab>Visitor Behavior</Tab>
                        </TabList>

                        <TabPanels>
                            {/* Case Studies Tab */}
                            <TabPanel>
                                <Box bg={bgColor} rounded="lg" borderWidth="1px" borderColor={borderColor} overflow="hidden">
                                    <Table variant="simple">
                                        <Thead>
                                            <Tr>
                                                <Th>Case Study</Th>
                                                <Th isNumeric>Views</Th>
                                                <Th isNumeric>Unique Visitors</Th>
                                                <Th isNumeric>Avg. Time</Th>
                                                <Th isNumeric>Bounce Rate</Th>
                                                <Th>Trend</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {sampleData.caseStudies.map((study) => (
                                                <Tr key={study.id}>
                                                    <Td fontWeight="medium">{study.title}</Td>
                                                    <Td isNumeric>{study.views}</Td>
                                                    <Td isNumeric>{study.uniqueVisitors}</Td>
                                                    <Td isNumeric>{study.avgTime}</Td>
                                                    <Td isNumeric>{study.bounceRate}</Td>
                                                    <Td>
                                                        <Badge
                                                            colorScheme={study.trend === 'up' ? 'green' : 'red'}
                                                            variant="subtle"
                                                        >
                                                            {study.trend === 'up' ? '↑' : '↓'}
                                                        </Badge>
                                                    </Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                </Box>
                            </TabPanel>

                            {/* Traffic Sources Tab */}
                            <TabPanel>
                                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                                    <Box bg={bgColor} p={6} rounded="lg" borderWidth="1px" borderColor={borderColor}>
                                        <Heading size="md" mb={4}>Traffic Sources</Heading>
                                        <Stack spacing={4}>
                                            {sampleData.traffic.sources.map((source) => (
                                                <Flex key={source.source} justify="space-between" align="center">
                                                    <Text>{source.source}</Text>
                                                    <Flex align="center" gap={4}>
                                                        <Text fontWeight="medium">{source.visitors}</Text>
                                                        <Text color="gray.500">{source.percentage}%</Text>
                                                    </Flex>
                                                </Flex>
                                            ))}
                                        </Stack>
                                    </Box>
                                    <Box bg={bgColor} p={6} rounded="lg" borderWidth="1px" borderColor={borderColor}>
                                        <Heading size="md" mb={4}>Traffic Growth</Heading>
                                        <Box h="300px" display="flex" alignItems="center" justifyContent="center">
                                            <Text color="gray.500">Traffic growth chart will be displayed here</Text>
                                        </Box>
                                    </Box>
                                </SimpleGrid>
                            </TabPanel>

                            {/* Visitor Behavior Tab */}
                            <TabPanel>
                                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                                    <Box bg={bgColor} p={6} rounded="lg" borderWidth="1px" borderColor={borderColor}>
                                        <Heading size="md" mb={4}>Page Views Over Time</Heading>
                                        <Box h="300px" display="flex" alignItems="center" justifyContent="center">
                                            <Text color="gray.500">Page views chart will be displayed here</Text>
                                        </Box>
                                    </Box>
                                    <Box bg={bgColor} p={6} rounded="lg" borderWidth="1px" borderColor={borderColor}>
                                        <Heading size="md" mb={4}>User Flow</Heading>
                                        <Box h="300px" display="flex" alignItems="center" justifyContent="center">
                                            <Text color="gray.500">User flow diagram will be displayed here</Text>
                                        </Box>
                                    </Box>
                                </SimpleGrid>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Stack>
            </Container>
        </Box>
    );
};

export default AnalyticsDashboard; 