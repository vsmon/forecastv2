import React from 'react';
import {View, Text} from 'react-native';
import ItemHourlyForecast from '../ItemHourlyForecast';
import GlobalStyle from '../../Constants/GlobalStyle';
import {IHourlyForecast} from '../../Pages/Home';

interface IHourly {
  hourlyForecast: IHourlyForecast[] | any;
}

export default function HourlyForecast({hourlyForecast}: IHourly) {
  return (
    <View style={[GlobalStyle.container, {alignItems: 'stretch'}]}>
      <View>
        <Text style={{marginBottom: 10, fontSize: 12, color: '#FFF'}}>
          {hourlyForecast[0].description}. Mínima de {hourlyForecast[0].min}
          °C e Máxima de {hourlyForecast[0].max}°C.
        </Text>
      </View>
      <View style={{backgroundColor: '#FFF2', height: 1}}></View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <ItemHourlyForecast hourlyForecast={hourlyForecast} />
      </View>
    </View>
  );
}
