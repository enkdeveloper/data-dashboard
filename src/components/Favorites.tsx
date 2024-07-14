import React from 'react';
import '../styles/Favorites.css';

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

interface FavoritesProps {
  favorites: string[];
  coins: Coin[];
}

const Favorites: React.FC<FavoritesProps> = ({ favorites, coins }) => {
  const favoriteCoins = coins.filter(coin => favorites.includes(coin.id));

  return (
    <div className="favorites">
      <h1>Favorites</h1>
      <div className="coin-list">
        {favoriteCoins.map((coin) => (
          <div className="coin-card" key={coin.id}>
            <img src={coin.image} alt={coin.name} className="coin-logo" />
            <div className="coin-name">{coin.name}</div>
            <div className="coin-price">Price: ${coin.current_price.toLocaleString()}</div>
            <div className="coin-market-cap">Market Cap: ${coin.market_cap.toLocaleString()}</div>
            <div className="coin-volume">24h Volume: ${coin.total_volume.toLocaleString()}</div>
            <div className="coin-high">24h High: ${coin.high_24h.toLocaleString()}</div>
            <div className="coin-low">24h Low: ${coin.low_24h.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
