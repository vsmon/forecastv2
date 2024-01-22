import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, ActivityIndicator} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Locations} from '../../types/types';
import {StackParamList} from '../../Routes/Stack';
import {countries} from 'country-data';

interface DefaultLocations {
  city: Locations;
  navigation: NavigationProp<StackParamList>;
}

export default function DefaultLocation({city, navigation}: DefaultLocations) {
  const [defaultCity, setDefaultCity] = useState<Locations>({
    name: '',
    state: '',
    country: '',
    lat: 0,
    lon: 0,
  });
  useEffect(() => {
    setDefaultCity(city);
  }, []);

  if (city === undefined) {
    return (
      <View
        style={{
          backgroundColor: '#171517',
          margin: 5,
          marginBottom: 15,
          borderRadius: 15,
          padding: 35,
        }}>
        <ActivityIndicator size="large" color="#FFF" />
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
                {city.state}, {countries[city.country].name}
              </Text>
            ) : (
              <Text style={{fontSize: 14, color: '#FFF9'}}>
                {countries[city.country].name}
              </Text>
            )}
          </View>
        </View>
      </Pressable>
    </View>
  );
}
