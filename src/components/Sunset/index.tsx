import React from 'react';
import {View, Text} from 'react-native';
import GlobalStyle from '../../Constants/GlobalStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Sunset {
  sunrise: number;
  sunset: number;
}

interface SunsetForecast {
  sunset: Sunset;
}

export default function Sunset({sunset}: SunsetForecast) {
  const sunsetConverted: string =
    new Date(sunset.sunset).getHours().toLocaleString() +
    ':' +
    new Date(sunset.sunset).getMinutes().toLocaleString();
  const sunriseConverted: string =
    new Date(sunset.sunrise).getHours().toLocaleString() +
    ':' +
    new Date(sunset.sunrise).getMinutes().toLocaleString();
  return (
    <View style={[GlobalStyle.container, {flexDirection: 'row'}]}>
      <View style={{marginRight: 25, alignItems: 'center'}}>
        <Icon name="weather-sunset-up" size={42} color={'#FFBB09'} />
        <Text style={{marginTop: 5}}>{sunriseConverted}</Text>
      </View>
      <View style={{marginLeft: 25, alignItems: 'center'}}>
        <Icon name="weather-sunset-down" size={42} color={'#F18D90'} />
        <Text style={{marginTop: 5}}>{sunsetConverted}</Text>
      </View>
    </View>
  );
}
