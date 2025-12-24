import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import './index.css';

/**
 * Main App Component
 * 
 * Root component with routing and global state provider.
 */
function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
