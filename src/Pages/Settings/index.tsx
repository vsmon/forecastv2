import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, FlatList, Pressable} from 'react-native';
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
    <View
      style={{
        flex: 1,
        backgroundColor: '#171517',
        padding: 25,
      }}>
      <Text>Locations</Text>
      <View
        style={{
          //flex: 1,
          backgroundColor: '#171517',
          justifyContent: 'center',
          //padding: 25,
          margin: 5,
          marginBottom: 15,
          borderRadius: 15,
        }}>
        <FlatList
          data={locations}
          renderItem={({item, separators}) => (
            <View style={{marginBottom: 20}}>
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
      <Pressable
        style={{
          backgroundColor: '#FFF3',
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 15,
        }}
        onPress={() => navigation.navigate('LocationManager')}>
        <Text>Gerenciar Localizações</Text>
      </Pressable>
    </View>
  );
}
