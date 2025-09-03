import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://cryptobackend-1r20.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D1117] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center animate-[fadeIn_0.5s_ease-in-out]">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-[#3B82F6] to-[#10B981] rounded-xl flex items-center justify-center mb-6">
            <span className="text-[#F0F6FC] font-bold text-2xl">₿</span>
          </div>
          <h2 className="text-3xl font-bold text-[#F0F6FC]">Create Account</h2>
          <p className="mt-2 text-[#8B949E]">Join thousands of successful traders</p>
        </div>

        <form className="mt-8 space-y-6 animate-[slideUp_0.3s_ease-out]" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-[#EF4444]/10 border border-[#EF4444]/20 text-[#EF4444] px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#F0F6FC] mb-2">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#21262D] border border-[#30363D] rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-[#F0F6FC] placeholder-[#8B949E] transition-all"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#F0F6FC] mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#21262D] border border-[#30363D] rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-[#F0F6FC] placeholder-[#8B949E] transition-all"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#F0F6FC] mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#21262D] border border-[#30363D] rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-[#F0F6FC] placeholder-[#8B949E] transition-all"
                placeholder="Create a password"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#F0F6FC] mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#21262D] border border-[#30363D] rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-[#F0F6FC] placeholder-[#8B949E] transition-all"
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-[#3B82F6] focus:ring-[#3B82F6] border-[#30363D] rounded bg-[#21262D]"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-[#8B949E]">
              I agree to the{' '}
              <a href="#" className="text-[#3B82F6] hover:text-[#10B981]">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-[#3B82F6] hover:text-[#10B981]">Privacy Policy</a>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-[#F0F6FC] bg-gradient-to-r from-[#3B82F6] to-[#10B981] hover:from-[#10B981] hover:to-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3B82F6] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-[#F0F6FC] border-t-transparent rounded-full animate-spin mr-2"></div>
                Creating account...
              </div>
            ) : (
              'Create Account'
            )}
          </button>

          <div className="text-center">
            <span className="text-[#8B949E]">Already have an account? </span>
            <Link to="/login" className="font-medium text-[#3B82F6] hover:text-[#10B981] transition-colors">
              Sign in here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
