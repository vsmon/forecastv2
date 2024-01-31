import {ILocations} from '../types/types';
import {OPENWEATHERMAPTOKEN} from '@env'


export default async function getCityByCoords(lat:number,lon:number): Promise<ILocations[]> {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${OPENWEATHERMAPTOKEN}`,
      );
      
      const json: ILocations[] = await response.json();

      if(json === null){
        throw new Error("Error gettting city by coords");        
      }

      if(!response.ok){
        console.log('Error gettting city by coords==========', json);   
        return Promise.resolve<ILocations[]>([])
      }

      return Promise.resolve<ILocations[]>(json)
    } catch (error: any) {
      console.log('CATCH==========', error);
      return Promise.resolve(error)
    }
  }