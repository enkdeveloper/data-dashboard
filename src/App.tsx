import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Explorer from './components/Explorer';
import Favorites from './components/Favorites';
import CoinDetails from './components/CoinDetails';
import './styles/App.css';

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

const App: React.FC = () => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [coins, setCoins] = useState<Coin[]>(() => {
    const saved = localStorage.getItem('coins');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('coins', JSON.stringify(coins));
  }, [coins]);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/dashboard" element={<Dashboard favorites={favorites} setFavorites={setFavorites} setCoins={setCoins} />} />
          <Route path="/explorer" element={<Explorer favorites={favorites} setFavorites={setFavorites} />} />
          <Route path="/favorites" element={<Favorites favorites={favorites} coins={coins} />} />
          <Route path="/coin/:id" element={<CoinDetails />} />
          <Route path="/" element={<Dashboard favorites={favorites} setFavorites={setFavorites} setCoins={setCoins} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
