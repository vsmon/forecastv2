import {Locations} from '../types/types';

export default async function getCitiesData(city:string): Promise<Locations[]|undefined> {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city},,&limit=5&appid=f7e324eced811885a4c794141a933b13`,
      );
      const json: Locations[] = await response.json();
      return Promise.resolve(json)
    } catch (error) {
      console.log('CATCH==========', error);
    }
  }