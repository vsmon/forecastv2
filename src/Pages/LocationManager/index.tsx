import React, {useState, useMemo, useEffect, useCallback} from 'react';
import {View, FlatList} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getStoredCities} from '../../Database/AsyncStorage';
import {Locations} from '../../types/types';

import ItemLocations from '../../components/ItemLocations';

export default function LocationManager({navigation, route}: any) {
  const [locations, setLocations] = useState<Locations[] | undefined>([]);

  useFocusEffect(
    useCallback(() => {
      handleLoadCities();
    }, []),
  );

  async function handleLoadCities() {
    const cities: Locations[] | undefined = await getStoredCities();
    setLocations(cities);
  }

  return (
    <View style={{flex: 2, backgroundColor: '#000'}}>
      <Icon
        name="plus"
        size={32}
        color={'#FFF'}
        onPress={() => navigation.navigate('SearchLocation')}
      />
      <Icon
        name="reload"
        size={32}
        color={'#FFF'}
        onPress={() => handleLoadCities}
      />
      <Icon
        name="delete"
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
      />
      <FlatList
        data={locations}
        renderItem={({item, separators}) => (
          <ItemLocations city={item} navigation={navigation} />
        )}
      />
    </View>
  );
}
