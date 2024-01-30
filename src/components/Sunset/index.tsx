import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import GlobalStyle from '../../Constants/GlobalStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FormatDate from '../../utils/formatDate';
import {IForecastData, ISunsetForeast} from '../../Pages/Home';

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
  }, []);
  return (
    <View style={[GlobalStyle.container, {flexDirection: 'row'}]}>
      <View style={{marginRight: 25, alignItems: 'center'}}>
        <Icon name="weather-sunset-up" size={42} color={'#FFBB09'} />
        <Text style={{marginTop: 5, color: '#FFF9'}}>
          {sunsetForecast.sunrise}
        </Text>
      </View>
      <View style={{marginLeft: 25, alignItems: 'center'}}>
        <Icon name="weather-sunset-down" size={42} color={'#F18D90'} />
        <Text style={{marginTop: 5, color: '#FFF9'}}>
          {sunsetForecast.sunset}
        </Text>
      </View>
    </View>
  );
}
