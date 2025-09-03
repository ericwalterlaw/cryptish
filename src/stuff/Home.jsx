import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    {
      icon: '📈',
      title: 'Real-time Tracking',
      description: 'Monitor cryptocurrency prices and market trends in real-time',
    },
    {
      icon: '💼',
      title: 'Portfolio Management',
      description: 'Track your investments and analyze your portfolio performance',
    },
    {
      icon: '🔒',
      title: 'Secure Trading',
      description: 'Advanced security features to keep your investments safe',
    },
    {
      icon: '📊',
      title: 'Advanced Analytics',
      description: 'Detailed charts and analytics to help you make informed decisions',
    },
  ];

  const stats = [
    { label: 'Active Users', value: '50K+' },
    { label: 'Cryptocurrencies', value: '500+' },
    { label: 'Trading Volume', value: '$2.5B+' },
    { label: 'Countries', value: '100+' },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-green-500/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Trade Crypto with{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">
                Confidence
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join thousands of traders who trust CryptoTrade for secure, fast,
              and profitable cryptocurrency trading. Start your journey to
              financial freedom today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-black px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Start Trading Now
              </Link>
              <Link
                to="/market"
                className="border border-gray-600 hover:border-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-gray-800"
              >
                View Markets
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose CryptoTrade?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to succeed in cryptocurrency trading, all in
              one platform
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Trading?
          </h2>
          <p className="text-xl text-black mb-8 max-w-2xl mx-auto">
            Join our community of successful traders and start building your
            crypto portfolio today
          </p>
          <Link
            to="/register"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Create Free Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
