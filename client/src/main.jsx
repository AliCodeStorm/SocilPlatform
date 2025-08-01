import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <Toaster richColors position="top-right" />
     <AuthProvider>
      <App />
     </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
