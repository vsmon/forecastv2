import React, {useState, useCallback} from 'react';
import {View, FlatList, Text} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getAllStoredCities,
  getByKeyStoredCities,
  storeCity,
} from '../../Database/AsyncStorage';
import {Locations} from '../../types/types';

import ItemLocations from '../../components/ItemLocations';
import DefaultLocation from '../../components/DefaultLocation';

export default function LocationManager({navigation, route}: any) {
  const [locations, setLocations] = useState<Locations[] | undefined>([]);
  const [defaultLocation, setDefaultLocation] = useState<
    Locations | undefined
  >();

  useFocusEffect(
    useCallback(() => {
      handleLoadCities();
    }, []),
  );

  async function handleLoadCities() {
    const cities: Locations[] | any = await getAllStoredCities();
    setLocations(cities);

    const defaultCity: Locations | any = await getByKeyStoredCities('default');
    if (!null) {
      setDefaultLocation(defaultCity);
    }
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
        {/* <Icon
          name="delete-sweep"
          size={32}
          color={'#FFF'}
          onPress={async () => {
            try {
              await AsyncStorage.clear();
            } catch (e) {
              // clear error
            }

            console.log('Done.');
          }}
        /> */}
      </View>
      <View>
        <Text style={{marginLeft: 10}}>Localização Favorita</Text>
        <DefaultLocation city={defaultLocation} navigation={navigation} />
      </View>
      <Text style={{marginLeft: 10}}>Outras Localidades</Text>
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
          />
        )}
      />
    </View>
  );
}
