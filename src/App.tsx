import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';
import { ThemeProvider } from '../src/context/ThemeContext'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

function App() {

  return (
    <BrowserRouter>
      <ThemeProvider>
        <Router />
        <ToastContainer theme="colored" />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App