import React from 'react';
import {View, ScrollView} from 'react-native';

import CurrentForecast from '../../components/CurrentForecast';
import DailyForecast from '../../components/DailyForecast';
import HourlyForecast from '../../components/HourlyForecast';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import ForecastData from '../../../seed.json';
import Messages from '../../components/MessagesForecast';
import UVIndex from '../../components/UV Index';
import Humidity from '../../components/Humidity';
import Wind from '../../components/Wind';
import Sunset from '../../components/Sunset';
import {StackParamList} from '../../routes';
import FormatHour from '../../utils/formatHour';
import WeekDay from '../../utils/weekDay';

const {
  current: {
    temp,
    feels_like,
    uvi,
    humidity,
    wind_speed,
    sunrise,
    sunset,
    weather: [{description, icon}],
  },
  daily: [
    {
      temp: {max, min},
    },
  ],
  hourly: [
    {
      dt,
      temp: tempHourly,
      weather: [{icon: iconHourly}],
      pop,
    },
  ],
  alerts: [{event, description: alertDescription}],
} = ForecastData;

const alertsForecast = {
  event,
  alertDescription,
};

const currentForecast = {
  temp: parseInt(temp.toFixed(0)),
  feels_like: parseInt(feels_like.toFixed(0)),
  description,
  icon,
  max: parseInt(max.toFixed(0)),
  min: parseInt(min.toFixed(0)),
  city: '',
};

const hourlyForecast = ForecastData.hourly.map((item, index) => {
  const data = {
    dt: FormatHour(item.dt),
    temp: parseInt(item.temp.toFixed(0)),
    icon: item.weather[0].icon,
    pop: Number((item.pop * 100).toFixed(0)),
    description: item.weather[0].description,
    min: currentForecast.min,
  };
  return data;
});

const dailyForecast = ForecastData.daily.map((item, index) => {
  const dayOfWeek: number = Number(
    new Date(item.dt * 1000).getDay().toLocaleString(),
  );
  const data = {
    dt: item.dt,
    week: WeekDay(dayOfWeek),
    pop: Number((item.pop * 100).toFixed(0)),
    icon: item.weather[0].icon,
    min: parseInt(item.temp.min.toFixed(0)),
    max: parseInt(item.temp.max.toFixed(0)),
  };
  return data;
});

const sunsetForeast = {
  sunrise: FormatHour(sunrise),
  sunset: FormatHour(sunset),
};

interface HomeProps {
  navigation: NavigationProp<StackParamList>;
  route: RouteProp<StackParamList>;
}

function Home({navigation, route}: HomeProps) {
  console.log('HOME============', route.params?.params);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CurrentForecast
          currentForecast={{
            ...currentForecast,
            city: route.params?.params.name,
          }}
        />
        <HourlyForecast hourlyForecast={hourlyForecast} />
        <Messages message={alertsForecast} />
        <DailyForecast dailyForecast={dailyForecast} />
        <View style={{flex: 1, flexDirection: 'row'}}>
          <UVIndex uv={uvi} />
          <Humidity humidity={humidity} />
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Wind wind={wind_speed} />
          <Sunset sunset={sunsetForeast} />
        </View>
      </ScrollView>
    </View>
  );
}

export default Home;
