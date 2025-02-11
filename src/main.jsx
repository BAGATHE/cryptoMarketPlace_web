import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx'
import 'sweetalert2/dist/sweetalert2.min.css';
import CoinContexProvider from './context/CoinContext.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <CoinContexProvider>
          <App />
      </CoinContexProvider>
    </Router>
  </StrictMode>,
);
