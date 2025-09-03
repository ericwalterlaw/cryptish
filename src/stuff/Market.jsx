import { useState, useEffect } from 'react';

const Market = () => {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('market_cap');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    fetchCryptocurrencies();
    // Refresh every 60s
    const interval = setInterval(fetchCryptocurrencies, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchCryptocurrencies = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'
      );
      const data = await res.json();

      setCryptocurrencies(data);
    } catch (error) {
      console.error('Error fetching cryptocurrency data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedCryptos = cryptocurrencies
    .filter(crypto =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      return sortOrder === 'asc'
        ? aValue > bValue ? 1 : -1
        : aValue < bValue ? 1 : -1;
    });

  const formatPrice = (price) => {
    if (price >= 1) {
      return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else {
      return `$${price.toFixed(6)}`;
    }
  };

  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
    return `$${marketCap.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-white mb-2">Cryptocurrency Market</h1>
          <p className="text-gray-400">Live prices and market data for top cryptocurrencies</p>
        </div>

        {/* Search + Filter */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-8 animate-slide-up">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search cryptocurrencies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all"
              >
                <option value="market_cap_rank">Rank</option>
                <option value="current_price">Price</option>
                <option value="market_cap">Market Cap</option>
                <option value="price_change_percentage_24h">24h Change</option>
                <option value="total_volume">Volume</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
        </div>

        {/* Market Data Table */}
        {loading ? (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 text-center animate-slide-up">
            <div className="flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-3"></div>
              <span className="text-gray-400">Loading market data...</span>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="text-left py-4 px-6 text-gray-400 font-medium">Rank</th>
                    <th className="text-left py-4 px-6 text-gray-400 font-medium">Name</th>
                    <th className="text-right py-4 px-6 text-gray-400 font-medium">Price</th>
                    <th className="text-right py-4 px-6 text-gray-400 font-medium">24h Change</th>
                    <th className="text-right py-4 px-6 text-gray-400 font-medium">Market Cap</th>
                    <th className="text-right py-4 px-6 text-gray-400 font-medium">Volume</th>
                    <th className="text-center py-4 px-6 text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedCryptos.map((crypto, index) => (
                    <tr
                      key={crypto.id}
                      className="border-t border-gray-700 hover:bg-gray-900/50 transition-colors animate-slide-up"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <td className="py-4 px-6 text-white font-medium">#{crypto.market_cap_rank}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <img src={crypto.image} alt={crypto.name} className="w-8 h-8 rounded-full" />
                          <div>
                            <p className="font-semibold text-white">{crypto.name}</p>
                            <p className="text-gray-400 text-sm uppercase">{crypto.symbol}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right font-semibold text-white">
                        {formatPrice(crypto.current_price)}
                      </td>
                      <td
                        className={`py-4 px-6 text-right font-medium ${
                          crypto.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'
                        }`}
                      >
                        {crypto.price_change_percentage_24h > 0 ? '+' : ''}
                        {crypto.price_change_percentage_24h?.toFixed(2)}%
                      </td>
                      <td className="py-4 px-6 text-right text-white">{formatMarketCap(crypto.market_cap)}</td>
                      <td className="py-4 px-6 text-right text-gray-400">{formatMarketCap(crypto.total_volume)}</td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex justify-center space-x-2">
                          <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                            Buy
                          </button>
                          <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                            Sell
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {filteredAndSortedCryptos.length === 0 && !loading && (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 text-center animate-slide-up">
            <p className="text-gray-400">No cryptocurrencies found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Market;
