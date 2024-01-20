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

  function fullCountryName(abreviateName: string) {
    let regionNames = new Intl.DisplayNames(['pt-BR'], {type: 'region'});
    return regionNames.of(abreviateName); // "United States"
  }

  async function handleGetCities() {
    try {
      const resp: Locations[] = await getCitiesData(city);

      /* let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
      regionNames.of('US'); // "United States"

      console.log(regionNames.of('US')); */

      setCities(resp);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <TextInput
        style={{
          backgroundColor: '#171517',
          color: '#FFF',
          padding: 20,
        }}
        placeholder="Cidade..."
        onChangeText={city => setCity(city)}
        value={city}
      />

      <Button title="Pesquisar" onPress={handleGetCities} />
      <View
        style={{
          //flex: 1,
          backgroundColor: '#171517',
          padding: 10,
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
                /* paddingTop: 15,
                paddingBottom: 15, */
                padding: 15,
              }}>
              <View style={{flexDirection: 'column'}}>
                <Pressable
                  onPress={() => {
                    console.log(cities);
                    storeCity(item, item.name + item.state);
                    navigation.navigate('LocationManager');
                  }}>
                  <Icon name="map-marker" size={22} />
                  <Text style={{fontSize: 18, color: '#FFF'}}>{item.name}</Text>
                  <Text style={{fontSize: 14, color: '#FFF'}}>
                    {item.state}, {item.country} - {item.country}
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}
