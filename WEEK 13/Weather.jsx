import React, { useState, useEffect } from 'react';
import { getCurrentWeather, getHistoricalWeather } from '../services/weatherService';
import { Line } from 'react-chartjs-2';

// ✅ FIX: Register required Chart.js components (without this the chart renders blank)
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Weather = () => {
  const [city, setCity] = useState('Singapore');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);

  const fetchWeather = async (cityName) => {
    const current = await getCurrentWeather(cityName);
    setCurrentWeather(current);
    const { lat, lon } = current.coord;
    const historical = await getHistoricalWeather(lat, lon);
    setHistoricalData(historical);
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const chartData = {
    // ✅ FIX: [historicalData.map](http://...) → historicalData.map (link artifact × 2)
    labels: historicalData.map((d) => new Date(d.dt * 1000).toLocaleTimeString()),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: historicalData.map((d) => d.temp),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3,
      },
    ],
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Weather App</h1>

      {/* City search input */}
      <div style={{ display: 'flex', gap: 8, marginBottom: '1rem' }}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          style={{ flex: 1, padding: '0.5rem', fontSize: '1rem' }}
        />
        <button onClick={() => fetchWeather(city)} style={{ padding: '0.5rem 1rem' }}>
          Search
        </button>
      </div>

      {currentWeather && (
        <div style={{ marginBottom: '1rem' }}>
          {/* ✅ FIX: [currentWeather.name](http://...) → currentWeather.name */}
          <h2>{currentWeather.name}</h2>
          <p>{currentWeather.main.temp} °C</p>
          <p>{currentWeather.weather[0].description}</p>
          <p>Humidity: {currentWeather.main.humidity}%</p>
          <p>Wind: {currentWeather.wind.speed} m/s</p>
        </div>
      )}

      {historicalData.length > 0 && <Line data={chartData} />}
    </div>
  );
};

export default Weather;
