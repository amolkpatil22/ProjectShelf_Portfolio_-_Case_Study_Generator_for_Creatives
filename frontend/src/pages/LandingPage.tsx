import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import CaseStudies from '../components/landing/CaseStudies';
import ThemePreview from '../components/landing/ThemePreview';
import Testimonials from '../components/landing/Testimonials';
import CallToAction from '../components/landing/CallToAction';
import Analytics from '../components/landing/Analytics';

const LandingPage = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle hash links
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        // Add a small delay to ensure the element is rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <Box>
      <Hero />
      <Features />
      <CaseStudies />
      <ThemePreview />
      <Analytics />
      <Testimonials />
      <CallToAction />
    </Box>
  );
};

export default LandingPage;