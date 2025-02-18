import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  const city = req.body.cityName
  // TODO: GET weather data from city name
  try {
    
    const weather = new WeatherService(city);
    const weatherData = await weather.getWeatherForCity();
    
    
    res.send(weatherData);

    
    HistoryService.addCity(city);
    
  } catch (error) {
    
    console.error(error);
    res.status(500).json({ message: 'An error occurred while processing the request' });
  }
});

// TODO: GET search history
router.get('/history', async (_req, res) => {
  const cities = await HistoryService.getCities()
  res.send(cities)
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  HistoryService.removeCity(req.params.id)
  res.send(`search deleted`)
});

export default router;