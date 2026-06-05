// App.jsx — Router + Global Providers only. No business logic.
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingHero from './components/LandingHero';

/**
 * ApexWeb360 App Shell
 * Maintains clean separation between global configuration 
 * and modular route-based components.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Entry Point: Landing Page */}
        <Route path="/" element={<LandingHero />} />
        
        {/* Future routes will be defined here following the same pattern */}
        {/* <Route path="/services" element={<ServicesPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}