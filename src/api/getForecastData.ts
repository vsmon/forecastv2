
import {Locations} from '../types/types';
import seed from '../../seed.json'
import seed2 from '../../seed2.json'

export default async function getForecastData(city:Locations): Promise<any> {
    const {lat,lon} = city
    const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&exclude=minutely&appid=f7e324eced811885a4c794141a933b13`
    console.log('URL=============', URL)
    try {
      const response = await fetch(URL
        ,{method:'GET', headers:{Accept:'application/json', 'Content-Type': 'application/json'}}
      );
      const json: Locations[] = await response.json();
      //console.log('FETCH===========', json)
      return Promise.resolve(json)

      const seedForecast = seed2
      return Promise.resolve({...seedForecast, city})
    } catch (error) {
      console.log('CATCH==========', error);
    }
  }