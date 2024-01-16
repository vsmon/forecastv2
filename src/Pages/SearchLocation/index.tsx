import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  ToastAndroid,
  Alert,
  FlatList,
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

  async function handleGetCities() {
    const resp: Locations[] | any = await getCitiesData(city);
    setCities(resp);
  }

  return (
    <View style={{flex: 2, backgroundColor: '#000'}}>
      <TextInput
        style={{
          backgroundColor: '#000',
          color: '#FFF',
          margin: 10,
          borderRadius: 15,
        }}
        placeholder="Cidade..."
        onChangeText={city => setCity(city)}
        value={city}
      />
      <Text>{city}</Text>
      <Button title="Pesquisar" onPress={handleGetCities} />
      <FlatList
        data={cities}
        renderItem={({item, separators}) => (
          <View>
            <Icon
              name="map-marker"
              onPress={() => {
                console.log(cities);
                storeCity(item, item.name + item.state);
                navigation.navigate('LocationManager');
              }}
              size={22}>
              <Text style={{fontSize: 18}}>
                {item.name} - {item.state} - {item.country}
              </Text>
            </Icon>
          </View>
        )}
      />
    </View>
  );
}
