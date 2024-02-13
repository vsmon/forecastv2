import React from 'react';
import {View, Text, StyleSheet, NativeModules} from 'react-native';
import GlobalStyle from '../../Constants/GlobalStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Language from '../../utils/language';

interface wind {
  windSpeed: number | undefined;
  windDeg: number;
}

export default function Wind(wind: wind) {
  let windDirection: string = '';
  switch (true) {
    case wind.windDeg >= 0 && wind.windDeg < 22.5:
      windDirection = Language() === 'pt_BR' ? 'Norte' : 'North';
      break;
    case wind.windDeg >= 22.5 && wind.windDeg < 45:
      windDirection =
        Language() === 'pt_BR' ? 'Nor-Nordeste' : 'North-Northeast';
      break;

    case wind.windDeg >= 45 && wind.windDeg < 67.5:
      windDirection = Language() === 'pt_BR' ? 'Nordeste' : 'Northeast';
      break;

    case wind.windDeg >= 67.5 && wind.windDeg < 90:
      windDirection =
        Language() === 'pt_BR' ? 'Leste-Nordeste' : 'East-Northeast';
      break;

    case wind.windDeg >= 90 && wind.windDeg < 112.5:
      windDirection = Language() === 'pt_BR' ? 'Leste' : 'East';
      break;

    case wind.windDeg >= 112.5 && wind.windDeg < 135:
      windDirection =
        Language() === 'pt_BR' ? 'Leste-Sudeste' : 'East-Southeast';
      break;

    case wind.windDeg >= 135 && wind.windDeg < 157.5:
      windDirection = Language() === 'pt_BR' ? 'Sudeste' : 'Southeast';
      break;

    case wind.windDeg >= 157.5 && wind.windDeg < 180:
      windDirection =
        Language() === 'pt_BR' ? 'Sul-Sudeste' : 'South-Southeast';
      break;

    case wind.windDeg >= 180 && wind.windDeg < 202.5:
      windDirection = Language() === 'pt_BR' ? 'Sul' : 'South';
      break;

    case wind.windDeg >= 202.5 && wind.windDeg < 225:
      windDirection =
        Language() === 'pt_BR' ? 'Sul-Sudoeste' : 'South-Southwest';
      break;

    case wind.windDeg >= 225 && wind.windDeg < 247.5:
      windDirection = Language() === 'pt_BR' ? 'Sudoeste' : 'Southwest';
      break;

    case wind.windDeg >= 247.5 && wind.windDeg < 270:
      windDirection =
        Language() === 'pt_BR' ? 'Oés-Sudoeste' : 'West-Southwest';
      break;

    case wind.windDeg >= 270 && wind.windDeg < 292.5:
      windDirection = Language() === 'pt_BR' ? '	Oeste' : 'West';
      break;

    case wind.windDeg >= 292.5 && wind.windDeg < 315:
      windDirection =
        Language() === 'pt_BR' ? 'Oés-Noroeste' : 'West-Northwest';
      break;

    case wind.windDeg >= 315 && wind.windDeg < 337.5:
      windDirection = Language() === 'pt_BR' ? 'Noroeste' : 'Northwest';
      break;

    case wind.windDeg >= 337.5 && wind.windDeg < 360:
      windDirection =
        Language() === 'pt_BR' ? 'Nor-Noroeste' : 'North-Northwest';
      break;

    default:
      windDirection = '???';
      break;
  }
  return (
    <View style={GlobalStyle.container}>
      <Icon name="weather-windy" size={32} color={'#FFF9'} />
      <Text style={styles.textTitle}>
        {Language() === 'pt_BR' ? 'Vento' : 'Wind'}
      </Text>
      <Text style={styles.textDescription}>{wind.windSpeed} km/h</Text>
      <Text style={styles.textDescription}>{windDirection}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textTitle: {color: '#FFF', marginTop: 10},
  textDescription: {color: '#FFF9'},
});
