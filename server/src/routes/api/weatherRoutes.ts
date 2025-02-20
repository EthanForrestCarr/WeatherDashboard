import { Router, Request, Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  try {
    const { cityName } = req.body;
    if (!cityName) {
      return res.status(400).json({ message: 'City name is required' });
    }
    const weatherData = await WeatherService.getWeatherForCity(cityName);
    if (!weatherData) {
      return res.status(404).json({ message: 'City not found' });
    }
    await HistoryService.addCity(cityName);
    res.json({ current: weatherData.current, forecast: weatherData.forecast });
  } catch (error) {
    console.error('Error getting weather data:', error);
    res.status(500).json({ message: 'Failed to get weather data' });
  }
  return;
});

// GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const history = await HistoryService.getCities();
    res.json(history);
  } catch (error) {
    console.error('Error retrieving search history:', error);
    res.status(500).json({ error: 'An error occurred while fetching search history.' });
  }
});

// DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await HistoryService.removeCity(id);
    res.status(200).json({ message: `Successfully removed city with ID: ${id} from search history.` });
  } catch (error) {
    console.error('Error deleting city from search history:', error);
    res.status(500).json({ error: 'An error occurred while deleting the city from search history.' });
  }
});

export default router;
