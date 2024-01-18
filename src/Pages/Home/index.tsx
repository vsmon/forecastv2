import React, {useCallback, useEffect, useState} from 'react';
import {View, ScrollView, RefreshControl} from 'react-native';

import CurrentForecast from '../../components/CurrentForecast';
import DailyForecast from '../../components/DailyForecast';
import HourlyForecast from '../../components/HourlyForecast';
import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
} from '@react-navigation/native';
import seed from '../../../seed.json';
import Messages from '../../components/MessagesForecast';
import UVIndex from '../../components/UV Index';
import Humidity from '../../components/Humidity';
import Wind from '../../components/Wind';
import Sunset from '../../components/Sunset';
import {StackParamList} from '../../routes';
import FormatHour from '../../utils/formatHour';
import WeekDay from '../../utils/weekDay';
import {Locations} from '../../types/types';
import getForecastData from '../../api/getForecastData';
import {getByKeyStoredCities} from '../../Database/AsyncStorage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface HomeProps {
  navigation: NavigationProp<StackParamList>;
  route: RouteProp<StackParamList>;
}

export interface ICurrentForecast {
  dt: string;
  temp: number;
  feels_like: number;
  description: string;
  icon: string;
  max: number;
  min: number;
  city?: string;
  event?: string;
  alertDescription?: string;
  sunrise: number;
  sunset: number;
  uvi: number;
  humidity: number;
  wind_speed: number;
  alerts?: [{event: string; alertDescription: string}];
}

interface IHourlyForecast {
  dt: number;
  temp: number;
  icon: string;
  pop: number;
  description: string;
  min: number;
  hourly: Array<IHourlyForecast>;
  weather: [{icon: string; description: string}];
}

interface IDailyForecast {
  dt: number;
  temp: {min: number; max: number};
  week: string;
  pop: number;
  icon: string;
  min: number;
  max: number;
  daily: Array<IDailyForecast>;
  weather: [{icon: string}];
  moon_phase: number;
}

interface IAlertsForecast {
  alertEvent: string | undefined;
  alertDescription: string | undefined;
  alerts?: [{event: string; description: string}];
}

interface ISunsetForeast {
  sunrise: string;
  sunset: string;
}

function Current(
  ForecastData: ICurrentForecast | any,
): Promise<ICurrentForecast> {
  const {
    current: {
      dt: dtCurrent,
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
    //alerts: [{event, description: alertDescription}],
  } = ForecastData;
  const currentForecast: ICurrentForecast = {
    dt: FormatHour(dtCurrent),
    temp, //: parseInt(temp.toFixed(0)),
    feels_like: parseInt(feels_like.toFixed(0)),
    description,
    icon,
    max: parseInt(max.toFixed(0)),
    min: parseInt(min.toFixed(0)),
    //city:'',
    //event,
    //alertDescription,
    sunrise,
    sunset,
    uvi,
    humidity,
    wind_speed: parseInt(wind_speed.toFixed(0)),
  };
  return Promise.resolve(currentForecast);
}

function Hourly(ForecastData: IHourlyForecast): Promise<IHourlyForecast> {
  const hourlyList: IHourlyForecast | any = ForecastData.hourly.map(
    (item, index) => {
      return {
        dt: FormatHour(item.dt),
        temp: parseInt(item.temp.toFixed(0)),
        icon: item.weather[0].icon,
        pop: Number((item.pop * 100).toFixed(0)),
        description: item.weather[0].description,
        min: 99,
      };
    },
  );
  return Promise.resolve(hourlyList);
}

function Daily(ForecastData: IDailyForecast): Promise<IDailyForecast> {
  const dailyList: IDailyForecast | any = ForecastData.daily.map(
    (item, index) => {
      const dayOfWeek: number = Number(
        new Date(item.dt * 1000).getDay().toLocaleString(),
      );
      return {
        dt: item.dt,
        week: WeekDay(dayOfWeek),
        pop: Number((item.pop * 100).toFixed(0)),
        icon: item.weather[0].icon,
        min: parseInt(item.temp.min.toFixed(0)),
        max: parseInt(item.temp.max.toFixed(0)),
        moon_phase: item.moon_phase,
      };
    },
  );
  return Promise.resolve(dailyList);
}

function Alerts(ForecastData: IAlertsForecast): IAlertsForecast {
  if (ForecastData.alerts) {
    console.log('ALERT FUNCTION===========', 'SIM');
    const {event, description} = ForecastData.alerts[0] || {};
    return {alertEvent: event, alertDescription: description};
  }
  console.log('ALERT FUNCTION===========', 'NAO');
  return {
    alertEvent: '',
    alertDescription: 'Nenhum Alerta no momento',
  };
}

function Home({navigation, route}: HomeProps) {
  const [currentForecast, setCurrentForecast] =
    useState<ICurrentForecast | null>(null);
  const [hourlyForecast, setHourlyForecast] = useState<IHourlyForecast | null>(
    null,
  );
  const [dailyForecast, setDailyForecast] = useState<IDailyForecast | null>(
    null,
  );
  const [alertsForecast, setAlertsForecast] = useState<IAlertsForecast | null>(
    null,
  );
  const [sunsetForecast, setSunsetForeast] = useState<ISunsetForeast | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [currentCity, setCurrentCity] = useState<string | undefined>('');

  async function getForecast(city: Locations) {
    try {
      const ForecastData = await getForecastData(city);
      //console.log('FETCH2============', ForecastData.current);
      console.log('CURRENT CITY==========', city);

      const current: ICurrentForecast = await Current(ForecastData);
      const currentWithCity: ICurrentForecast = {
        ...current,
        city: city.name,
      };
      //console.log('CURRENT============', currentWithCity);
      setCurrentForecast(currentWithCity);
      console.log('PASSEI CURRENT==========');

      const hourly: IHourlyForecast = await Hourly(ForecastData);
      //console.log('HOURLY====================', hourly);
      setHourlyForecast(hourly);
      console.log('PASSEI HOURLY==========');

      const alerts: IAlertsForecast = Alerts(ForecastData);
      setAlertsForecast(alerts);
      console.log('PASSEI ALERTS==========');

      const daily: IDailyForecast = await Daily(ForecastData);
      setDailyForecast(daily);
      console.log('PASSEI DAILY==========');

      const sunset = {
        sunrise: FormatHour(current.sunrise),
        sunset: FormatHour(current.sunset),
      };
      setSunsetForeast(sunset);
      console.log('PASSEI SUNSET==========');

      setIsLoading(false);
    } catch (error) {
      //setIsError(true);
      console.log(error);
    }
  }

  async function getDefaultCity() {
    const city = await getByKeyStoredCities('default');

    return city;
  }

  const handleReload = async () => {
    const cityByParam: Locations = route.params?.params;
    console.log('CITY PARAM', cityByParam);
    const defaultCity: Locations | undefined = await getDefaultCity();
    console.log('CITY DEFAULT', defaultCity);

    if (defaultCity !== undefined) {
      await getForecast(defaultCity);
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleReload();
    }, []),
  );

  useEffect(() => {
    handleReload();
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#5A7DAB',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon
          name={isError ? 'network-off-outline' : 'cog'}
          size={44}
          color={'#FFF9'}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleReload} />
        }>
        <CurrentForecast currentForecast={currentForecast} />
        <HourlyForecast hourlyForecast={hourlyForecast} />
        <Messages message={alertsForecast} />
        <DailyForecast dailyForecast={dailyForecast} />
        <View style={{flex: 1, flexDirection: 'row'}}>
          <UVIndex uv={currentForecast?.uvi} />
          <Humidity humidity={currentForecast?.humidity} />
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Wind wind={currentForecast?.wind_speed} />
          <Sunset sunset={sunsetForecast} />
        </View>
      </ScrollView>
    </View>
  );
}

export default Home;
