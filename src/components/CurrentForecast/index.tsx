import React from 'react';
import {View, Text, Image} from 'react-native';

interface Current {
  temp: number;
  feels_like: number;
  description: string;
  icon: string;
  max: number;
  min: number;
}

interface currentForecast {
  currentForecast: Current;
}

export default function CurrentForecast({currentForecast}: currentForecast) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#FFF2',
        borderWidth: 2,
        margin: 5,
        borderRadius: 25,
        marginBottom: 20,
        backgroundColor: '#FFF1',
      }}>
      <View
        style={{
          flex: 1,
          padding: 20,
        }}>
        <Text style={{marginBottom: 5, fontSize: 48}}>
          {currentForecast.temp}°
        </Text>
        <Text style={{marginBottom: 30, fontSize: 18}}>
          {currentForecast.description}
        </Text>
        <Text style={{marginBottom: 5, fontSize: 14}}>Sorocaba</Text>
        <Text>
          {currentForecast.max.toFixed(0)}°/{currentForecast.min.toFixed(0)}°
          Sensação térmica de {currentForecast.feels_like.toFixed(0)}°
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}>
        <Image
          style={{height: 150, width: 150}}
          source={{
            uri: `https://openweathermap.org/img/wn/${currentForecast.icon}@2x.png`,
          }}
        />
      </View>
    </View>
  );
}
