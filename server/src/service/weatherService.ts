import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object

interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object

class Weather {
  temperature: number;
  humidity: number;
  windSpeed: number;

  constructor(temperature: number, humidity: number, windSpeed: number) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.windSpeed = windSpeed;
  }
}

// TODO: Complete the WeatherService class

class WeatherService {

  // TODO: Define the baseURL, API key, and city name properties

  baseURL: string = "api.openweathermap.org";
  appid: string = process.env.API_KEY || "";
  city: string = "";

  // TODO: Create fetchLocationData method
  
  private async fetchLocationData(query: string): Promise<any> {
    const response = await fetch(this.buildGeocodeQuery(query));
    const data = await response.json();
    return data;
  }

  // TODO: Create destructureLocationData method

  private destructureLocationData(locationData: Coordinates): Coordinates {
    const { lat, lon } = locationData;
    return { lat, lon }
  }

  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(query: string): string {
    query = `${this.baseURL}/geo/1.0/direct?q=${this.city},{state code},{country code}&limit={limit}&appid=${process.env.API_KEY}`;
    return query;
  }

  // TODO: Create buildWeatherQuery method
// VERY BROKEN AS WELL
  private buildWeatherQuery(coordinates: Coordinates): string {
    const { lat, lon } = coordinates
    return `${this.baseURL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`
  }

  // TODO: Create fetchAndDestructureLocationData method

  private async fetchAndDestructureLocationData(query: string): Promise<Coordinates> {
    const response = await this.fetchLocationData(query);
    return this.destructureLocationData(response);
  }

  // TODO: Create fetchWeatherData method

  private async fetchWeatherData(coordinates: Coordinates) {
    const response = this.buildWeatherQuery(coordinates);
    const data = await fetch(response);
    return await data.json();
  }

  // TODO: Build parseCurrentWeather method

  private parseCurrentWeather(response: any): Weather {
    const { temperature, humidity, windSpeed } = response.Weather;
    return new Weather(temperature, humidity, windSpeed);
  }

  // TODO: Complete buildForecastArray method

  private buildForecastArray(currentWeather: Weather, weatherData: any[]): any[] {
    return [currentWeather, ...weatherData]; /*weatherData.map*/
  }

  // TODO: Complete getWeatherForCity method

  async getWeatherForCity(city: string) {
    const coordinates = await this.fetchAndDestructureLocationData(city);
    const response = await this.fetchWeatherData(coordinates);
    const data = this.parseCurrentWeather(response);
    return data;
  }
}

export default new WeatherService();