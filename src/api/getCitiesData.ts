import {ILocations} from '../types/types';
import {OPENWEATHERMAPTOKEN} from '@env'
import TOKEN_OPENWEATHER from './token.js'

export default async function getCitiesData(cityName:string): Promise<ILocations[]> {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName},,&limit=10&appid=${TOKEN_OPENWEATHER}`,
      );
      const json: ILocations[] = await response.json();

      if(json === null){
        throw new Error("Erro getting city data");        
      }

      if(!response.ok){
        console.log('Error getting city data==========', json);
        return Promise.resolve<ILocations[]>([])
      }

      return Promise.resolve<ILocations[]>(json)
    } catch (error: any) {
      console.log('CATCH==========', error);
      return Promise.resolve(error)
    }
  }