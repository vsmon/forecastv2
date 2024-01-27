import {Locations} from '../types/types';

export default async function getCityByCoords(lat:number,lon:number): Promise<Locations[]> {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=f7e324eced811885a4c794141a933b13`,
      );
      const json: Locations[] = await response.json();

      if(json === null){
        throw new Error("Erro ao obter cidades");        
      }
      return Promise.resolve<Locations[]>(json)
    } catch (error: any) {
      console.log('CATCH==========', error);
      return Promise.resolve(error)
    }
  }