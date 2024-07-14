import React, { useState, useEffect } from 'react';
import { getCoinList } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import '../styles/Explorer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
}

interface ExplorerProps {
  favorites: string[];
  setFavorites: (favorites: string[]) => void;
}

const Explorer: React.FC<ExplorerProps> = ({ favorites, setFavorites }) => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [search, setSearch] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoins = async () => {
      const coinData = await getCoinList();
      setCoins(coinData);
    };

    fetchCoins();
  }, []);

  const handleSearch = () => {
    const fetchCoins = async () => {
      const coinData = await getCoinList();
      const filteredCoins = coinData.filter((coin: Coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase())
      );
      setCoins(filteredCoins);
    };

    fetchCoins();
  };

  const showMoreCoins = () => {
    setVisibleCount(visibleCount + 6);
  };

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const navigateToDetails = (id: string) => {
    navigate(`/coin/${id}`);
  };

  return (
    <div className="explorer">
      <img src="/logo.png" alt="Logo" className="logo" />
      <h1>Crypto Explorer</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a coin..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="coin-list">
        {coins.slice(0, visibleCount).map((coin) => (
          <div className="coin-card" key={coin.id}>
            <img src={coin.image} alt={coin.name} className="coin-logo" />
            <div className="coin-name">{coin.name}</div>
            <div className="coin-price">Price: ${coin.current_price.toLocaleString()}</div>
            <div className="coin-market-cap">Market Cap: ${coin.market_cap.toLocaleString()}</div>
            <div className="coin-volume">24h Volume: ${coin.total_volume.toLocaleString()}</div>
            <div className="coin-high">24h High: ${coin.high_24h.toLocaleString()}</div>
            <div className="coin-low">24h Low: ${coin.low_24h.toLocaleString()}</div>
            <div className="coin-buttons">
              <button className="favorite-button" onClick={() => toggleFavorite(coin.id)}>
                <FontAwesomeIcon icon={favorites.includes(coin.id) ? solidHeart : regularHeart} />
              </button>
              <button className="details-button" onClick={() => navigateToDetails(coin.id)}>
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {visibleCount < coins.length && (
        <button className="more-button" onClick={showMoreCoins}>More...</button>
      )}
    </div>
  );
};

export default Explorer;
