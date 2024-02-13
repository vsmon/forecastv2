import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  ToastAndroid,
  Alert,
  FlatList,
  Pressable,
  NativeModules,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {storeCity} from '../../Database/AsyncStorage';
import getCitiesData from '../../api/getCitiesData';
import {ILocations} from '../../types/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {countries} from 'country-data';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Language from '../../utils/language';

type StackParamList = {
  Home: undefined;
  Settings: undefined;
  LocationManager: undefined;
  SearchLocation: undefined;
};

interface SearchLocation {
  navigation: NativeStackNavigationProp<StackParamList>;
}

export default function SearchLocation({navigation}: SearchLocation) {
  const [city, setCity] = useState('');
  const [cities, setCities] = useState<ILocations[]>([]);

  async function handleGetCities() {
    try {
      const resp: ILocations[] = await getCitiesData(city);
      const citiesWithFullCountry: ILocations[] = resp.map(city => {
        return {...city, countryFull: countries[city.country].name};
      });
      setCities(citiesWithFullCountry);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: 5,
        }}>
        <TextInput
          style={{
            flex: 1,
            margin: 10,
            backgroundColor: '#171517',
            color: '#FFF',
            padding: 15,
            borderRadius: 15,
          }}
          placeholder={
            Language() === 'pt_BR' ? 'Pesquisar Cidade...' : 'Search City...'
          }
          placeholderTextColor={'#FFF3'}
          onChangeText={city => setCity(city)}
          value={city}
        />
        <TouchableOpacity onPress={handleGetCities}>
          <Icon name="magnify" color={'#FFF'} size={42} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          backgroundColor: '#171517',
          justifyContent: 'center',
          borderRadius: 45,
          margin: 10,
        }}>
        <FlatList
          keyboardShouldPersistTaps="handled"
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  height: 1,
                  width: '100%',
                  backgroundColor: '#FFF2',
                }}
              />
            );
          }}
          data={cities}
          renderItem={({item, separators}) => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              <Pressable
                style={{flex: 1, padding: 25}}
                android_ripple={{
                  color: 'gray',
                  foreground: false,
                  radius: 200,
                  borderless: false,
                }}
                onPress={() => {
                  storeCity(item, item.name + item.state);
                  navigation.navigate('LocationManager');
                }}>
                <View style={{alignItems: 'baseline'}}>
                  <Icon name="map-marker" size={18} color={'#FFF'} />
                  <Text style={{fontSize: 18, color: '#FFF'}}>{item.name}</Text>
                  <Text style={{fontSize: 12, color: '#FFF9'}}>
                    {item.state ? item.state + ', ' : null}
                    {item.countryFull}
                  </Text>
                </View>
              </Pressable>
            </View>
          )}
        />
      </View>
    </View>
  );
}
