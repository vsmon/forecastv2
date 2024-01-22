import React, {ErrorInfo, useCallback, useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Modal,
  AppState,
  AppStateStatus,
} from 'react-native';

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
import {StackParamList} from '../../Routes/Stack';
import FormatHour from '../../utils/formatHour';
import WeekDay from '../../utils/weekDay';
import {Locations} from '../../types/types';
import getForecastData from '../../api/getForecastData';
import {getByKeyStoredCities} from '../../Database/AsyncStorage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import toastMessage from '../../utils/toastMessage';

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
  city?: Locations;
  event?: string;
  alertDescription?: string;
  sunrise: number;
  sunset: number;
  uvi: number;
  humidity: number;
  wind_speed: number;
  alerts?: [{event: string; alertDescription: string}];
}

export interface IAlertsForecast {
  alertEvent: string | undefined;
  alertDescription: string | undefined;
  alerts?: [{event: string; description: string}];
}

export interface ISunsetForeast {
  sunrise: string;
  sunset: string;
}

interface IForecastData {
  current: {
    dt: number;
    temp: number;
    feels_like: number;
    uvi: number;
    humidity: number;
    wind_speed: number;
    sunrise: number;
    sunset: number;
    weather: [{description: string; icon: string}];
  };
  daily: [
    {
      dt: number;
      pop: number;
      icon: string;
      moon_phase: number;
      temp: {max: number; min: number};
      weather: [{icon: string}];
    },
  ];
  hourly: [
    {
      dt: number;
      temp: number;
      weather: [{icon: string; description: string}];
      pop: number;
      icon: string;
    },
  ];
  alerts?: [{event: string; description: string}];
}

function Current(ForecastData: IForecastData): Promise<ICurrentForecast> {
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
  } = ForecastData;
  const currentForecast: ICurrentForecast = {
    dt: FormatHour(dtCurrent),
    temp: Number(temp.toFixed(0)),
    feels_like: parseInt(feels_like.toFixed(0)),
    description,
    icon,
    max: parseInt(max.toFixed(0)),
    min: parseInt(min.toFixed(0)),
    sunrise,
    sunset,
    uvi,
    humidity,
    wind_speed: parseInt(wind_speed.toFixed(0)),
  };
  return Promise.resolve(currentForecast);
}

export interface IHourlyForecast {
  dt: string;
  temp: number;
  icon: string;
  pop: number;
  description: string;
  min: string;
  max: string;
}
function Hourly(ForecastData: IForecastData): Promise<IHourlyForecast[]> {
  const min: string = ForecastData.daily[0].temp.min.toFixed(0);
  const max: string = ForecastData.daily[0].temp.max.toFixed(0);
  const hourlyList: IHourlyForecast[] = ForecastData.hourly.map(
    (item, index): IHourlyForecast => {
      return {
        dt: FormatHour(item.dt),
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

export interface IDailyForecast {
  dt: number;
  min: number;
  max: number;
  week: string;
  pop: number;
  icon: string;
  moon_phase: number;
}
function Daily(ForecastData: IForecastData): Promise<IDailyForecast[]> {
  const dailyList: IDailyForecast[] = ForecastData.daily.map(
    (item, index): IDailyForecast => {
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

function Alerts(ForecastData: IForecastData): IAlertsForecast {
  if (ForecastData.alerts) {
    const {event, description} = ForecastData.alerts[0] || {};
    return {alertEvent: event, alertDescription: description};
  }
  return {
    alertEvent: '',
    alertDescription: 'Nenhum Alerta no momento',
  };
}

function Home({navigation, route}: HomeProps) {
  const [currentForecast, setCurrentForecast] = useState<ICurrentForecast>();
  const [hourlyForecast, setHourlyForecast] = useState<
    IHourlyForecast[] | null
  >(null);
  const [dailyForecast, setDailyForecast] = useState<IDailyForecast[] | null>(
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
  const [activityIndicator, setActivityIndicator] = useState(false);

  const cityByParam: Locations = route.params?.params.city;
  const screenOrigin: string = route.params?.params.screenName;

  async function getForecast(city: Locations) {
    try {
      setActivityIndicator(true);
      const ForecastData = await getForecastData(city);
      console.log('CURRENT CITY==========', city);

      const current: ICurrentForecast = await Current(ForecastData);
      const currentWithCity: ICurrentForecast = {
        ...current,
        city,
      };
      setCurrentForecast(currentWithCity);
      console.log('PASSEI CURRENT==========');

      const hourly: IHourlyForecast[] = await Hourly(ForecastData);
      setHourlyForecast(hourly);
      console.log('PASSEI HOURLY==========');

      const alerts: IAlertsForecast = Alerts(ForecastData);
      setAlertsForecast(alerts);
      console.log('PASSEI ALERTS==========');

      const daily: IDailyForecast[] = await Daily(ForecastData);
      setDailyForecast(daily);
      console.log('PASSEI DAILY==========');

      const sunset = {
        sunrise: FormatHour(current.sunrise),
        sunset: FormatHour(current.sunset),
      };
      setSunsetForeast(sunset);
      console.log('PASSEI SUNSET==========');

      setIsLoading(false);
      setActivityIndicator(false);
    } catch (error) {
      setIsError(true);
      console.log(error);
      toastMessage(JSON.stringify(error));
    }
  }

  async function getDefaultCity(): Promise<Locations> {
    const city = await getByKeyStoredCities('default');

    return city;
  }

  const handleReload = async (appState?: AppStateStatus) => {
    const defaultCity: Locations = await getDefaultCity();
    let city: Locations = {name: '', state: '', country: '', lat: 0, lon: 0};
    if (screenOrigin === undefined) {
      city = defaultCity;
    } else {
      city = cityByParam;
    }
    await getForecast(city);
  };

  useFocusEffect(
    useCallback(() => {
      handleReload();
    }, [cityByParam]),
  );

  useEffect(() => {
    const appStateSubscription = AppState.addEventListener(
      'change',
      appState => {
        appState === 'active' ? handleReload() : null;
      },
    );

    return () => appStateSubscription.remove();
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#000',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {isError ? (
          <Icon name={'network-off-outline'} size={44} color={'#FFF9'} />
        ) : (
          <ActivityIndicator size="large" color="#FFF" />
        )}
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
      }}>
      <View>
        <CurrentForecast currentForecast={currentForecast!} />
      </View>
      {activityIndicator ? (
        <View>
          <ActivityIndicator size="large" color="#FFF" />
        </View>
      ) : null}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleReload} />
        }>
        <HourlyForecast hourlyForecast={hourlyForecast} />
        <Messages message={alertsForecast} />
        <DailyForecast dailyForecast={dailyForecast} />
        <View style={{flex: 1, flexDirection: 'row'}}>
          <UVIndex uv={currentForecast!.uvi} />
          <Humidity humidity={currentForecast!.humidity} />
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Wind wind={currentForecast!.wind_speed} />
          <Sunset sunset={sunsetForecast} />
        </View>
      </ScrollView>
    </View>
  );
}

export default Home;
