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
import { Menu, X, Layers } from 'lucide-react';

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (location.pathname === '/') {
      // If already on home page, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // If on another page, navigate to home page
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
      as="nav"
      position="sticky"
      top="0"
      zIndex="1000"
      bg="white"
      boxShadow="sm"
      backdropFilter="blur(10px)"
      w="100%"
    >
      <Container maxW="container.xl">
        <Flex
          h={{ base: '70px', md: '80px' }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Flex alignItems="center">
            <ChakraLink
              as="a"
              href="#"
              _hover={{ textDecoration: 'none' }}
              onClick={handleLogoClick}
            >
              <Flex alignItems="center" mr={4}>
                <Layers size={28} color="#3358FF" />
                <Text
                  fontSize="xl"
                  fontWeight="bold"
                  ml={2}
                  fontFamily="heading"
                  bgGradient="linear(to-r, primary.400, accent.400)"
                  bgClip="text"
                >
                  ProjectShelf
                </Text>
              </Flex>
            </ChakraLink>

            <Stack
              display={{ base: 'none', md: 'flex' }}
              direction="row"
              spacing={8}
              alignItems="center"
              fontWeight="500"
              ml={6}
            >
              <ChakraLink as={RouterLink} to="/#features">Features</ChakraLink>
              <ChakraLink as={RouterLink} to="/#casestudies">Case Studies</ChakraLink>
              <ChakraLink as={RouterLink} to="/#themes">Themes</ChakraLink>
              <ChakraLink as={RouterLink} to="/#analytics">Analytics</ChakraLink>
              <ChakraLink as={RouterLink} to="/#pricing">Pricing</ChakraLink>
              {isLoggedIn && (
                <ChakraLink as={RouterLink} to="/builder" color="primary.400">Portfolio Builder</ChakraLink>
              )}
            </Stack>
          </Flex>

          <Stack
            display={{ base: 'none', md: 'flex' }}
            direction="row"
            spacing={4}
            alignItems="center"
          >
            {isLoggedIn ? (
              <Button
                variant="outline"
                size="md"
                onClick={handleLogout}
                colorScheme="red"
              >
                Log Out
              </Button>
            ) : (
              <>
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
        {isMobile && isOpen && (
          <Box
            py={4}
            display={{ md: 'none' }}
            position="absolute"
            top="70px"
            left={0}
            right={0}
            bg="white"
            boxShadow="md"
            zIndex={2}
          >
            <Stack spacing={4} px={4}>
              <ChakraLink as={RouterLink} to="/#features" py={2} fontWeight="500">Features</ChakraLink>
              <ChakraLink as={RouterLink} to="/#casestudies" py={2} fontWeight="500">Case Studies</ChakraLink>
              <ChakraLink as={RouterLink} to="/#themes" py={2} fontWeight="500">Themes</ChakraLink>
              <ChakraLink as={RouterLink} to="/#analytics" py={2} fontWeight="500">Analytics</ChakraLink>
              <ChakraLink as={RouterLink} to="/#pricing" py={2} fontWeight="500">Pricing</ChakraLink>
              {isLoggedIn && (
                <ChakraLink as={RouterLink} to="/builder" py={2} fontWeight="500" color="primary.400">Portfolio Builder</ChakraLink>
              )}
              {isLoggedIn ? (
                <Button
                  variant="outline"
                  w="full"
                  my={2}
                  onClick={handleLogout}
                  colorScheme="red"
                >
                  Log Out
                </Button>
              ) : (
                <>
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