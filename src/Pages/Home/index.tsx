import React from 'react';
import {View, ScrollView} from 'react-native';

import CurrentForecast from '../../components/CurrentForecast';
import DailyForecast from '../../components/DailyForecast';
import HourlyForecast from '../../components/HourlyForecast';

import ForecastData from '../../../seed.json';
import Messages from '../../components/MessagesForecast';

const {
  current: {
    temp,
    feels_like,
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
} = ForecastData;

const currentForecast = {
  temp,
  feels_like,
  description,
  icon,
  max,
  min,
};

const hourlyForecast = ForecastData.hourly.map((item, index) => {
  const data = {
    dt: item.dt,
    temp: item.temp,
    icon: item.weather[0].icon,
    pop: item.pop,
    description: item.weather[0].description,
  };
  return data;
});

const dailyForecast = ForecastData.daily.map((item, index) => {
  const data = {
    dt: item.dt,
    pop: item.pop,
    icon: item.weather[0].icon,
    min: item.temp.min,
    max: item.temp.max,
  };
  return data;
});

const messages = ForecastData.alerts;

function Home() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CurrentForecast currentForecast={currentForecast} />
        <HourlyForecast hourlyForecast={hourlyForecast} />
        <DailyForecast dailyForecast={dailyForecast} />
        <Messages messages={messages} />
      </ScrollView>
    </View>
  );
}

export default Home;
