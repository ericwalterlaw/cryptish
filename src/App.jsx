import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './stuff/Home';
import Login from './stuff/Login';
import Register from './stuff/Register';
import Dashboard from './stuff/Dashboard';
import Market from './stuff/Market';
import Portfolio from './stuff/Portfolio';
import Profile from './stuff/Profile';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

// Public Route Component (redirect to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return !token ? children : <Navigate to="/dashboard" />;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-crypto-dark">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />

          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/market" element={
            <ProtectedRoute>
              <Market />
            </ProtectedRoute>
          } />
          <Route path="/portfolio" element={
            <ProtectedRoute>
              <Portfolio />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;