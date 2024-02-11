import React, {useState, useCallback, useEffect} from 'react';
import {View, FlatList, Text, NativeModules} from 'react-native';
import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  getAllKeys,
  getAllStoredCities,
  getByKeyStoredCities,
  storeCity,
  removeCity,
} from '../../Database/AsyncStorage';

import {ILocations} from '../../types/types';

import ItemLocations from '../../components/ItemLocations';
import DefaultLocation from '../../components/DefaultLocation';
import {StackParamList} from '../../Routes/Stack';

interface LocationManager {
  route: RouteProp<StackParamList>;
  navigation: NavigationProp<StackParamList>;
}

export default function LocationManager({navigation, route}: LocationManager) {
  const [locations, setLocations] = useState<ILocations[] | null>([]);
  const [defaultLocation, setDefaultLocation] = useState<ILocations | null>({
    name: '',
    state: '',
    country: '',
    lat: 0,
    lon: 0,
    countryFull: '',
  });

  useFocusEffect(
    useCallback(() => {
      handleLoadCities();
    }, []),
  );

  async function handleLoadCities() {
    const cities: ILocations[] | null = await getAllStoredCities();

    const defaultCity: ILocations | null = await getByKeyStoredCities(
      'default',
    );

    setDefaultLocation(defaultCity);
    setLocations(cities);
    getAllKeys();
  }

  async function handleRemoveCity(key: string) {
    await removeCity(key);
    handleLoadCities();
  }

  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          paddingRight: 25,
        }}>
        <Icon
          name="plus"
          size={32}
          color={'#FFF'}
          onPress={() => navigation.navigate('SearchLocation')}
        />
      </View>
      <View>
        <Text style={{marginLeft: 10, marginBottom: 10, color: '#FFF9'}}>
          {NativeModules.I18nManager.localeIdentifier === 'pt_BR'
            ? 'Localização Favorita'
            : 'Favorite Location'}
        </Text>
        <DefaultLocation city={defaultLocation} navigation={navigation} />
      </View>
      <Text style={{marginLeft: 10, marginBottom: 10, color: '#FFF9'}}>
        {NativeModules.I18nManager.localeIdentifier === 'pt_BR'
          ? 'Outras Localidades'
          : 'Other Locations'}
      </Text>
      <FlatList
        data={locations}
        renderItem={({item, separators}) => (
          <ItemLocations
            city={item}
            navigation={navigation}
            starColor={
              item.name === defaultLocation?.name &&
              item.state === defaultLocation?.state
                ? '#e7ff0d'
                : '#FFF'
            }
            onPress={() => {
              storeCity(item, 'default');
              getByKeyStoredCities('default');
              handleLoadCities();
            }}
            onLongPress={() => {
              handleRemoveCity(item.name + item.state);
            }}
          />
        )}
      />
    </View>
  );
}
