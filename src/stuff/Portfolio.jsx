import { useState, useEffect } from 'react';

const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState({
    totalValue: 0,
    totalGain: 0,
    gainPercentage: 0,
    assets: []
  });
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState('holdings');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolioData();
    fetchTransactions();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://cryptobackend-1r20.onrender.com/api/portfolio', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setPortfolioData(data);
      }
    } catch {
      // Mock fallback
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://cryptobackend-1r20.onrender.com/api/transactions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
      }
    } catch {
      // Mock fallback
    }
  };

  const formatDate = (dateString) =>
    dateString
      ? new Date(dateString).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      : '';

  const getTotalGainLoss = (asset) => {
    const currentPrice = asset.currentPrice ?? 0;
    const avgPrice = asset.avgPrice ?? 1; // prevent divide by zero
    const amount = asset.amount ?? 0;

    const gainLoss = (currentPrice - avgPrice) * amount;
    const gainLossPercentage = ((currentPrice - avgPrice) / avgPrice) * 100;
    return { gainLoss, gainLossPercentage };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="flex items-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-3"></div>
          <span className="text-gray-400">Loading portfolio data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Portfolio</h1>
          <p className="text-gray-400">Manage and track your cryptocurrency investments</p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 animate-slide-up hover:-translate-y-1 hover:shadow-lg transition">
            <h3 className="text-gray-400 text-sm mb-2">Total Value</h3>
            <p className="text-3xl font-bold text-white">
              ${(portfolioData.totalValue ?? 0).toLocaleString()}
            </p>
            <p
              className={`text-sm ${
                (portfolioData.gainPercentage ?? 0) > 0 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {(portfolioData.gainPercentage ?? 0) > 0 ? '↗' : '↘'}{' '}
              {(portfolioData.gainPercentage ?? 0).toFixed(2)}%
            </p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 animate-slide-up hover:-translate-y-1 hover:shadow-lg transition delay-100">
            <h3 className="text-gray-400 text-sm mb-2">Total Gain/Loss</h3>
            <p
              className={`text-3xl font-bold ${
                (portfolioData.totalGain ?? 0) > 0 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {(portfolioData.totalGain ?? 0) > 0 ? '+' : ''}$
              {(portfolioData.totalGain ?? 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 animate-slide-up hover:-translate-y-1 hover:shadow-lg transition delay-200">
            <h3 className="text-gray-400 text-sm mb-2">Active Assets</h3>
            <p className="text-3xl font-bold text-white">
              {portfolioData.assets?.length ?? 0}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden animate-slide-up">
          <div className="flex border-b border-gray-700">
            {['holdings', 'transactions'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-6 py-4 font-medium transition ${
                  activeTab === tab
                    ? 'bg-gray-900 text-blue-500 border-b-2 border-blue-500'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Holdings */}
          {activeTab === 'holdings' && (
            <div className="p-6 space-y-4">
              {portfolioData.assets?.length === 0 ? (
                <p className="text-center text-gray-400">No holdings yet. Start trading!</p>
              ) : (
                portfolioData.assets.map((asset, index) => {
                  const { gainLoss, gainLossPercentage } = getTotalGainLoss(asset);
                  return (
                    <div
                      key={index}
                      className="bg-gray-900 rounded-lg p-6 animate-slide-up"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">{asset.symbol}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-white">{asset.name}</p>
                            <p className="text-gray-400 text-sm">
                              {asset.amount ?? 0} {asset.symbol}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Current Price</p>
                          <p className="font-semibold text-white">
                            ${(asset.currentPrice ?? 0).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Value</p>
                          <p className="font-semibold text-white">
                            ${(asset.value ?? 0).toLocaleString()}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {asset.allocation ?? 0}% of portfolio
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Gain/Loss</p>
                          <p
                            className={`font-semibold ${
                              gainLoss > 0 ? 'text-green-500' : 'text-red-500'
                            }`}
                          >
                            {gainLoss > 0 ? '+' : ''}$
                            {Math.abs(gainLoss ?? 0).toLocaleString()}
                          </p>
                          <p
                            className={`text-sm ${
                              gainLossPercentage > 0 ? 'text-green-500' : 'text-red-500'
                            }`}
                          >
                            {gainLossPercentage > 0 ? '+' : ''}
                            {(gainLossPercentage ?? 0).toFixed(2)}%
                          </p>
                        </div>
                        <div className="flex space-x-2 justify-center lg:justify-end">
                          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm">
                            Buy
                          </button>
                          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm">
                            Sell
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* Transactions */}
          {activeTab === 'transactions' && (
            <div className="p-6 overflow-x-auto">
              {transactions?.length === 0 ? (
                <p className="text-center text-gray-400">No transactions yet.</p>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      {[
                        'Date',
                        'Type',
                        'Asset',
                        'Amount',
                        'Price',
                        'Fee',
                        'Total',
                        'Status',
                      ].map((h) => (
                        <th
                          key={h}
                          className="py-3 text-left text-gray-400 font-medium"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx, i) => (
                      <tr
                        key={tx.id ?? i}
                        className="border-b border-gray-700 hover:bg-gray-900/50 transition animate-slide-up"
                      >
                        <td className="py-3 text-white text-sm">
                          {formatDate(tx.date)}
                        </td>
                        <td>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              tx.type === 'buy'
                                ? 'bg-green-500/20 text-green-500'
                                : 'bg-red-500/20 text-red-500'
                            }`}
                          >
                            {tx.type?.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 text-white font-medium">{tx.symbol}</td>
                        <td className="py-3 text-white text-right">
                          {tx.amount ?? 0} {tx.symbol}
                        </td>
                        <td className="py-3 text-white text-right">
                          ${(tx.price ?? 0).toLocaleString()}
                        </td>
                        <td className="py-3 text-gray-400 text-right">
                          ${(tx.fee ?? 0).toLocaleString()}
                        </td>
                        <td className="py-3 text-white font-medium text-right">
                          ${(tx.total ?? 0).toLocaleString()}
                        </td>
                        <td className="py-3 text-center">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              tx.status === 'completed'
                                ? 'bg-green-500/20 text-green-500'
                                : 'bg-yellow-500/20 text-yellow-400'
                            }`}
                          >
                            {tx.status ?? 'pending'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
