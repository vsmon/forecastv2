
import {IForecastData, ILocations} from '../types/types';
import seed from '../../seed.json'
import seed2 from '../../seed2.json'
import {OPENWEATHERMAPTOKEN} from '@env'


export default async function getForecastData(city:ILocations): Promise<any> {
    const {lat,lon} = city
    const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&exclude=minutely&appid=${OPENWEATHERMAPTOKEN}`
    
    try {
      const response = await fetch(URL
        ,{method:'GET', headers:{Accept:'application/json', 'Content-Type': 'application/json'}}
      );
      const json: IForecastData[] = await response.json();

      if(json === null){
        throw new Error("Error gettting forecast data");        
      }

      if(!response.ok){
        console.log('Error getting forecast data==========', json);   
        return Promise.resolve<IForecastData[]>([])
      }
      return Promise.resolve(json)

      const seedForecast = seed
      return Promise.resolve({...seedForecast, city})
    } catch (error) {
      console.log('CATCH==========', error);
    }
  }