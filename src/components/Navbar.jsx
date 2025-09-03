import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isAuthenticated = localStorage.getItem('token');

  return (
    <nav className="bg-gray-900 border-b border-gray-700 sticky top-0 z-50 backdrop-blur-sm bg-opacity-80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Nav Links */}
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">₿</span>
              </div>
              <span className="text-xl font-bold text-white">CryptoTrade</span>
            </Link>

            {isAuthenticated && (
              <div className="hidden md:flex space-x-6">
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/dashboard')
                      ? 'bg-gray-800 text-blue-400'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/market"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/market')
                      ? 'bg-gray-800 text-blue-400'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  Market
                </Link>
                <Link
                  to="/portfolio"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/portfolio')
                      ? 'bg-gray-800 text-blue-400'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  Portfolio
                </Link>
              </div>
            )}
          </div>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-white p-2"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isAuthenticated && (
              <>
                <Link
                  to="/dashboard"
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive('/dashboard')
                      ? 'bg-gray-900 text-blue-400'
                      : 'text-gray-400 hover:text-white hover:bg-gray-900'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/market"
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive('/market')
                      ? 'bg-gray-900 text-blue-400'
                      : 'text-gray-400 hover:text-white hover:bg-gray-900'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Market
                </Link>
                <Link
                  to="/portfolio"
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive('/portfolio')
                      ? 'bg-gray-900 text-blue-400'
                      : 'text-gray-400 hover:text-white hover:bg-gray-900'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Portfolio
                </Link>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-900 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-400 hover:text-red-300 hover:bg-gray-900 transition-colors"
                >
                  Logout
                </button>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-900 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium text-blue-400 hover:text-blue-300 hover:bg-gray-900 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
