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

  async function getAllStoredCities(): Promise<Locations[]> {
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
      if(keys === null){
        throw new Error("Nenhum registro encontrado");
        
      }
      return Promise.resolve<Locations[]>(citiesList) 
      //console.log('API ALL KEYS===========', citiesList)
    } catch (e: any) {
      console.log('Error read keys', e.message);
      return Promise.resolve(e)
    }
  }

async function getByKeyStoredCities(key:string): Promise<Locations> {
    try {

      const response: string | null= await AsyncStorage.getItem(key);
      const json: Locations = response != null ? JSON.parse(response) : null; //JSON.parse(response);
      
      if(json === null){
        throw new Error("Nenhum registro encontrado com e key: " + key);
        
      }
      //console.log('API BY KEY===========', json)        
      return Promise.resolve<Locations>(json) 
    } catch (e: any) {
      //console.log('Error read keys', e);
      return Promise.resolve(e)
    }
  }

  async function removeCity(key:string){
    try {
      await AsyncStorage.removeItem((key).replace(' ', ''))
    } catch(e) {
      // remove error
      console.log('Erro ao remover cidade', e)
    }
  
    console.log('Done.')
  }

  async function getAllKeys(){
    //let keys = []
    try {
    const keys = await AsyncStorage.getAllKeys()
    console.log(keys)
    return keys
  } catch(e) {
    // read key error
  }

  }

  export {storeCity,getAllStoredCities,getByKeyStoredCities,removeCity,getAllKeys}