import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req, _res) => {
  const city = req.body;
  // TODO: GET weather data from city name
  const weatherData = WeatherService. /*SOMETHING*/ ;
  // TODO: save city to search history
  const citySearch = HistoryService. /*SOMETHING*/ ;
});

// TODO: GET search history
router.get('/history', async (req, res) => {
  const searchHistory = HistoryService. /*SOMETHING*/ ;
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  const { id } = req.params;
  HistoryService. /*SOMETHING*/ (id) ;
});

export default router;
