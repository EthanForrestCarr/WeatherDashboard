import { Router, Request, Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data

router.post('/', async (req: Request, res: Response) => {
  try {

  // TODO: GET weather data from city name

  const { city } = req.body;
  if (!city) {
    return res.status(400).json({ message: 'City name is required' });
  }
  const weatherData = await WeatherService.getWeatherForCity(city);
  if (!weatherData) {
    return res.status(404).json({ message: 'City not found' });
  }

  // TODO: save city to search history

  await HistoryService.addCity(city);
  res.json(weatherData);
} catch (error) {
  console.error('Error getting weather data:', error);
  res.status(500).json({ message: 'Failed to get weather data' });
}
return res.status(200).json({ message: 'Success' });
});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const history = await HistoryService.getCities();
    res.json(history);
  } catch (error) {
    console.error('Error retrieving search history:', error);
    res.status(500).json({ error: 'An error occurred while fetching search history.' });
  }
});

// * BONUS TODO: DELETE city from search history
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
