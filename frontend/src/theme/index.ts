import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: '"Playfair Display", serif',
    body: 'Inter, sans-serif',
  },
  colors: {
    primary: {
      50: '#e6ebff',
      100: '#b3c2ff',
      200: '#809aff',
      300: '#4d71ff',
      400: '#3358FF', // Primary color
      500: '#1a3bff',
      600: '#0020e6',
      700: '#0018b3',
      800: '#001080',
      900: '#00084d',
    },
    secondary: {
      50: '#e7fff7',
      100: '#b3ffdf',
      200: '#80ffc8',
      300: '#4dffb0',
      400: '#1aff99',
      500: '#10B981', // Secondary color
      600: '#00cc6d',
      700: '#009a52',
      800: '#006938',
      900: '#00371d',
    },
    accent: {
      50: '#f1eaff',
      100: '#d2c2ff',
      200: '#b39aff',
      300: '#9471ff',
      400: '#9061F9', // Accent color
      500: '#7530ff',
      600: '#6724e6',
      700: '#501cb3',
      800: '#391380',
      900: '#22094d',
    },
    gray: {
      50: '#F7FAFC',
      100: '#EDF2F7',
      200: '#E2E8F0',
      300: '#CBD5E0',
      400: '#A0AEC0',
      500: '#718096',
      600: '#4A5568',
      700: '#2D3748',
      800: '#1A202C',
      900: '#171923',
    },
    success: {
      500: '#38A169',
    },
    warning: {
      500: '#DD6B20',
    },
    error: {
      500: '#E53E3E',
    },
  },
  shadows: {
    outline: '0 0 0 3px rgba(51, 88, 255, 0.6)',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '600',
        borderRadius: 'md',
      },
      variants: {
        solid: {
          bg: 'primary.400',
          color: 'white',
          _hover: {
            bg: 'primary.500',
            _disabled: {
              bg: 'primary.400',
            },
          },
        },
        outline: {
          borderColor: 'primary.400',
          color: 'primary.400',
          _hover: {
            bg: 'primary.50',
          },
        },
        secondary: {
          bg: 'secondary.500',
          color: 'white',
          _hover: {
            bg: 'secondary.600',
          },
        },
        accent: {
          bg: 'accent.400',
          color: 'white',
          _hover: {
            bg: 'accent.500',
          },
        },
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: '700',
        letterSpacing: '-0.02em',
      },
    },
    Link: {
      baseStyle: {
        color: 'primary.400',
        _hover: {
          textDecoration: 'none',
          color: 'primary.500',
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'gray.800',
      },
    },
  },
});

export default theme;