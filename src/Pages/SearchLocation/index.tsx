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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {storeCity} from '../../Database/AsyncStorage';
import getCitiesData from '../../api/getCitiesData';
import {Locations} from '../../types/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {countries} from 'country-data';

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
  const [cities, setCities] = useState<Locations[]>([]);

  async function handleGetCities() {
    try {
      const resp: Locations[] = await getCitiesData(city);

      setCities(resp);
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
          placeholder="Pesquisar Cidade..."
          onChangeText={city => setCity(city)}
          value={city}
        />
        <Icon
          name="map-search-outline"
          color={'#FFF'}
          size={42}
          onPress={handleGetCities}
        />
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
                //padding: 15,
              }}>
              {/* <View style={{flex: 1, flexDirection: 'column'}}> */}
              <Pressable
                style={{flex: 1, padding: 25}}
                android_ripple={{
                  color: 'gray',
                  foreground: false,
                  radius: 200,
                  borderless: false,
                }}
                onPress={() => {
                  console.log(cities);
                  storeCity(item, item.name + item.state);
                  navigation.navigate('LocationManager');
                }}>
                <View style={{alignItems: 'baseline'}}>
                  <Icon name="map-marker" size={18} />
                  <Text style={{fontSize: 18, color: '#FFF'}}>{item.name}</Text>
                  <Text style={{fontSize: 12, color: '#FFF9'}}>
                    {item.state ? item.state + ', ' : null}
                    {countries[item.country].name}
                  </Text>
                </View>
              </Pressable>
              {/* </View> */}
            </View>
          )}
        />
      </View>
    </View>
  );
}
