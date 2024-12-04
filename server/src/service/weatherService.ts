import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

// Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// Define a class for the Weather object
class Weather {
  tempF: number;
  feels_like: number;
  humidity: number;
  iconDescription: string;
  icon: string;
  date: string;
  city: string;
  windSpeed: number;

  constructor(
    tempF: number,
    feels_like: number,
    humidity: number,
    iconDescription: string,
    icon: string,
    date: string,
    city: string,
    windSpeed: number
  ) {
    this.tempF = tempF;
    this.feels_like = feels_like;
    this.humidity = humidity;
    this.iconDescription = iconDescription;
    this.icon = icon;
    this.date = date;
    this.city = city;
    this.windSpeed = windSpeed;
  }
}

// Complete the WeatherService class
class WeatherService {
  private baseURL = 'https://api.openweathermap.org/data/2.5/forecast';
  private geocodingURL = 'https://api.openweathermap.org/geo/1.0/direct';
  private apiKey = process.env.OPENWEATHER_API_KEY;
  private cityName: string;

  constructor(cityName: string = '') {
    this.cityName = cityName;
  }

  // Create fetchLocationData method
  private async fetchLocationData(query: string): Promise<Coordinates | null> {
    try {
      const response = await axios.get(this.geocodingURL, {
        params: {
          q: query,
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

  // Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    return {
      lat: locationData.lat,
      lon: locationData.lon,
    };
  }

  // Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `${this.geocodingURL}?q=${this.cityName}&appid=${this.apiKey}`;
  }

  // Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=metric`;
  }

  // Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(): Promise<Coordinates | null> {
    console.log(this.buildGeocodeQuery());
    const locationData = await this.fetchLocationData(this.cityName);
    if (locationData) {
      return this.destructureLocationData(locationData);
    }
    return null;
  }

  // Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    try {
      const response = await axios.get(this.buildWeatherQuery(coordinates));
      return response.data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw new Error('Failed to fetch weather data');
    }
  }

  // Build parseCurrentWeather method
  private convertCelsiusToFahrenheit(tempC: number): number {
    return Math.round((tempC * 9) / 5 + 32);
  }

  private parseCurrentWeather(response: any): Weather {
    const { name: city } = response.city;
    const { dt, main, weather, wind } = response.list[0];

    return new Weather(
      this.convertCelsiusToFahrenheit(main.temp),
      this.convertCelsiusToFahrenheit(main.feels_like),
      main.humidity,
      weather[0].description,
      weather[0].icon,
      new Date(dt * 1000).toLocaleDateString(),
      city,
      wind.speed
    );
  }

  // Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, forecastList: any[]): Weather[] {
    const forecastArray: Weather[] = [currentWeather];

    const additionalForecasts = forecastList.slice(1, 6).map((forecast) => {
      const { dt, main, weather, wind } = forecast;
      return new Weather(
        this.convertCelsiusToFahrenheit(main.temp),
        this.convertCelsiusToFahrenheit(main.feels_like),
        main.humidity,
        weather[0].description,
        weather[0].icon,
        new Date(dt * 1000).toLocaleDateString(),
        '',
        wind.speed
      );
    });
    return forecastArray.concat(additionalForecasts);
  }

  // Complete getWeatherForCity method
  async getWeatherForCity(city: string): Promise<{ current: Weather; forecast: Weather[] } | null> {
    try {
      this.cityName = city;
      const coordinates = await this.fetchAndDestructureLocationData();
      if (!coordinates) {
        return null;
      }
      const weatherData = await this.fetchWeatherData(coordinates);
      const currentWeather = this.parseCurrentWeather(weatherData);
      const forecastList = this.buildForecastArray(currentWeather, weatherData.list);
      return {
        current: currentWeather,
        forecast: forecastList,
      };
    } catch (error) {
      console.error('Error getting weather for city:', error);
      return null;
    }
  }
}

export default new WeatherService();
