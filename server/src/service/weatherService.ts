import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

// TODO: Define an interface for the Coordinates object

interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object

class Weather {
  temp: number;
  feels_like: number;
  humidity: number;
  description: string;
  icon: string;
  constructor(temp: number, feels_like: number, humidity: number, description: string, icon: string) {
    this.temp = temp;
    this.feels_like = feels_like;
    this.humidity = humidity;
    this.description = description;
    this.icon = icon;
  }
}

// TODO: Complete the WeatherService class

class WeatherService {

  // TODO: Define the baseURL, API key, and city name properties

  private baseURL = 'https://api.openweathermap.org/data/2.5/forecast';
  private geocodingURL = 'https://api.openweathermap.org/geo/1.0/direct';
  private apiKey = process.env.OPENWEATHER_API_KEY;
  private cityName: string;

  constructor(city: string) {
    this.cityName = city;
  }

  // TODO: Create fetchLocationData method

  private async fetchLocationData(query: string): Promise<Coordinates | null> {
    try {
      const response = await axios.get(this.geocodingURL, {
        params: {
          q: this.cityName,
          appid: this.apiKey,
        },
      });
      const data = response.data;
      if (data && data.length > 0) {
        return { lat: data[0].lat, lon: data[0].lon };
      }
      return null;
    } catch (error) {
      console.error('Error fetching location data:', error);
      return null;
    }
  }  

  // TODO: Create destructureLocationData method

  private destructureLocationData(locationData: Coordinates): Coordinates {
    return {
      lat: locationData.lat,
      lon: locationData.lon,
    };
  }
  // TODO: Create buildGeocodeQuery method

  private buildGeocodeQuery(): string {
    return `${this.geocodingURL}?q=${this.cityName}&appid=${this.apiKey}`;
  }

  // TODO: Create buildWeatherQuery method

  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=metric`;
  }

  // TODO: Create fetchAndDestructureLocationData method

  private async fetchAndDestructureLocationData() {
    const locationData = await this.fetchLocationData(this.cityName);
    if (locationData) {
      return this.destructureLocationData(locationData);
    }
    return null;
  }

  // TODO: Create fetchWeatherData method
  
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    try {
      const response = await axios.get(this.buildWeatherQuery(coordinates));
      return response.data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw new Error('Failed to fetch weather data');
    }
  }

  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
}

export default new WeatherService();
