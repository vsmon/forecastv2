import {ILocations} from '../types/types';
import {OPENWEATHERMAPTOKEN} from '@env'
import TOKEN_OPENWEATHER from './token.js'

export default async function getCityByCoords(lat:number,lon:number): Promise<ILocations[]> {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${TOKEN_OPENWEATHER}`,
      );
      
      const json: ILocations[] = await response.json();

      if(json === null){
        throw new Error("Error getting city by coords");        
      }

      if(!response.ok){
        console.log('Error getting city by coords==========', json);   
        return Promise.resolve<ILocations[]>([])
      }

      return Promise.resolve<ILocations[]>(json)
    } catch (error: any) {
      console.log('CATCH==========', error);
      return Promise.resolve(error)
    }
  }