import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data

router.post('/', async (req, res) => {
  const { city } = req.body;
  if (!city) {
    return res.status(400).json({ message: 'City name is required' });
  }
  try {
    const weatherData = await WeatherService.getWeatherForCity(city);
    await HistoryService.addCity(city);
    return res.json(weatherData);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// TODO: GET weather data from city name

router.get('/weather/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const weatherData = await WeatherService.getWeatherForCity(city);
    res.json(weatherData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// TODO: save city to search history

router.get('/:city', async (req, res) => {
  try {
    const city: string = req.params.city;
    const weatherData = await WeatherService.getWeatherForCity(city);
    await HistoryService.addCity(city);
    res.json(weatherData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to fetch weather data or save city to history.' });
  }
});

// TODO: GET search history

router.get('/', async (_req, res) => {
  try {
    const savedCities = await HistoryService.getCities();
    res.json(savedCities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve search history' });
  }
});

// * BONUS TODO: DELETE city from search history

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'City id is required' });
    }
    await HistoryService.removeCity(id);
    return res.json({ message: 'City removed from search history' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to remove city from search history' });
  }
});

export default router;