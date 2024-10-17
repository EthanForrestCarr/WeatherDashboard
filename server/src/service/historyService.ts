// TODO: Define a City class with name and id properties

import { fstat } from "fs";

class City {
  name: string;
  id: string;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}

// TODO: Complete the HistoryService class

class HistoryService {

  // TODO: Define a read method that reads from the searchHistory.json file

  private async read() {
    const response = await fs.readFile(path.join(__dirname, 'searchHistory.json'), 'utf-8');
    return JSON.parse(response);
  }

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    const response = await path.join(__dirname, 'searchHistory.json')
    const data = await /*something*/
    return JSON.parse(data)
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    const response = await path.join(__dirname, 'searchHistory.json')
    const data = await /*something*/
    return JSON.parse(data)
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    const response = await path.join(__dirname, 'searchHistory.json')
    const data = await /*something*/
    return JSON.parse(data)
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    await
  }
}

export default new HistoryService();