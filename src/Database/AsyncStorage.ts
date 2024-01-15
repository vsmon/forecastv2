import AsyncStorage from '@react-native-async-storage/async-storage';
import toastMessage from '../utils/toastMessage';
import { Locations } from '../types/types';

/* interface Locations {
    name: string;
    lat: number;
    lon: number;
    country: string;
    state: string;
  } */

async function storeCity(value: Locations) {
    //Save city in async storage
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(
        (value.name + value.state).replace(' ', ''),
        jsonValue,
      );
      toastMessage('Dados salvo com sucesso!');
    } catch (e) {
      // saving error
      toastMessage(`Não foi possível salvar os dados!: ${e}`);
    }
  }

  async function getStoredCities() {
    let citiesList: Locations[] = [];
    try {
      const keys = await AsyncStorage.getAllKeys();

      keys.map(async key => {
        const response: string|any = await AsyncStorage.getItem(key);
        const json: Locations = JSON.parse(response);
        citiesList.push(json);
      });
      return Promise.resolve(citiesList) 
    } catch (e: any) {
      console.log('Error read keys', e.message);
    }
  }

  export {storeCity,getStoredCities}