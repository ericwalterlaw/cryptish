import { useState, useEffect } from 'react';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    timezone: '',
    twoFactorEnabled: false,
    emailNotifications: true,
    priceAlerts: true,
    marketingEmails: false
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(prevUser => ({
      ...prevUser,
      ...userData,
      phone: '+1 (555) 123-4567',
      country: 'United States',
      timezone: 'Eastern Time (ET)',
      twoFactorEnabled: false,
      emailNotifications: true,
      priceAlerts: true,
      marketingEmails: false
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', content: '' });

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('user', JSON.stringify({
        name: user.name,
        email: user.email
      }));
      setMessage({ type: 'success', content: 'Profile updated successfully!' });
    } catch {
      setMessage({ type: 'error', content: 'Failed to update profile. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', content: '' });

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage({ type: 'success', content: 'Password updated successfully!' });
      e.target.reset();
    } catch {
      setMessage({ type: 'error', content: 'Failed to update password. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSettingsUpdate = async () => {
    setLoading(true);
    setMessage({ type: '', content: '' });

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage({ type: 'success', content: 'Settings updated successfully!' });
    } catch {
      setMessage({ type: 'error', content: 'Failed to update settings. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
          <p className="text-gray-400">Manage your account information and preferences</p>
        </div>

        {/* Message */}
        {message.content && (
          <div className={`mb-6 p-4 rounded-lg animate-slide-up ${
            message.type === 'success' 
              ? 'bg-green-500/10 border border-green-500/20 text-green-400'
              : 'bg-red-500/10 border border-red-500/20 text-red-400'
          }`}>
            {message.content}
          </div>
        )}

        {/* Tabs */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden animate-slide-up">
          <div className="flex border-b border-gray-700">
            {['profile', 'security', 'notifications'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-gray-900 text-blue-400 border-b-2 border-blue-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab === 'profile' && 'Profile Information'}
                {tab === 'security' && 'Security'}
                {tab === 'notifications' && 'Notifications'}
              </button>
            ))}
          </div>

          {/* Profile Information Tab */}
          {activeTab === 'profile' && (
            <div className="p-6">
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={user.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Country</label>
                    <select
                      name="country"
                      value={user.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Country</option>
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>Germany</option>
                      <option>France</option>
                      <option>Japan</option>
                      <option>Australia</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-white mb-2">Timezone</label>
                    <select
                      name="timezone"
                      value={user.timezone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Timezone</option>
                      <option>Eastern Time (ET)</option>
                      <option>Central Time (CT)</option>
                      <option>Mountain Time (MT)</option>
                      <option>Pacific Time (PT)</option>
                      <option>Greenwich Mean Time (GMT)</option>
                      <option>Central European Time (CET)</option>
                      <option>Japan Standard Time (JST)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50"
                  >
                    {loading ? 'Updating...' : 'Update Profile'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="p-6 space-y-8">
              {/* Two-Factor Authentication */}
              <div className="bg-gray-900 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Two-Factor Authentication</h3>
                    <p className="text-gray-400 text-sm">Add an extra layer of security</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`text-sm ${user.twoFactorEnabled ? 'text-green-400' : 'text-gray-400'}`}>
                      {user.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                    </span>
                    <input
                      type="checkbox"
                      checked={user.twoFactorEnabled}
                      onChange={(e) => setUser(prev => ({ ...prev, twoFactorEnabled: e.target.checked }))}
                      className="w-5 h-5"
                    />
                  </div>
                </div>
              </div>

              {/* Change Password */}
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  {['Current Password', 'New Password', 'Confirm New Password'].map((label, i) => (
                    <div key={i}>
                      <label className="block text-sm font-medium text-white mb-2">{label}</label>
                      <input
                        type="password"
                        required
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50"
                  >
                    {loading ? 'Updating...' : 'Update Password'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="p-6">
              <div className="space-y-6">
                <div className="bg-gray-900 rounded-lg p-6 space-y-4">
                  {[
                    { key: 'emailNotifications', title: 'Email Notifications', desc: 'Important account updates' },
                    { key: 'priceAlerts', title: 'Price Alerts', desc: 'Get notified when prices move' },
                    { key: 'marketingEmails', title: 'Marketing Emails', desc: 'News, updates, and promotions' },
                  ].map(({ key, title, desc }) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">{title}</p>
                        <p className="text-gray-400 text-sm">{desc}</p>
                      </div>
                      <input
                        type="checkbox"
                        name={key}
                        checked={user[key]}
                        onChange={handleInputChange}
                        className="w-5 h-5"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSettingsUpdate}
                    disabled={loading}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50"
                  >
                    {loading ? 'Updating...' : 'Save Settings'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
