import express, { type Request, type Response } from 'express';
import fs from 'fs';

const app = express();

// TODO: Define a City class with name and id properties

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

    app.get('/', async (_req: Request, res: Response) => {
      try {
        const response = await fs.readFile('searchHistory.json', 'utf8');
        const data = JSON.parse(response);
        return res.status(200).json(data);
      } catch (err) {
        console.error('Error getting contacts:', err);
        return res.status(500).json({ message: 'Error getting contacts', err });
      }
    });

  };

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file

  private async write(cities: City[]) {
      return await fs.writeFile('db/db.json', JSON.stringify(cities, null, '\t'));
  }

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects

  async getCities() {
    async getStates() {
      return await this.read().then((states) => {
        let parsedStates: State[];
  
        // If states isn't an array or can't be turned into one, send back a new empty array
        try {
          parsedStates = [].concat(JSON.parse(states));
        } catch (err) {
          parsedStates = [];
        }
  
        return parsedStates;
      });
    }
  }

  // TODO Define an addCity method that adds a city to the searchHistory.json file

  async addCity(city: string) {
    async addState(state: string) {
      if (!state) {
        throw new Error('state cannot be blank');
      }
  
      // Add a unique id to the state using uuid package
      const newState: State = { name: state, id: uuidv4() };
  
      // Get all cities, add the new city, write all the updated cities, return the newCity
      return await this.getStates()
        .then((states) => {
          if (states.find((index) => index.name === state)) {
            return states;
          }
          return [...states, newState];
        })
        .then((updatedStates) => this.write(updatedStates))
        .then(() => newState);
    }
  }

  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file

  async removeCity(id: string) {
    async removeState(id: string) {
      return await this.getStates()
        .then((states) => states.filter((state) => state.id !== id))
        .then((filteredStates) => this.write(filteredStates));
    }
  }
}

export default new HistoryService();