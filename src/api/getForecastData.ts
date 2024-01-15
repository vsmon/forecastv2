
import {Locations} from '../types/types';

export default async function getForecastData(city:Locations): Promise<Locations[]|undefined> {
    const {lat,lon} = city
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&exclude=minutely&appid=f7e324eced811885a4c794141a933b13`,
      );
      const json: Locations[] = await response.json();
      return Promise.resolve(json)
    } catch (error) {
      console.log('CATCH==========', error);
    }
  }