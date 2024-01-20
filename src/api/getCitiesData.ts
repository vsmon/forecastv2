import {Locations} from '../types/types';

export default async function getCitiesData(city:string): Promise<Locations[]> {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city},,&limit=10&appid=f7e324eced811885a4c794141a933b13`,
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