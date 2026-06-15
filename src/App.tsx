import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/public/Home';
import Dashboard  from './pages/admin/Dashboard';
import Login from './pages/admin/Login';
import Navbar from './components/layout/Navbar';

function App() {
  return (
    <Router>
      {/* Navbar stays at the top of every page */}
      <Navbar /> 
      
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;