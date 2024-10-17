import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req, _res) => {
  const city = req.body;
  // TODO: GET weather data from city name
  router.get('/weather/:city', async (req, res) => {
    try {
      const city = req.params.city;
      const cityCode = await WeatherService.getWeatherForCity(city);
      if (typeof events === 'string') {
        res.status(404).json({ message: 'No events found' });
      } else {
        res.json(events);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  // TODO: save city to search history
  router.get('/:city', async (req, res) => {
    try {
      const city: string = req.params.city;
      const data = await HistoryService.getWeatherForCity(city);
      await HistoryService.addCity(city);
      res.json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
});

// TODO: GET search history
router.get('/', async (_req, res) => {
  try {
    const savedCities = await HistoryService.getCities();
    res.json(savedCities);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/:id', async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ msg: 'City id is required' });
    }
    await HistoryService.removeCity(req.params.id);
    res.json({ success: 'City successfully removed from search history' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export default router;
