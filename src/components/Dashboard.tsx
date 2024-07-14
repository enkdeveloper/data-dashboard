import React, { useState, useEffect } from 'react';
import { getCoinList, getTopVolumeCoins, getGlobalData, fetchData } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/Dashboard.css';
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

interface GlobalData {
  data: {
    total_market_cap: { [key: string]: number };
    total_volume: { [key: string]: number };
    market_cap_percentage: { [key: string]: number };
    active_cryptocurrencies: number;
    markets: number;
  };
}

interface FearAndGreedData {
  value: string;
  value_classification: string;
  timestamp: string;
}

interface DashboardProps {
  favorites: string[];
  setFavorites: (favorites: string[]) => void;
  setCoins: (coins: Coin[]) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ favorites, setFavorites, setCoins }) => {
  const [coins, setLocalCoins] = useState<Coin[]>([]);
  const [topVolumeCoins, setTopVolumeCoins] = useState<Coin[]>([]);
  const [globalData, setGlobalData] = useState<GlobalData | null>(null);
  const [fearAndGreed, setFearAndGreed] = useState<FearAndGreedData | null>(null);
  const [search, setSearch] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCoins = localStorage.getItem('coins');
    const storedTopVolumeCoins = localStorage.getItem('topVolumeCoins');
    const storedGlobalData = localStorage.getItem('globalData');
    const storedFearAndGreed = localStorage.getItem('fearAndGreed');

    if (storedCoins) {
      setLocalCoins(JSON.parse(storedCoins));
    } else {
      const fetchCoins = async () => {
        const coinData = await getCoinList();
        setLocalCoins(coinData);
        setCoins(coinData);
        localStorage.setItem('coins', JSON.stringify(coinData));
      };
      fetchCoins();
    }

    if (storedTopVolumeCoins) {
      setTopVolumeCoins(JSON.parse(storedTopVolumeCoins));
    } else {
      const fetchTopVolumeCoins = async () => {
        const volumeCoinData = await getTopVolumeCoins();
        setTopVolumeCoins(volumeCoinData);
        localStorage.setItem('topVolumeCoins', JSON.stringify(volumeCoinData));
      };
      fetchTopVolumeCoins();
    }

    if (storedGlobalData) {
      setGlobalData(JSON.parse(storedGlobalData));
    } else {
      const fetchGlobalData = async () => {
        const globalData = await getGlobalData();
        setGlobalData(globalData);
        localStorage.setItem('globalData', JSON.stringify(globalData));
      };
      fetchGlobalData();
    }

    if (storedFearAndGreed) {
      setFearAndGreed(JSON.parse(storedFearAndGreed));
    } else {
      const fetchFearAndGreed = async () => {
        const data = await fetchData('https://api.alternative.me/fng/?limit=1');
        setFearAndGreed(data?.data[0] || null);
        localStorage.setItem('fearAndGreed', JSON.stringify(data?.data[0] || null));
      };
      fetchFearAndGreed();
    }
  }, [setCoins]);

  const handleSearch = () => {
    const fetchCoins = async () => {
      const coinData = await getCoinList();
      const filteredCoins = coinData.filter((coin: Coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase())
      );
      setLocalCoins(filteredCoins);
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
    <div className="main-container">
      <div className="dashboard">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h1>Crypto Dashboard</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for a coin..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="stats-container">
          {globalData && (
            <div className="stats-card">
              <h2>Global Cryptocurrency</h2>
              <div>Total Market Cap: ${globalData.data.total_market_cap.usd.toLocaleString()}</div>
              <div>Total 24h Volume: ${globalData.data.total_volume.usd.toLocaleString()}</div>
              <div>Active Cryptocurrencies: {globalData.data.active_cryptocurrencies}</div>
              <div>Markets: {globalData.data.markets}</div>
            </div>
          )}
          {fearAndGreed && (
            <div className="stats-card">
              <h2>Fear and Greed Index</h2>
              <div>Value: {fearAndGreed.value}</div>
              <div>Classification: {fearAndGreed.value_classification}</div>
            </div>
          )}
        </div>
        <h2>Top Volume Coins</h2>
        <div className="carousel-container">
          <Carousel showThumbs={false} infiniteLoop useKeyboardArrows autoPlay>
            {topVolumeCoins.map((coin) => (
              <div className="carousel-item" key={coin.id}>
                <img src={coin.image} alt={coin.name} className="coin-logo" />
                <div className="coin-name">{coin.name}</div>
                <div className="coin-volume">24h Volume: ${coin.total_volume.toLocaleString()}</div>
                <div className="coin-price">Price: ${coin.current_price.toLocaleString()}</div>
                <div className="coin-market-cap">Market Cap: ${coin.market_cap.toLocaleString()}</div>
                <div className="coin-price-change">24h Change: {coin.price_change_percentage_24h}%</div>
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
          </Carousel>
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
    </div>
  );
};

export default Dashboard;
