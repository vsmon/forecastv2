import React from 'react';
import {View, Text, Image} from 'react-native';
import GlobalStyle from '../../Constants/GlobalStyle';
import {ICurrentForecast} from '../../Pages/Home';
import {countries} from 'country-data';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ICurrent {
  currentForecast: ICurrentForecast;
}

export default function CurrentForecast({currentForecast}: ICurrent) {
  return (
    <View
      style={[
        GlobalStyle.container,
        {
          flex: 0,
          backgroundColor: '#000',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 0,
          alignItems: 'stretch',
        },
      ]}>
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
        <Text style={{marginBottom: 5, fontSize: 14}}>
          {new Date().toLocaleString()}
        </Text>
        <Text style={{marginBottom: 5, fontSize: 14, flexDirection: 'row'}}>
          <Icon name="map-marker" size={14} color={'#FFF'} />
          {currentForecast.city?.name}
          {/* {', '}
          {countries[currentForecast.city!.country].name} */}
        </Text>
        <Text style={{fontSize: 11}}>
          {currentForecast.max}° / {currentForecast.min}° {}
          Sensação térmica de {currentForecast.feels_like}°
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          //backgroundColor: 'red',
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
