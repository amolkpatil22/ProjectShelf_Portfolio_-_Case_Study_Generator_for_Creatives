import React from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Link as ChakraLink,
  IconButton,
  useDisclosure,
  useBreakpointValue,
  Container
} from '@chakra-ui/react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Layers, Home, FolderKanban, Settings, BarChart } from 'lucide-react';

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // Define routes that should only be visible on landing page
  const landingPageRoutes = [
    { path: '/#features', label: 'Features' },
    { path: '/#casestudies', label: 'Case Studies' },
    { path: '/#themes', label: 'Themes' },
    { path: '/#analytics', label: 'Analytics' },
    { path: '/#pricing', label: 'Pricing' }
  ];

  // Define routes for logged-in users
  const loggedInRoutes = [
    { path: '/dashboard', label: 'Dashboard', icon: <Home size={18} /> },
    { path: '/builder', label: 'Portfolio Builder', icon: <FolderKanban size={18} /> },
    { path: '/analytics', label: 'Analytics', icon: <BarChart size={18} /> },
  ];

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (isLoggedIn) {
      // If logged in, navigate to dashboard
      navigate('/dashboard');
    } else {
      // If not logged in, navigate to home page
      navigate('/');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <Box
      position={isLoggedIn === false ? "fixed" : "relative"}
      as="nav"
      w="100%"
      zIndex="sticky"
      bg="white"
      borderBottom="1px"
      borderColor="gray.200"
      py={4}
    >
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <ChakraLink
            as="a"
            href="#"
            onClick={handleLogoClick}
            display="flex"
            alignItems="center"
            gap={2}
          >
            <Layers size={24} />
            <Text
              fontSize="xl"
              fontWeight="bold"
              bgGradient="linear(to-r, primary.400, accent.400)"
              bgClip="text"
            >
              ProjectShelf
            </Text>
          </ChakraLink>

          {/* Desktop Navigation */}
          <Stack
            display={{ base: 'none', md: 'flex' }}
            direction="row"
            spacing={4}
            alignItems="center"
          >
            {isLoggedIn ? (
              // Show logged-in user navigation
              <>
                {loggedInRoutes.map((route) => (
                  <Button
                    key={route.path}
                    as={RouterLink}
                    to={route.path}
                    variant="ghost"
                    size="md"
                    leftIcon={route.icon}
                  >
                    {route.label}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="md"
                  onClick={handleLogout}
                  colorScheme="red"
                >
                  Log Out
                </Button>
              </>
            ) : (
              // Show landing page navigation
              <>
                {landingPageRoutes.map((route) => (
                  <Button
                    key={route.path}
                    as={RouterLink}
                    to={route.path}
                    variant="ghost"
                    size="md"
                  >
                    {route.label}
                  </Button>
                ))}
                <Button
                  as={RouterLink}
                  to="/login"
                  variant="outline"
                  size="md"
                >
                  Log In
                </Button>
                <Button
                  as={RouterLink}
                  to="/signup"
                  variant="solid"
                  size="md"
                  bgGradient="linear(to-r, primary.400, accent.400)"
                  _hover={{
                    bgGradient: "linear(to-r, primary.500, accent.500)",
                  }}
                >
                  Sign Up Free
                </Button>
              </>
            )}
          </Stack>

          <IconButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onToggle}
            icon={isOpen ? <X size={24} /> : <Menu size={24} />}
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        </Flex>

        {/* Mobile menu */}
        {isOpen && (
          <Box
            display={{ base: 'block', md: 'none' }}
            mt={4}
            py={4}
            borderTop="1px"
            borderColor="gray.200"
          >
            <Stack spacing={4}>
              {isLoggedIn ? (
                // Show logged-in user navigation for mobile
                <>
                  {loggedInRoutes.map((route) => (
                    <Button
                      key={route.path}
                      as={RouterLink}
                      to={route.path}
                      variant="ghost"
                      w="full"
                      justifyContent="flex-start"
                      leftIcon={route.icon}
                    >
                      {route.label}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    w="full"
                    my={2}
                    onClick={handleLogout}
                    colorScheme="red"
                  >
                    Log Out
                  </Button>
                </>
              ) : (
                // Show landing page navigation for mobile
                <>
                  {landingPageRoutes.map((route) => (
                    <Button
                      key={route.path}
                      as={RouterLink}
                      to={route.path}
                      variant="ghost"
                      w="full"
                      justifyContent="flex-start"
                    >
                      {route.label}
                    </Button>
                  ))}
                  <Button
                    as={RouterLink}
                    to="/login"
                    variant="outline"
                    w="full"
                    my={2}
                  >
                    Log In
                  </Button>
                  <Button
                    as={RouterLink}
                    to="/signup"
                    variant="solid"
                    w="full"
                    bgGradient="linear(to-r, primary.400, accent.400)"
                    _hover={{
                      bgGradient: "linear(to-r, primary.500, accent.500)",
                    }}
                  >
                    Sign Up Free
                  </Button>
                </>
              )}
            </Stack>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Navbar;