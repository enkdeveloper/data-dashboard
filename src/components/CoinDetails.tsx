import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCoinDetails } from '../services/apiService';
import '../styles/CoinDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

interface CoinDetails {
  id: string;
  symbol: string;
  name: string;
  image: {
    large: string;
  };
  market_data: {
    current_price: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
    total_volume: {
      usd: number;
    };
    high_24h: {
      usd: number;
    };
    low_24h: {
      usd: number;
    };
    price_change_percentage_24h: number;
  };
  description: {
    en: string;
  };
  genesis_date: string;
  hashing_algorithm: string;
  links: {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    subreddit_url: string;
    twitter_screen_name: string;
    facebook_username: string;
    bitcointalk_thread_identifier: string;
  };
}

const CoinDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [coinDetails, setCoinDetails] = useState<CoinDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoinDetails = async () => {
      if (id) {
        try {
          const details = await getCoinDetails(id);
          console.log('Fetched Coin Details:', details); 
          setCoinDetails(details);
        } catch (error) {
          console.error('Error fetching coin details:', error);
          setError(true);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCoinDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !coinDetails) {
    return <div>Error loading coin details.</div>;
  }

  const {
    image,
    name,
    description,
    market_data,
    genesis_date,
    hashing_algorithm,
    links,
  } = coinDetails;

  return (
    <div className="coin-details">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </button>
      <div className="details-container">
        <div className="content">
          <img src={image.large} alt={name} className="coin-logo" />
          <h1>{name}</h1>
          {description.en && <p>{description.en}</p>}
          <div className="coin-stats">
            {market_data?.current_price?.usd && <div>Price: ${market_data.current_price.usd}</div>}
            {market_data?.market_cap?.usd && <div>Market Cap: ${market_data.market_cap.usd}</div>}
            {market_data?.total_volume?.usd && <div>24h Volume: ${market_data.total_volume.usd}</div>}
            {market_data?.high_24h?.usd && <div>24h High: ${market_data.high_24h.usd}</div>}
            {market_data?.low_24h?.usd && <div>24h Low: ${market_data.low_24h.usd}</div>}
            {market_data?.price_change_percentage_24h && (
              <div>Price Change (24h): {market_data.price_change_percentage_24h}%</div>
            )}
            {genesis_date && <div>Genesis Date: {genesis_date}</div>}
            {hashing_algorithm && <div>Hashing Algorithm: {hashing_algorithm}</div>}
            {links?.homepage?.[0] && (
              <div>
                Homepage: <a href={links.homepage[0]} target="_blank" rel="noopener noreferrer">{links.homepage[0]}</a>
              </div>
            )}
            {links?.blockchain_site?.[0] && (
              <div>
                Blockchain Site: <a href={links.blockchain_site[0]} target="_blank" rel="noopener noreferrer">{links.blockchain_site[0]}</a>
              </div>
            )}
            {links?.official_forum_url?.[0] && (
              <div>
                Forum: <a href={links.official_forum_url[0]} target="_blank" rel="noopener noreferrer">{links.official_forum_url[0]}</a>
              </div>
            )}
            {links?.subreddit_url && (
              <div>
                Subreddit: <a href={links.subreddit_url} target="_blank" rel="noopener noreferrer">{links.subreddit_url}</a>
              </div>
            )}
            {links?.twitter_screen_name && (
              <div>
                Twitter: <a href={`https://twitter.com/${links.twitter_screen_name}`} target="_blank" rel="noopener noreferrer">{links.twitter_screen_name}</a>
              </div>
            )}
            {links?.facebook_username && (
              <div>
                Facebook: <a href={`https://www.facebook.com/${links.facebook_username}`} target="_blank" rel="noopener noreferrer">{links.facebook_username}</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinDetails;
