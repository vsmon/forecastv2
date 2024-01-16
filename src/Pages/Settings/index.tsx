import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Locations} from '../../types/types';

import {getAllStoredCities} from '../../Database/AsyncStorage';

/* interface Locations {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state: string;
} */

export default function Settings({navigation}: any) {
  const [locations, setLocations] = useState<Locations[] | undefined>([]);

  useFocusEffect(
    useCallback(() => {
      handleReload();
    }, []),
  );

  async function handleReload() {
    const cities: Locations[] | undefined = await getAllStoredCities();
    setLocations(cities);
  }

  return (
    <View style={{flex: 2, backgroundColor: '#6D8BB6'}}>
      <Icon
        name="cog"
        onPress={() => navigation.navigate('LocationManager')}
        size={32}
      />
      <Text>Locations</Text>

      <FlatList
        data={locations}
        renderItem={({item, separators}) => (
          <View>
            <Icon
              name="map-marker"
              onPress={() => navigation.navigate('Home')}
              size={22}>
              <Text style={{fontSize: 18}}>
                {item.name} - {item.country}
              </Text>
            </Icon>
          </View>
        )}
      />
    </View>
  );
}
