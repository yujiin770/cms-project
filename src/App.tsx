import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/public/Home';
import Dashboard from './pages/admin/Dashboard';
import Login from './pages/admin/Login';
import PublicLayout from './components/layout/PublicLayout';
import AdminSidebar from './components/admin/AdminSidebar';
import ProtectedRoute from './components/admin/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTES (With Navbar) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          {/* Add /watches or /about here later */}
        </Route>

        {/* AUTH (No Navbar, No Sidebar) */}
        <Route path="/admin/login" element={<Login />} />

        {/* ADMIN ROUTES (Locked + Sidebar Only) */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminSidebar />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;