import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  VStack,
  Heading,
  Text,
  Button,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  FormControl,
  FormLabel,
  Select,
  Textarea,
  Image,
  SimpleGrid,
  Card,
  CardBody,
  Badge,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure as useModalDisclosure,
  Portal,
  Tooltip,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { Settings2, Save, Eye, Menu, Plus, Edit2, Trash2, ChevronLeft } from 'lucide-react';

interface ThemeSettings {
  primaryColor: string;
  fontFamily: string;
  layout: string;
}

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tools: string[];
  challenge: string;
  solution: string;
  outcome: string;
  images: string[];
  videoLinks: string[];
  timeline: Array<{
    date: string;
    title: string;
    description: string;
  }>;
}

const defaultCaseStudies: CaseStudy[] = [
  {
    id: '1',
    title: 'E-Commerce Website Redesign',
    description: 'Complete redesign of an online retail platform',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
    category: 'UX Design',
    tools: ['Figma', 'React', 'Node.js'],
    challenge: 'The client needed to improve their conversion rate and user engagement.',
    solution: 'Implemented a new user-centered design with improved navigation and checkout flow.',
    outcome: 'Increased conversions by 47% and reduced cart abandonment by 30%.',
    images: ['https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg'],
    videoLinks: [],
    timeline: [
      {
        date: '2023-01-15',
        title: 'Project Kickoff',
        description: 'Initial meeting with client to discuss requirements'
      },
      {
        date: '2023-02-01',
        title: 'Research Phase',
        description: 'User research and competitor analysis completed'
      },
      {
        date: '2023-03-15',
        title: 'Design Phase',
        description: 'Wireframes and mockups approved'
      },
      {
        date: '2023-04-30',
        title: 'Development',
        description: 'Implementation of new design and features'
      },
      {
        date: '2023-05-15',
        title: 'Launch',
        description: 'Website successfully launched with new design'
      }
    ]
  },
  {
    id: '2',
    title: 'Mobile Banking App',
    description: 'Secure and intuitive mobile banking solution',
    image: 'https://images.pexels.com/photos/6804065/pexels-photo-6804065.jpeg',
    category: 'Development',
    tools: ['React Native', 'TypeScript', 'Firebase'],
    challenge: 'Create a secure yet user-friendly mobile banking experience.',
    solution: 'Built a React Native app with biometric authentication and real-time transactions.',
    outcome: 'App store rating of 4.8/5 with 100,000+ downloads.',
    images: [],
    videoLinks: [],
    timeline: []
  },
  {
    id: '3',
    title: 'Brand Identity System',
    description: 'Comprehensive branding for a tech startup',
    image: 'https://images.pexels.com/photos/6444/pencil-typography-black-design.jpg',
    category: 'Branding',
    tools: ['Illustrator', 'Photoshop', 'InDesign'],
    challenge: 'Develop a unique brand identity that stands out in the tech space.',
    solution: 'Created a modern, versatile brand system with distinctive visual elements.',
    outcome: 'Successfully launched brand with 95% positive feedback from stakeholders.',
    images: [],
    videoLinks: [],
    timeline: []
  }
];

const PortfolioBuilder = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isPreviewOpen, onOpen: onPreviewOpen, onClose: onPreviewClose } = useModalDisclosure();
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>({
    primaryColor: '#3358FF',
    fontFamily: 'Inter',
    layout: 'minimal',
  });
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(defaultCaseStudies);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCaseStudy, setEditingCaseStudy] = useState<CaseStudy | null>(null);
  const previewTimeoutRef = useRef<number | null>(null);
  const previewButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handlePreview = () => {
    window.open(`/preview?theme=${themeSettings.layout}&color=${encodeURIComponent(themeSettings.primaryColor)}&font=${encodeURIComponent(themeSettings.fontFamily)}`, '_blank');
  };

  const handlePreviewHover = () => {
    setIsHovering(true);
    onPreviewOpen();
  };

  const handlePreviewLeave = () => {
    // Set a timeout to check if we're still hovering
    previewTimeoutRef.current = window.setTimeout(() => {
      if (!isHovering) {
        onPreviewClose();
      }
    }, 300);
  };

  const handleModalEnter = () => {
    setIsHovering(true);
  };

  const handleModalLeave = () => {
    setIsHovering(false);
    // Set a timeout to check if we're still hovering
    previewTimeoutRef.current = window.setTimeout(() => {
      if (!isHovering) {
        onPreviewClose();
      }
    }, 300);
  };

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (previewTimeoutRef.current) {
        window.clearTimeout(previewTimeoutRef.current);
      }
    };
  }, []);

  const handleSave = () => {
    toast({
      title: 'Changes saved',
      description: 'Your portfolio has been updated successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const updateTheme = (key: keyof ThemeSettings, value: string) => {
    setThemeSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleEditCaseStudy = (caseStudy: CaseStudy) => {
    setEditingCaseStudy({ ...caseStudy });
    setIsEditing(true);
  };

  const handleUpdateCaseStudy = (updatedCaseStudy: CaseStudy) => {
    setCaseStudies(prev =>
      prev.map(cs => cs.id === updatedCaseStudy.id ? updatedCaseStudy : cs)
    );
    setIsEditing(false);
    setEditingCaseStudy(null);

    toast({
      title: 'Case study updated',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingCaseStudy(null);
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <Container maxW="container.xl" py={8}>
        <Grid templateColumns={{ base: '1fr', md: '250px 1fr' }} gap={8}>
          {/* Sidebar - Desktop */}
          <Box
            display={{ base: 'none', md: 'block' }}
            bg="white"
            p={6}
            borderRadius="lg"
            borderWidth="1px"
            h="fit-content"
          >
            <VStack spacing={6} align="stretch">
              <Heading size="sm">Theme Settings</Heading>
              <FormControl>
                <FormLabel>Primary Color</FormLabel>
                <Input
                  type="color"
                  value={themeSettings.primaryColor}
                  onChange={(e) => updateTheme('primaryColor', e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Font Family</FormLabel>
                <Select
                  value={themeSettings.fontFamily}
                  onChange={(e) => updateTheme('fontFamily', e.target.value)}
                >
                  <option value="Inter">Inter</option>
                  <option value="Playfair Display">Playfair Display</option>
                  <option value="Roboto">Roboto</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Layout</FormLabel>
                <Select
                  value={themeSettings.layout}
                  onChange={(e) => updateTheme('layout', e.target.value)}
                >
                  <option value="minimal">Minimal</option>
                  <option value="creative">Creative</option>
                  <option value="bold">Bold</option>
                </Select>
              </FormControl>
            </VStack>
          </Box>

          {/* Main Content */}
          <Box bg="white" p={6} borderRadius="lg" borderWidth="1px">
            <Flex justify="flex-end" mb={6}>
              <Flex gap={3}>
                <Tooltip label="Open preview in new tab" placement="bottom">
                  <Button
                    leftIcon={<Eye size={18} />}
                    variant="outline"
                    colorScheme="blue"
                    size="md"
                    onClick={handlePreview}
                    _hover={{
                      bg: "blue.50",
                      transform: "translateY(-1px)",
                      boxShadow: "sm"
                    }}
                    transition="all 0.2s"
                  >
                    Preview
                  </Button>
                </Tooltip>
                <Button
                  leftIcon={<Save size={18} />}
                  colorScheme="primary"
                  size="md"
                  onClick={handleSave}
                  bgGradient="linear(to-r, primary.400, accent.400)"
                  _hover={{
                    bgGradient: "linear(to-r, primary.500, accent.500)",
                    transform: "translateY(-1px)",
                    boxShadow: "md"
                  }}
                  transition="all 0.2s"
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
                  <VStack spacing={6} align="stretch">
                    <FormControl>
                      <FormLabel>Name</FormLabel>
                      <Input placeholder="Your name" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Title</FormLabel>
                      <Input placeholder="e.g., UI/UX Designer" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Bio</FormLabel>
                      <Textarea placeholder="Tell us about yourself" rows={4} />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Profile Image</FormLabel>
                      <Input type="file" accept="image/*" p={1} />
                    </FormControl>
                  </VStack>
                </TabPanel>

                <TabPanel>
                  {isEditing && editingCaseStudy ? (
                    <VStack spacing={6} align="stretch">
                      <Flex justify="space-between" align="center">
                        <Button
                          leftIcon={<ChevronLeft />}
                          variant="ghost"
                          onClick={handleCancelEdit}
                        >
                          Back to Case Studies
                        </Button>
                        <Button
                          colorScheme="primary"
                          onClick={() => editingCaseStudy && handleUpdateCaseStudy(editingCaseStudy)}
                        >
                          Save Changes
                        </Button>
                      </Flex>

                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                        <FormControl>
                          <FormLabel fontWeight="medium">Title</FormLabel>
                          <Input
                            value={editingCaseStudy.title}
                            onChange={(e) => setEditingCaseStudy({
                              ...editingCaseStudy,
                              title: e.target.value
                            })}
                            placeholder="Enter case study title"
                            size="md"
                            borderRadius="md"
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel fontWeight="medium">Category</FormLabel>
                          <Select
                            value={editingCaseStudy.category}
                            onChange={(e) => setEditingCaseStudy({
                              ...editingCaseStudy,
                              category: e.target.value
                            })}
                            size="md"
                            borderRadius="md"
                          >
                            <option value="UX Design">UX Design</option>
                            <option value="Development">Development</option>
                            <option value="Branding">Branding</option>
                            <option value="Marketing">Marketing</option>
                          </Select>
                        </FormControl>
                      </SimpleGrid>

                      <FormControl>
                        <FormLabel fontWeight="medium">Image URL</FormLabel>
                        <InputGroup size="md">
                          <Input
                            value={editingCaseStudy.image}
                            onChange={(e) => setEditingCaseStudy({
                              ...editingCaseStudy,
                              image: e.target.value
                            })}
                            placeholder="https://example.com/image.jpg"
                            borderRadius="md"
                          />
                          <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" variant="ghost">
                              Upload
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        {editingCaseStudy.image && (
                          <Box mt={2} borderRadius="md" overflow="hidden" boxShadow="sm">
                            <Image
                              src={editingCaseStudy.image}
                              alt="Case study preview"
                              height="120px"
                              width="100%"
                              objectFit="cover"
                            />
                          </Box>
                        )}
                      </FormControl>

                      <FormControl>
                        <FormLabel fontWeight="medium">Description</FormLabel>
                        <Textarea
                          value={editingCaseStudy.description}
                          onChange={(e) => setEditingCaseStudy({
                            ...editingCaseStudy,
                            description: e.target.value
                          })}
                          placeholder="Brief description of the case study"
                          rows={3}
                          borderRadius="md"
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel fontWeight="medium">Tools Used</FormLabel>
                        <Input
                          value={editingCaseStudy.tools.join(', ')}
                          onChange={(e) => setEditingCaseStudy({
                            ...editingCaseStudy,
                            tools: e.target.value.split(',').map(tool => tool.trim())
                          })}
                          placeholder="Figma, React, Node.js"
                          borderRadius="md"
                        />
                        <Text fontSize="sm" color="gray.500" mt={1}>
                          Separate tools with commas
                        </Text>
                      </FormControl>

                      {/* Media Gallery */}
                      <Box
                        p={4}
                        bg="gray.50"
                        borderRadius="lg"
                        borderWidth="1px"
                        borderColor="gray.200"
                      >
                        <Heading size="sm" mb={4}>Media Gallery</Heading>
                        <VStack spacing={4} align="stretch">
                          <FormControl>
                            <FormLabel fontWeight="medium">Images</FormLabel>
                            <VStack spacing={2} align="stretch">
                              {editingCaseStudy.images.map((image, index) => (
                                <Flex key={index} gap={2}>
                                  <Input
                                    value={image}
                                    onChange={(e) => {
                                      const newImages = [...editingCaseStudy.images];
                                      newImages[index] = e.target.value;
                                      setEditingCaseStudy({
                                        ...editingCaseStudy,
                                        images: newImages
                                      });
                                    }}
                                    placeholder="https://example.com/image.jpg"
                                    borderRadius="md"
                                  />
                                  <IconButton
                                    aria-label="Remove image"
                                    icon={<Trash2 size={18} />}
                                    size="sm"
                                    colorScheme="red"
                                    onClick={() => {
                                      const newImages = editingCaseStudy.images.filter((_, i) => i !== index);
                                      setEditingCaseStudy({
                                        ...editingCaseStudy,
                                        images: newImages
                                      });
                                    }}
                                  />
                                </Flex>
                              ))}
                              <Button
                                leftIcon={<Plus size={18} />}
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setEditingCaseStudy({
                                    ...editingCaseStudy,
                                    images: [...editingCaseStudy.images, '']
                                  });
                                }}
                              >
                                Add Image
                              </Button>
                            </VStack>
                          </FormControl>

                          <FormControl>
                            <FormLabel fontWeight="medium">Video Links</FormLabel>
                            <VStack spacing={2} align="stretch">
                              {editingCaseStudy.videoLinks.map((link, index) => (
                                <Flex key={index} gap={2}>
                                  <Input
                                    value={link}
                                    onChange={(e) => {
                                      const newLinks = [...editingCaseStudy.videoLinks];
                                      newLinks[index] = e.target.value;
                                      setEditingCaseStudy({
                                        ...editingCaseStudy,
                                        videoLinks: newLinks
                                      });
                                    }}
                                    placeholder="https://youtube.com/watch?v=..."
                                    borderRadius="md"
                                  />
                                  <IconButton
                                    aria-label="Remove video link"
                                    icon={<Trash2 size={18} />}
                                    size="sm"
                                    colorScheme="red"
                                    onClick={() => {
                                      const newLinks = editingCaseStudy.videoLinks.filter((_, i) => i !== index);
                                      setEditingCaseStudy({
                                        ...editingCaseStudy,
                                        videoLinks: newLinks
                                      });
                                    }}
                                  />
                                </Flex>
                              ))}
                              <Button
                                leftIcon={<Plus size={18} />}
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setEditingCaseStudy({
                                    ...editingCaseStudy,
                                    videoLinks: [...editingCaseStudy.videoLinks, '']
                                  });
                                }}
                              >
                                Add Video Link
                              </Button>
                            </VStack>
                          </FormControl>
                        </VStack>
                      </Box>

                      {/* Timeline */}
                      <Box
                        p={4}
                        bg="gray.50"
                        borderRadius="lg"
                        borderWidth="1px"
                        borderColor="gray.200"
                      >
                        <Heading size="sm" mb={4}>Development Timeline</Heading>
                        <VStack spacing={4} align="stretch">
                          {editingCaseStudy.timeline.map((event, index) => (
                            <Box
                              key={index}
                              p={4}
                              bg="white"
                              borderRadius="md"
                              borderWidth="1px"
                              borderColor="gray.200"
                            >
                              <Flex justify="space-between" align="center" mb={2}>
                                <Heading size="xs">Timeline Event {index + 1}</Heading>
                                <IconButton
                                  aria-label="Remove timeline event"
                                  icon={<Trash2 size={18} />}
                                  size="sm"
                                  colorScheme="red"
                                  onClick={() => {
                                    const newTimeline = editingCaseStudy.timeline.filter((_, i) => i !== index);
                                    setEditingCaseStudy({
                                      ...editingCaseStudy,
                                      timeline: newTimeline
                                    });
                                  }}
                                />
                              </Flex>
                              <VStack spacing={3} align="stretch">
                                <FormControl>
                                  <FormLabel fontSize="sm">Date</FormLabel>
                                  <Input
                                    type="date"
                                    value={event.date}
                                    onChange={(e) => {
                                      const newTimeline = [...editingCaseStudy.timeline];
                                      newTimeline[index] = {
                                        ...event,
                                        date: e.target.value
                                      };
                                      setEditingCaseStudy({
                                        ...editingCaseStudy,
                                        timeline: newTimeline
                                      });
                                    }}
                                    size="sm"
                                    borderRadius="md"
                                  />
                                </FormControl>
                                <FormControl>
                                  <FormLabel fontSize="sm">Title</FormLabel>
                                  <Input
                                    value={event.title}
                                    onChange={(e) => {
                                      const newTimeline = [...editingCaseStudy.timeline];
                                      newTimeline[index] = {
                                        ...event,
                                        title: e.target.value
                                      };
                                      setEditingCaseStudy({
                                        ...editingCaseStudy,
                                        timeline: newTimeline
                                      });
                                    }}
                                    placeholder="Event title"
                                    size="sm"
                                    borderRadius="md"
                                  />
                                </FormControl>
                                <FormControl>
                                  <FormLabel fontSize="sm">Description</FormLabel>
                                  <Textarea
                                    value={event.description}
                                    onChange={(e) => {
                                      const newTimeline = [...editingCaseStudy.timeline];
                                      newTimeline[index] = {
                                        ...event,
                                        description: e.target.value
                                      };
                                      setEditingCaseStudy({
                                        ...editingCaseStudy,
                                        timeline: newTimeline
                                      });
                                    }}
                                    placeholder="Event description"
                                    size="sm"
                                    rows={2}
                                    borderRadius="md"
                                  />
                                </FormControl>
                              </VStack>
                            </Box>
                          ))}
                          <Button
                            leftIcon={<Plus size={18} />}
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingCaseStudy({
                                ...editingCaseStudy,
                                timeline: [
                                  ...editingCaseStudy.timeline,
                                  {
                                    date: new Date().toISOString().split('T')[0],
                                    title: '',
                                    description: ''
                                  }
                                ]
                              });
                            }}
                          >
                            Add Timeline Event
                          </Button>
                        </VStack>
                      </Box>

                      <Box
                        p={4}
                        bg="gray.50"
                        borderRadius="lg"
                        borderWidth="1px"
                        borderColor="gray.200"
                      >
                        <Heading size="sm" mb={4}>Case Study Details</Heading>

                        <VStack spacing={4} align="stretch">
                          <FormControl>
                            <FormLabel fontWeight="medium">Challenge</FormLabel>
                            <Textarea
                              value={editingCaseStudy.challenge}
                              onChange={(e) => setEditingCaseStudy({
                                ...editingCaseStudy,
                                challenge: e.target.value
                              })}
                              placeholder="What was the challenge or problem?"
                              rows={4}
                              borderRadius="md"
                            />
                          </FormControl>

                          <FormControl>
                            <FormLabel fontWeight="medium">Solution</FormLabel>
                            <Textarea
                              value={editingCaseStudy.solution}
                              onChange={(e) => setEditingCaseStudy({
                                ...editingCaseStudy,
                                solution: e.target.value
                              })}
                              placeholder="How did you solve the problem?"
                              rows={4}
                              borderRadius="md"
                            />
                          </FormControl>

                          <FormControl>
                            <FormLabel fontWeight="medium">Outcome</FormLabel>
                            <Textarea
                              value={editingCaseStudy.outcome}
                              onChange={(e) => setEditingCaseStudy({
                                ...editingCaseStudy,
                                outcome: e.target.value
                              })}
                              placeholder="What were the results?"
                              rows={4}
                              borderRadius="md"
                            />
                          </FormControl>
                        </VStack>
                      </Box>
                    </VStack>
                  ) : (
                    <VStack spacing={6} align="stretch">
                      <Flex justify="space-between" align="center" mb={4}>
                        <Heading size="md">Case Studies</Heading>
                        <Button leftIcon={<Plus />} colorScheme="primary" size="sm">
                          Add Case Study
                        </Button>
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
                                    onClick={() => handleEditCaseStudy(study)}
                                  />
                                  <IconButton
                                    aria-label="Delete case study"
                                    icon={<Trash2 size={18} />}
                                    size="sm"
                                    colorScheme="red"
                                  />
                                </Flex>
                              </Stack>
                            </CardBody>
                          </Card>
                        ))}
                      </SimpleGrid>
                    </VStack>
                  )}
                </TabPanel>

                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <FormControl>
                      <FormLabel>Email</FormLabel>
                      <Input type="email" placeholder="your@email.com" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>LinkedIn</FormLabel>
                      <Input placeholder="LinkedIn profile URL" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>GitHub</FormLabel>
                      <Input placeholder="GitHub profile URL" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Portfolio Website</FormLabel>
                      <Input placeholder="Your website URL" />
                    </FormControl>
                  </VStack>
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
            <VStack spacing={6} align="stretch">
              <FormControl>
                <FormLabel>Primary Color</FormLabel>
                <Input
                  type="color"
                  value={themeSettings.primaryColor}
                  onChange={(e) => updateTheme('primaryColor', e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Font Family</FormLabel>
                <Select
                  value={themeSettings.fontFamily}
                  onChange={(e) => updateTheme('fontFamily', e.target.value)}
                >
                  <option value="Inter">Inter</option>
                  <option value="Playfair Display">Playfair Display</option>
                  <option value="Roboto">Roboto</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Layout</FormLabel>
                <Select
                  value={themeSettings.layout}
                  onChange={(e) => updateTheme('layout', e.target.value)}
                >
                  <option value="minimal">Minimal</option>
                  <option value="creative">Creative</option>
                  <option value="bold">Bold</option>
                </Select>
              </FormControl>
            </VStack>
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
                  width: '143%', // Compensate for the scale (1/0.7)
                  height: '143%', // Compensate for the scale (1/0.7)
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