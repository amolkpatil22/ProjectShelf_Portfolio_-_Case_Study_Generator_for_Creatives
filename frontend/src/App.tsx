import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import Navigation from './navigation/Navigation';
import Navbar from './components/layout/Navbar';
import { BrowserRouter } from 'react-router-dom';
function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Navigation />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;