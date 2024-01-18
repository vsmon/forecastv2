import AsyncStorage from '@react-native-async-storage/async-storage';
import toastMessage from '../utils/toastMessage';
import { Locations } from '../types/types';


async function storeCity(value: Locations, key: string ) {
    //Save city in async storage
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(
        (key).replace(' ', ''),
        jsonValue,
      );
      //toastMessage('Dados salvo com sucesso!');
    } catch (e) {
      // saving error
      toastMessage(`Não foi possível salvar os dados!: ${e}`);
    }
  }

  async function getAllStoredCities() {
    let citiesList: Locations[] = [];
    try {
      const keys = await AsyncStorage.getAllKeys();
      keys.map(async key => {
        const response: string|any = await AsyncStorage.getItem(key);
        const json: Locations = JSON.parse(response);
        if(key !== 'default'){

          citiesList.push(json);        
        }
      });
      //console.log('API ALL KEYS===========', citiesList)
      return Promise.resolve(citiesList) 
    } catch (e: any) {
      console.log('Error read keys', e.message);
    }
  }

  async function getByKeyStoredCities(key:string): Promise<Locations|undefined> {
    try {

      const response: string|any = await AsyncStorage.getItem(key);
      const json: Locations = response != null ? JSON.parse(response) : null; //JSON.parse(response);

      //console.log('API BY KEY===========', json)
    
      return Promise.resolve(json) 
    } catch (e: any) {
      console.log('Error read keys', e.message);
    }
  }

  export {storeCity,getAllStoredCities,getByKeyStoredCities}