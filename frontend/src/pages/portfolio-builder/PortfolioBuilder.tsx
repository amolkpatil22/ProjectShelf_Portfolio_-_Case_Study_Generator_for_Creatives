import React from 'react';
import {
    Box,
    Container,
    Grid,
    Flex,
    Button,
    useToast,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    useDisclosure,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure as useModalDisclosure,
    Portal,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    Spinner,
    Text,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react';
import { Settings2, Save, Eye, Menu } from 'lucide-react';
import { usePortfolioBuilder } from './hooks/usePortfolioBuilder';
import { CaseStudyEditor } from './components/CaseStudyEditor';
import { CaseStudyList } from './components/CaseStudyList';
import { PortfolioSettings } from './components/PortfolioSettings';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Portfolio } from './types/portfolioBuilderTypes';

const PortfolioBuilder = () => {
    const {
        portfolio,
        isEditing,
        editingCaseStudy,
        isLoading,
        error,
        updatePortfolio,
        updateTheme,
        handleEditCaseStudy,
        handleUpdateCaseStudy,
        handleCancelEdit,
        handleSave,
        handlePreview,
        handleAddCaseStudy,
    } = usePortfolioBuilder();
    console.log(portfolio);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isPreviewOpen, onOpen: onPreviewOpen, onClose: onPreviewClose } = useModalDisclosure();
    const toast = useToast();

    // Show loading indicator while data is being fetched
    if (isLoading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                flexDirection="column"
            >
                <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
                <Text mt={4} fontSize="lg" fontWeight="medium">
                    Loading your portfolio...
                </Text>
            </Box>
        );
    }

    // Show error message if there's an error
    if (error) {
        return (
            <Container maxW="container.md" py={10}>
                <Alert status="error" borderRadius="md">
                    <AlertIcon />
                    <Box>
                        <AlertTitle>Error loading portfolio</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Box>
                </Alert>
            </Container>
        );
    }

    return (
        <Box minH="100vh" bg="gray.50">
            <Container maxW="container.xl" py={8}>
                <Grid templateColumns={{ base: '1fr', md: '250px 1fr' }} gap={8}>
                    {/* Sidebar - Desktop */}
                    <Box
                        display={{ base: 'none', md: 'block' }}
                    >
                        <PortfolioSettings
                            themeSettings={portfolio.themeSettings}
                            onUpdateTheme={updateTheme}
                        />
                    </Box>

                    {/* Main Content */}
                    <Box bg="white" p={6} borderRadius="lg" borderWidth="1px">
                        <Flex justify="flex-end" mb={6}>
                            <Flex gap={3}>
                                <Button
                                    leftIcon={<Eye size={18} />}
                                    variant="outline"
                                    colorScheme="blue"
                                    size="md"
                                    onClick={handlePreview}
                                >
                                    Preview
                                </Button>
                                <Button
                                    leftIcon={<Save size={18} />}
                                    colorScheme="primary"
                                    size="md"
                                    onClick={handleSave}
                                >
                                    Save Changes
                                </Button>
                            </Flex>
                        </Flex>

                        <Tabs>
                            <TabList>
                                <Tab>About</Tab>
                                <Tab>Case Studies</Tab>
                                <Tab>Contact</Tab>
                            </TabList>

                            <TabPanels>
                                <TabPanel>
                                    <AboutSection
                                        name={portfolio.name || ''}
                                        title={portfolio.title || ''}
                                        bio={portfolio.bio || ''}
                                        profileImage={portfolio.profileImage || ''}
                                        onUpdate={(field, value) => updatePortfolio(field as keyof Portfolio, value)}
                                    />
                                </TabPanel>

                                <TabPanel>
                                    {isEditing && editingCaseStudy ? (
                                        <CaseStudyEditor
                                            editingCaseStudy={editingCaseStudy}
                                            setEditingCaseStudy={handleEditCaseStudy}
                                            onCancel={handleCancelEdit}
                                            onSave={handleUpdateCaseStudy}
                                        />
                                    ) : (
                                        <CaseStudyList
                                            caseStudies={portfolio.caseStudies}
                                            onEdit={handleEditCaseStudy}
                                            onDelete={() => { }}
                                            onAdd={handleAddCaseStudy}
                                        />
                                    )}
                                </TabPanel>

                                <TabPanel>
                                    <ContactSection
                                        email={portfolio.email || ''}
                                        linkedin={portfolio.linkedin || ''}
                                        github={portfolio.github || ''}
                                        website={portfolio.website || ''}
                                        twitter={portfolio.twitter || ''}
                                        onUpdate={(field, value) => updatePortfolio(field as keyof Portfolio, value)}
                                    />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Box>
                </Grid>
            </Container>

            {/* Mobile Sidebar Drawer */}
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Theme Settings</DrawerHeader>
                    <DrawerBody>
                        <PortfolioSettings
                            themeSettings={portfolio.themeSettings}
                            onUpdateTheme={updateTheme}
                        />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

            {/* Live Preview Modal */}
            <Portal>
                <Modal
                    isOpen={isPreviewOpen}
                    onClose={onPreviewClose}
                    size="xl"
                    motionPreset="slideInBottom"
                    isCentered
                >
                    <ModalOverlay bg="blackAlpha.700" />
                    <ModalContent
                        maxW="80vw"
                        maxH="80vh"
                        m="auto"
                        borderRadius="lg"
                        overflow="hidden"
                    >
                        <ModalCloseButton color="white" bg="blackAlpha.700" borderRadius="full" />
                        <ModalBody p={0}>
                            <Box
                                as="iframe"
                                src={`/preview?theme=${portfolio.themeSettings.layout}`}
                                width="100%"
                                height="80vh"
                                border="none"
                                title="Portfolio Preview"
                                style={{
                                    transform: 'scale(0.7)',
                                    transformOrigin: 'top left',
                                    width: '143%',
                                    height: '143%',
                                }}
                            />
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Portal>
        </Box>
    );
};

export default PortfolioBuilder;