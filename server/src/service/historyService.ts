// TODO: Define a City class with name and id properties

class City {
  name:
  id:
}

// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {
    const filePath = path.join(__dirname, 'searchHistory.json')
    const data = await /* file reading thingamabob */
    return JSON.parse(data)
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    const filePath = path.join(__dirname, 'searchHistory.json')
    await
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    await
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    await
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    await
  }
}

export default new HistoryService();