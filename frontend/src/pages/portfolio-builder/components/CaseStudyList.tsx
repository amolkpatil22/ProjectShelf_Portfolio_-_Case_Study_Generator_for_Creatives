import React from 'react';
import {
    VStack,
    SimpleGrid,
    Card,
    CardBody,
    Stack,
    Heading,
    Text,
    Badge,
    Flex,
    IconButton,
    Image,
} from '@chakra-ui/react';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { CaseStudy } from '../types/portfolioBuilderTypes';

interface CaseStudyListProps {
    caseStudies: CaseStudy[];
    onEdit: (caseStudy: CaseStudy) => void;
    onDelete: (caseStudy: CaseStudy) => void;
    onAdd: () => void;
}

export const CaseStudyList: React.FC<CaseStudyListProps> = ({
    caseStudies,
    onEdit,
    onDelete,
    onAdd,
}) => {
    return (
        <VStack spacing={6} align="stretch">
            <Flex justify="space-between" align="center" mb={4}>
                <Heading size="md">Case Studies</Heading>
                <IconButton
                    aria-label="Add case study"
                    icon={<Plus />}
                    colorScheme="primary"
                    size="sm"
                    onClick={onAdd}
                />
            </Flex>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                {caseStudies.map((study) => (
                    <Card key={study.id} overflow="hidden" variant="outline">
                        <Image
                            src={study.image}
                            alt={study.title}
                            height="200px"
                            objectFit="cover"
                        />
                        <CardBody>
                            <Stack spacing={3}>
                                <Flex justify="space-between" align="center">
                                    <Heading size="md">{study.title}</Heading>
                                    <Badge colorScheme="purple">{study.category}</Badge>
                                </Flex>
                                <Text noOfLines={2}>{study.description}</Text>
                                <Flex gap={2} wrap="wrap">
                                    {study.tools.map((tool) => (
                                        <Badge key={tool} colorScheme="gray">
                                            {tool}
                                        </Badge>
                                    ))}
                                </Flex>
                                <Flex gap={2} mt={2}>
                                    <IconButton
                                        aria-label="Edit case study"
                                        icon={<Edit2 size={18} />}
                                        size="sm"
                                        onClick={() => onEdit(study)}
                                    />
                                    <IconButton
                                        aria-label="Delete case study"
                                        icon={<Trash2 size={18} />}
                                        size="sm"
                                        colorScheme="red"
                                        onClick={() => onDelete(study)}
                                    />
                                </Flex>
                            </Stack>
                        </CardBody>
                    </Card>
                ))}
            </SimpleGrid>
        </VStack>
    );
}; 