import { Button } from '@chakra-ui/react'
import './App.css'
import { Provider } from './components/ui/provider'

function App() {

  return (
    <Provider >
      <Button colorScheme='teal' size='lg'>
        Button
      </Button>
    </Provider>
  )
}

export default App
