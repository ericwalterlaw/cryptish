import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [portfolioData, setPortfolioData] = useState({
    totalValue: 0,
    totalGain: 0,
    gainPercentage: 0,
    assets: []
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUserData(user);

    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://cryptobackend-1r20.onrender.com/api/portfolio', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setPortfolioData(data);
      }
    } catch (error) {
      console.error('Error fetching portfolio data:', error);

    }
  };


  const quickStats = [
    {
      label: 'Total Portfolio Value',
      value: `$${portfolioData.totalValue.toLocaleString()}`,
      change: portfolioData.gainPercentage,
      icon: '💰'
    },
    {
      label: 'Total Gain/Loss',
      value: `$${portfolioData.totalGain.toLocaleString()}`,
      change: portfolioData.gainPercentage,
      icon: '📈'
    },
    {
      label: 'Active Assets',
      value: portfolioData.assets.length.toString(),
      change: 0,
      icon: '🪙'
    },

  ];

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {userData?.name || 'Trader'}! 👋
          </h1>
          <p className="text-gray-400">Here's an overview of your crypto portfolio</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  {stat.change !== 0 && (
                    <p
                      className={`text-sm flex items-center mt-1 ${
                        stat.change > 0 ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {stat.change > 0 ? '↗' : '↘'} {Math.abs(stat.change).toFixed(2)}%
                    </p>
                  )}
                </div>
                <div className="text-3xl">{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Portfolio Assets */}
          <div className="lg:col-span-2">
            <div
              className="bg-gray-800 border border-gray-700 rounded-xl p-6 animate-slide-up"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Your Assets</h2>
                <button className="text-blue-500 hover:text-blue-400 text-sm font-medium transition-colors">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {portfolioData.assets.map((asset, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-900 rounded-lg hover:bg-opacity-80 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{asset.symbol}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-white">{asset.name}</p>
                        <p className="text-gray-400 text-sm">
                          {asset.amount} {asset.symbol}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-white">
                        ${asset.value.toLocaleString()}
                      </p>
                      <p
                        className={`text-sm ${
                          asset.change > 0 ? 'text-green-500' : 'text-red-500'
                        }`}
                      >
                        {asset.change > 0 ? '+' : ''}
                        {asset.change.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>


            {/* Quick Actions */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mt-6">
              <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg text-sm font-medium transition-colors">
                  Buy Crypto
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg text-sm font-medium transition-colors">
                  Sell Crypto
                </button>
                <button className="border border-gray-700 hover:border-blue-500 text-white p-3 rounded-lg text-sm font-medium transition-colors">
                  Deposit
                </button>
                <button className="border border-gray-700 hover:border-blue-500 text-white p-3 rounded-lg text-sm font-medium transition-colors">
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
