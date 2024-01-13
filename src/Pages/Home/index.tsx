import React from 'react';
import {View, ScrollView} from 'react-native';

import CurrentForecast from '../../components/CurrentForecast';
import DailyForecast from '../../components/DailyForecast';
import HourlyForecast from '../../components/HourlyForecast';

import ForecastData from '../../../seed.json';
import Messages from '../../components/MessagesForecast';
import UVIndex from '../../components/UV Index';
import Humidity from '../../components/Humidity';
import Wind from '../../components/Wind';
import Sunset from '../../components/Sunset';

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

const sunsetForeast = {
  sunrise: sunrise * 1000,
  sunset: sunset * 1000,
};

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
