import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, ActivityIndicator} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ILocations} from '../../types/types';
import {StackParamList} from '../../Routes/Stack';

interface DefaultLocations {
  city: ILocations | null;
  navigation: NavigationProp<StackParamList>;
}

export default function DefaultLocation({city, navigation}: DefaultLocations) {
  const [defaultCity, setDefaultCity] = useState<ILocations | null>({
    name: '',
    state: '',
    country: '',
    lat: 0,
    lon: 0,
    countryFull: '',
  });
  useEffect(() => {
    setDefaultCity(city);
  }, []);

  if (city === null) {
    return (
      <View
        style={{
          backgroundColor: '#171517',
          margin: 5,
          marginBottom: 15,
          borderRadius: 15,
          padding: 35,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* <ActivityIndicator size="large" color="#FFF" /> */}
        {/* <Icon name="map-marker" size={30} color={'#FFF'} /> */}
        <Text>...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: '#171517',
        margin: 5,
        marginBottom: 15,
        borderRadius: 15,
      }}>
      <Pressable
        android_ripple={{
          color: 'gray',
          foreground: false,
          radius: 200,
          borderless: false,
        }}
        onPress={() => {
          navigation.navigate('Home', {
            params: {city, screenName: 'DefaultLocation'},
          });
        }}>
        <View style={{padding: 25}}>
          <View>
            <Icon name="star" size={22} color={'#e7ff0d'} />
            <Text style={{fontSize: 18, color: '#FFF'}}>{city.name}</Text>
          </View>

          <View style={{justifyContent: 'flex-start'}}>
            {city.state ? (
              <Text style={{fontSize: 14, color: '#FFF9'}}>
                {city.state}, {city.countryFull}
              </Text>
            ) : (
              <Text style={{fontSize: 14, color: '#FFF9'}}>
                {city.countryFull}
              </Text>
            )}
          </View>
        </View>
      </Pressable>
    </View>
  );
}
