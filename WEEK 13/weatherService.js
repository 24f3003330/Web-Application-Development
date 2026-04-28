import axios from 'axios';

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

const mapWeatherCode = (code) => {
  if (code === 0) return 'clear sky';
  if ([1, 2, 3].includes(code)) return 'partly cloudy';
  if ([51, 53, 55, 56, 57].includes(code)) return 'drizzle';
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'rain';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'snow';
  if ([95, 96, 99].includes(code)) return 'thunderstorm';
  return 'cloudy';
};

export const getCurrentWeather = async (city) => {
  const geoRes = await axios.get(GEOCODING_URL, {
    params: { name: city, count: 1 }
  });

  // ✅ FIX: [geoRes.data](http://geoRes.data) → geoRes.data (link artifact)
  if (!geoRes.data.results?.length) {
    throw new Error(`City "${city}" not found`);
  }

  const loc = geoRes.data.results[0]; // ✅ FIX: link artifact

  const weatherRes = await axios.get(WEATHER_URL, {
    params: {
      latitude: loc.latitude,
      longitude: loc.longitude,
      current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
      timezone: 'auto'
    }
  });

  const cur = weatherRes.data.current; // ✅ FIX: [weatherRes.data](http://...) → weatherRes.data

  // ✅ FIX 1: 'eturn' → 'return' (missing 'r')
  // ✅ FIX 2: moved `weather` property INSIDE the return object (was orphaned outside)
  return {
    name: loc.name, // ✅ FIX: [loc.name](http://loc.name) → loc.name
    coord: { lat: loc.latitude, lon: loc.longitude },
    main: {
      temp: cur.temperature_2m,
      humidity: cur.relative_humidity_2m
    },
    wind: {
      speed: (cur.wind_speed_10m * 1000 / 3600).toFixed(1)
    },
    weather: [{ description: mapWeatherCode(cur.weather_code) }] // ✅ FIX: cur.weather_code (was split by link artifact)
  };
};

export const getHistoricalWeather = async (lat, lon) => {
  const res = await axios.get(WEATHER_URL, {
    params: {
      latitude: lat,
      longitude: lon,
      hourly: 'temperature_2m',
      past_hours: 6,
      timezone: 'auto'
    }
  });

  const h = res.data.hourly; // ✅ FIX: [res.data](http://res.data) → res.data

  return h.time.slice(0, 6).map((t, i) => ({
    dt: new Date(t).getTime() / 1000,
    temp: h.temperature_2m[i]
  }));
};
