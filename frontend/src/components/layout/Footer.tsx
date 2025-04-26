import React from 'react';
import { 
  Box, 
  Container, 
  Stack, 
  Text, 
  Flex, 
  Heading, 
  Link, 
  ButtonGroup,
  IconButton,
  Divider
} from '@chakra-ui/react';
import { 
  Layers, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Github 
} from 'lucide-react';

const Footer = () => {
  return (
    <Box bg="gray.50" color="gray.700" as="footer" py={12}>
      <Container maxW="container.xl">
        <Stack 
          direction={{ base: 'column', md: 'row' }} 
          spacing={{ base: 10, md: 20 }}
          justify="space-between"
        >
          <Stack spacing={6} maxW="300px">
            <Flex alignItems="center">
              <Layers size={24} color="#3358FF" />
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
            <Text fontSize="sm">
              Elevate your creative portfolio with beautiful case studies and custom designs that showcase your best work.
            </Text>
            <ButtonGroup variant="ghost" spacing={3} color="gray.600">
              <IconButton aria-label="Twitter" icon={<Twitter size={20} />} />
              <IconButton aria-label="Instagram" icon={<Instagram size={20} />} />
              <IconButton aria-label="LinkedIn" icon={<Linkedin size={20} />} />
              <IconButton aria-label="GitHub" icon={<Github size={20} />} />
            </ButtonGroup>
          </Stack>

          <Stack direction={{ base: 'column', md: 'row' }} spacing={8}>
            <Stack spacing={4} minW={{ md: '150px' }}>
              <Heading fontSize="md" color="gray.700">Product</Heading>
              <Stack spacing={3} fontSize="sm">
                <Link href="#">Features</Link>
                <Link href="#">Case Studies</Link>
                <Link href="#">Templates</Link>
                <Link href="#">Pricing</Link>
              </Stack>
            </Stack>

            <Stack spacing={4} minW={{ md: '150px' }}>
              <Heading fontSize="md" color="gray.700">Company</Heading>
              <Stack spacing={3} fontSize="sm">
                <Link href="#">About</Link>
                <Link href="#">Team</Link>
                <Link href="#">Careers</Link>
                <Link href="#">Press</Link>
              </Stack>
            </Stack>

            <Stack spacing={4} minW={{ md: '150px' }}>
              <Heading fontSize="md" color="gray.700">Resources</Heading>
              <Stack spacing={3} fontSize="sm">
                <Link href="#">Blog</Link>
                <Link href="#">Guides</Link>
                <Link href="#">Support</Link>
                <Link href="#">API</Link>
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        <Divider my={8} borderColor="gray.200" />

        <Flex 
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align={{ base: 'center', md: 'center' }}
          fontSize="sm"
          color="gray.500"
        >
          <Text>© 2025 ProjectShelf. All rights reserved.</Text>
          <Stack direction="row" spacing={6} mt={{ base: 4, md: 0 }}>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
            <Link href="#">Cookie Settings</Link>
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;