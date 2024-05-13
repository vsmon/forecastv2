
import { NativeModules } from 'react-native';
import {IForecastData, ILocations} from '../types/types';
import seed from '../../seed.json'
import seed2 from '../../seed2.json'
import {OPENWEATHERMAPTOKEN} from '@env'
import Language from '../utils/language';
import TOKEN_OPENWEATHER from './token.js'

export default async function getForecastData(city:ILocations): Promise<any> {
    const {lat,lon} = city
    const language = Language()
    const units = language === 'en_US' ? 'imperial' : 'metric'
    const URL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=${units}&lang=${language}&exclude=minutely&appid=${TOKEN_OPENWEATHER}`
    try {
      const response = await fetch(URL
        ,{method:'GET', headers:{Accept:'application/json', 'Content-Type': 'application/json'}}
      );
      const json: IForecastData[] = await response.json();

      if(json === null){
        throw new Error("Error getting forecast data");        
      }

      if(!response.ok){
        console.log('Error getting forecast data==========', json);   
        return Promise.resolve<IForecastData[]>([])
      }
      return Promise.resolve(json)



      /* For testing */
      const seedForecast = seed

      return Promise.resolve({...seedForecast, city, current:{...seedForecast.current,dt:(+new Date() / 1000 ) + seedForecast.timezone_offset }})
    } catch (error) {
      console.log('CATCH==========', error);
    }
  }