import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, NativeModules} from 'react-native';
import ItemHourlyForecast from '../ItemHourlyForecast';
import GlobalStyle from '../../Constants/GlobalStyle';
import {IForecastData} from '../../types/types';
import FormatDate from '../../utils/formatDate';
import Language from '../../utils/language';

export interface IHourlyForecast {
  dt: string;
  temp: number;
  icon: string;
  pop: number;
  description: string;
  min: string;
  max: string;
}
interface IHourly {
  forecastData: IForecastData;
}
function Hourly(ForecastData: IForecastData): Promise<IHourlyForecast[]> {
  const min: string = ForecastData.daily[0].temp.min.toFixed(0);
  const max: string = ForecastData.daily[0].temp.max.toFixed(0);
  const hourlyList: IHourlyForecast[] = ForecastData.hourly.map(
    (item, index): IHourlyForecast => {
      return {
        dt: FormatDate(item.dt).hourFormatted,
        temp: parseInt(item.temp.toFixed(0)),
        icon: item.weather[0].icon,
        pop: Number((item.pop * 100).toFixed(0)),
        description: item.weather[0].description,
        min,
        max,
      };
    },
  );
  return Promise.resolve(hourlyList);
}
export default function HourlyForecast({forecastData}: IHourly) {
  const [hourlyForecast, setHourlyForecast] = useState<IHourlyForecast[]>([
    {
      dt: '',
      temp: 0,
      icon: '',
      pop: 0,
      description: '',
      min: '',
      max: '',
    },
  ]);

  async function handleReload() {
    const hourly: IHourlyForecast[] = await Hourly(forecastData);
    setHourlyForecast(hourly);
    console.log('PASSEI HOURLY==========');
  }

  useEffect(() => {
    handleReload();
  }, [forecastData]);

  return (
    <View style={[GlobalStyle.container, {alignItems: 'stretch'}]}>
      <View>
        <Text style={styles.textMaxMinDescription}>
          {hourlyForecast[0].description}.{' '}
          {Language() === 'pt_BR'
            ? `Mínima de ${hourlyForecast[0].min}°C e Máxima de ${hourlyForecast[0].max}°C`
            : Language() === 'en_US'
            ? `Low of ${hourlyForecast[0].min}°F and High of ${hourlyForecast[0].max}°F`
            : `Low of ${hourlyForecast[0].min}°C and High of ${hourlyForecast[0].max}°C`}
        </Text>
      </View>

      <View style={styles.horizontalLine} />

      <ItemHourlyForecast hourlyForecast={hourlyForecast} />
    </View>
  );
}

const styles = StyleSheet.create({
  textMaxMinDescription: {marginBottom: 10, fontSize: 12, color: '#FFF'},
  horizontalLine: {backgroundColor: '#FFF2', height: 1},
});
