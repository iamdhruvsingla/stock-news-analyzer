import React, { useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function StockNewsAnalyzer() {
  const [ticker, setTicker] = useState('');
  const [news, setNews] = useState([]);
  const [sentiments, setSentiments] = useState([]);
  const [price, setPrice] = useState(null);

  const handleGetInfo = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/full_info/${ticker}`);
      setNews(response.data.news);
      setSentiments(response.data.sentiments);
      setPrice(response.data.price);
    } catch (error) {
      console.error("Error fetching info:", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>📈 Stock News Analyzer</h1>
      <input 
        value={ticker}
        onChange={e => setTicker(e.target.value)}
        placeholder="Enter Stock Ticker (e.g., TSLA)"
      />
      <button onClick={handleGetInfo}>Get Info</button>

      {price !== null && (
        <div>
          <h2>💵 Current Price: ${price}</h2>
        </div>
      )}

      <div>
        <h2>📰 Latest News</h2>
        <ul>
          {news.map((article, index) => (
            <li key={index}>
              <a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
              <p>🕒 {new Date(article.publishedAt).toLocaleString()}</p>
              <p>Sentiment: {sentiments[index].label} (score: {sentiments[index].score.toFixed(2)})</p>
            </li>
          ))}
        </ul>
      </div>

      {price !== null && (
        <div>
          <h2>📊 Price Trend</h2>
          <Line
            data={{
              labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
              datasets: [
                {
                  label: `${ticker} Price`,
                  data: [price, price * 1.01, price * 0.99, price * 1.02, price * 1.005],
                  borderColor: 'rgba(75,192,192,1)',
                  fill: false,
                },
              ],
            }}
          />
        </div>
      )}
    </div>
  );
}

export default StockNewsAnalyzer;
