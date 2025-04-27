import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import { Settings2, Save, Eye, Menu } from 'lucide-react';
import { usePortfolioBuilder } from './hooks/usePortfolioBuilder';
import { CaseStudyEditor } from './components/CaseStudyEditor';
import { CaseStudyList } from './components/CaseStudyList';
import { PortfolioSettings } from './components/PortfolioSettings';

const PortfolioBuilder = () => {
    const {
        themeSettings,
        caseStudies,
        isEditing,
        editingCaseStudy,
        updateTheme,
        handleEditCaseStudy,
        handleUpdateCaseStudy,
        handleCancelEdit,
        handleSave,
        handlePreview,
    } = usePortfolioBuilder();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isPreviewOpen, onOpen: onPreviewOpen, onClose: onPreviewClose } = useModalDisclosure();
    const toast = useToast();

    return (
        <Box minH="100vh" bg="gray.50">
            <Container maxW="container.xl" py={8}>
                <Grid templateColumns={{ base: '1fr', md: '250px 1fr' }} gap={8}>
                    {/* Sidebar - Desktop */}
                    <Box
                        display={{ base: 'none', md: 'block' }}
                    >
                        <PortfolioSettings
                            themeSettings={themeSettings}
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
                                    {/* About section content */}
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
                                            caseStudies={caseStudies}
                                            onEdit={handleEditCaseStudy}
                                            onDelete={() => { }}
                                            onAdd={() => { }}
                                        />
                                    )}
                                </TabPanel>

                                <TabPanel>
                                    {/* Contact section content */}
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
                            themeSettings={themeSettings}
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
                                src={`/preview?theme=${themeSettings.layout}`}
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