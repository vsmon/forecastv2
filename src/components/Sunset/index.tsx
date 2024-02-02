import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import GlobalStyle from '../../Constants/GlobalStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FormatDate from '../../utils/formatDate';
import {IForecastData} from '../../types/types';

export interface ISunsetForeast {
  sunrise: string;
  sunset: string;
}
interface SunsetForecast {
  forecastData: IForecastData;
}

export default function Sunset({forecastData}: SunsetForecast) {
  const [sunsetForecast, setSunsetForeast] = useState<ISunsetForeast>({
    sunrise: '',
    sunset: '',
  });

  async function handleReload() {
    const sunset = {
      sunrise: FormatDate(forecastData.current.sunrise).hourFormatted,
      sunset: FormatDate(forecastData.current.sunset).hourFormatted,
    };
    setSunsetForeast(sunset);
    console.log('PASSEI SUNSET==========');
  }

  useEffect(() => {
    handleReload();
  }, [forecastData]);

  return (
    <View style={[GlobalStyle.container, {flexDirection: 'row'}]}>
      <View style={styles.containerSunset}>
        <Icon name="weather-sunset-up" size={42} color={'#FFBB09'} />
        <Text style={{marginTop: 5, color: '#FFF9'}}>
          {sunsetForecast.sunrise}
        </Text>
      </View>
      <View style={styles.containerSundown}>
        <Icon name="weather-sunset-down" size={42} color={'#F18D90'} />
        <Text style={styles.textTime}>{sunsetForecast.sunset}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerSunset: {marginRight: 25, alignItems: 'center'},
  containerSundown: {marginLeft: 25, alignItems: 'center'},
  textTime: {marginTop: 5, color: '#FFF9'},
});
