
import { Button } from '@chakra-ui/react';
import { Provider } from './components/ui/provider';
import Navigation from './navigation/Navigation';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
