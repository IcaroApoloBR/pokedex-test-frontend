import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';
import { ThemeProvider } from '../src/context/ThemeContext'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { PokemonProvider } from './context/PokemonContext';

function App() {
  return (
    <BrowserRouter>
      <PokemonProvider>
        <ThemeProvider>
          <ToastContainer theme="colored" />
          <Router />
        </ThemeProvider>
      </PokemonProvider>
    </BrowserRouter>
  )
}

export default App