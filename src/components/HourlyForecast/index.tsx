import React from 'react';
import {View, Text} from 'react-native';
import ItemHourlyForecast from '../ItemHourlyForecast';
import GlobalStyle from '../../Constants/GlobalStyle';

interface HourlyMain {
  dt: number;
  temp: number;
  icon: string;
  pop: number;
  description: string;
}

interface HourlyForecast {
  hourlyForecast: HourlyMain[];
}

export default function HourlyForecast({hourlyForecast}: HourlyForecast) {
  return (
    <View style={[GlobalStyle.container, {alignItems: 'stretch'}]}>
      <View>
        <Text style={{marginBottom: 10, fontSize: 12}}>
          {hourlyForecast[0].description}. Mínima de 22°C
        </Text>
      </View>
      <View style={{backgroundColor: '#FFF2', height: 1}}></View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <ItemHourlyForecast hourlyForecast={hourlyForecast} />
      </View>
    </View>
  );
}
