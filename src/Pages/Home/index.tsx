import React, {
  ErrorInfo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Modal,
  AppState,
  AppStateStatus,
  Text,
  Animated,
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
import WeekDay from '../../utils/weekDay';
import {Locations} from '../../types/types';
import getForecastData from '../../api/getForecastData';
import {
  getAllStoredCities,
  getByKeyStoredCities,
  storeCity,
} from '../../Database/AsyncStorage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import toastMessage from '../../utils/toastMessage';
import getPosition from '../../services/Geolocations';
import getCityByCoords from '../../api/getCityByCoords';
import FormatDate from '../../utils/formatDate';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface IHomeProps {
  navigation: NativeStackNavigationProp<StackParamList>;
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

export interface IForecastData {
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
    dt:
      FormatDate(dtCurrent).dateFormatted +
      ' - ' +
      FormatDate(dtCurrent).hourFormatted,
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

function Home({navigation, route}: IHomeProps) {
  const [currentForecast, setCurrentForecast] = useState<ICurrentForecast>({
    dt: '',
    temp: 0,
    feels_like: 0,
    description: '',
    icon: '',
    max: 0,
    min: 0,
    city: {
      name: '',
      lat: 0,
      lon: 0,
      country: '',
      state: '',
    },
    event: '',
    alertDescription: '',
    sunrise: 0,
    sunset: 0,
    uvi: 0,
    humidity: 0,
    wind_speed: 0,
    alerts: [{event: '', alertDescription: ''}],
  });
  const [hourlyForecast, setHourlyForecast] = useState<
    IHourlyForecast[] | null
  >([
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
  const [dailyForecast, setDailyForecast] = useState<IDailyForecast[] | null>([
    {
      dt: 0,
      min: 0,
      max: 0,
      week: '',
      pop: 0,
      icon: '',
      moon_phase: 0,
    },
  ]);
  const [alertsForecast, setAlertsForecast] = useState<IAlertsForecast | null>(
    null,
  );
  const [sunsetForecast, setSunsetForeast] = useState<ISunsetForeast | null>({
    sunrise: '',
    sunset: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [activityIndicator, setActivityIndicator] = useState(false);

  const scaleAnimValue = useRef(new Animated.Value(0)).current;

  const cityByParam: Locations = route.params?.params.city;
  const screenOrigin: string = route.params?.params.screenName;

  async function getForecast(city: Locations) {
    try {
      //setActivityIndicator(true);
      const ForecastData = await getForecastData(city);
      console.log('CURRENT CITY==========', {
        name: city.name,
        state: city.state,
        country: city.country,
        lat: city.lat,
        lon: city.lon,
      });

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
        sunrise: FormatDate(current.sunrise).hourFormatted,
        sunset: FormatDate(current.sunset).hourFormatted,
      };
      setSunsetForeast(sunset);
      console.log('PASSEI SUNSET==========');

      /* setIsLoading(false);
      setActivityIndicator(false); */
    } catch (error) {
      setIsError(true);
      console.log(error);
      toastMessage(JSON.stringify(error));
    }
  }

  async function getDefaultCity(): Promise<Locations | null> {
    const city = await getByKeyStoredCities('default');

    return city;
  }

  const handleReload = async () => {
    setActivityIndicator(true);

    let city: Locations | null = {
      name: '',
      state: '',
      country: '',
      lat: 0,
      lon: 0,
    };

    const {latitude, longitude} = await getPosition();

    const cityByCoords: Locations[] = await getCityByCoords(
      latitude,
      longitude,
    );
    console.log('COORDS=============', latitude, longitude);
    console.log('CITY BY COORDS==============', cityByCoords);
    console.log('CITY BY PARAMS==============', cityByParam);
    console.log('SCREEN ORIGIN============', screenOrigin);

    const defaultCity: Locations | null = await getDefaultCity();
    if (screenOrigin === undefined) {
      city = defaultCity;
      if (cityByCoords.length > 0) {
        city = cityByCoords[0];
        storeCity(city, 'default');
      }
    } else {
      city = cityByParam;
    }

    if (city === null) {
      navigation.navigate('SearchLocation');
      return;
    }

    await getForecast(city);

    navigation.setParams({
      params: {screenName: undefined},
    });

    setIsLoading(false);
    setActivityIndicator(false);
  };

  useFocusEffect(
    useCallback(() => {
      if (cityByParam !== undefined) {
        handleReload();
      }
    }, [cityByParam]),
  );

  useEffect(() => {
    const appStateSubscription = AppState.addEventListener(
      'change',
      appState => {
        appState === 'active' ? handleReload() : null;
      },
    );

    return () => {
      appStateSubscription.remove();
    };
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
      {activityIndicator ? (
        <View>
          <ActivityIndicator size="large" color="#FFF" />
        </View>
      ) : null}
      <ScrollView
        scrollEventThrottle={0.1}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scaleAnimValue}}}],
          {useNativeDriver: false},
        )}
        stickyHeaderIndices={[0]}
        //stickyHeaderHiddenOnScroll={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleReload} />
        }>
        <CurrentForecast
          currentForecast={currentForecast}
          animatedValue={scaleAnimValue}
          navigation={navigation}
        />
        <HourlyForecast hourlyForecast={hourlyForecast} />
        <Messages message={alertsForecast} />
        <DailyForecast dailyForecast={dailyForecast} />
        <View style={{flex: 1, flexDirection: 'row'}}>
          <UVIndex uv={currentForecast.uvi} />
          <Humidity humidity={currentForecast.humidity} />
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Wind wind={currentForecast.wind_speed} />
          <Sunset sunset={sunsetForecast} />
        </View>
      </ScrollView>
    </View>
  );
}

export default Home;
