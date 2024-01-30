import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  AppState,
  Animated,
} from 'react-native';

import CurrentForecast from '../../components/CurrentForecast';
import DailyForecast from '../../components/DailyForecast';
import HourlyForecast from '../../components/HourlyForecast';
import {RouteProp, useFocusEffect} from '@react-navigation/native';
import Messages from '../../components/MessagesForecast';
import UVIndex from '../../components/UV Index';
import Humidity from '../../components/Humidity';
import Wind from '../../components/Wind';
import Sunset from '../../components/Sunset';
import {StackParamList} from '../../Routes/Stack';
import {Locations} from '../../types/types';
import getForecastData from '../../api/getForecastData';
import {getByKeyStoredCities, storeCity} from '../../Database/AsyncStorage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import toastMessage from '../../utils/toastMessage';
import getPosition from '../../services/Geolocations';
import getCityByCoords from '../../api/getCityByCoords';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {countries} from 'country-data';

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
  city: Locations;
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
  city: Locations;
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

export interface IHourlyForecast {
  dt: string;
  temp: number;
  icon: string;
  pop: number;
  description: string;
  min: string;
  max: string;
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

function Home({navigation, route}: IHomeProps) {
  const [forecastData, setForecastData] = useState<IForecastData>({
    current: {
      dt: 0,
      temp: 0,
      feels_like: 0,
      uvi: 0,
      humidity: 0,
      wind_speed: 0,
      sunrise: 0,
      sunset: 0,
      weather: [{description: '', icon: ''}],
    },
    city: {
      name: '',
      state: '',
      country: '',
      lat: 0,
      lon: 0,
      countryFull: '',
    },
    daily: [
      {
        dt: 0,
        pop: 0,
        icon: '',
        moon_phase: 0,
        temp: {max: 0, min: 0},
        weather: [{icon: ''}],
      },
    ],
    hourly: [
      {
        dt: 0,
        temp: 0,
        weather: [{icon: '', description: ''}],
        pop: 0,
        icon: '',
      },
    ],
    alerts: [{event: '', description: ''}],
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [activityIndicator, setActivityIndicator] = useState(false);

  const scaleAnimValue = useRef(new Animated.Value(0)).current;

  const cityByParam: Locations = route.params?.params.city;
  const screenOrigin: string = route.params?.params.screenName;

  async function getForecast(city: Locations) {
    try {
      const ForecastData: IForecastData = await getForecastData(city);
      setForecastData({...ForecastData, city});
      console.log('CURRENT CITY==========', {
        name: city.name,
        state: city.state,
        country: city.country,
        lat: city.lat,
        lon: city.lon,
      });
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
      countryFull: '',
    };

    const {latitude, longitude} = await getPosition();

    const cityByCoordsResp: Locations[] = await getCityByCoords(
      latitude,
      longitude,
    );

    const cityByCoords: Locations[] = cityByCoordsResp.map(city => {
      return {...city, countryFull: countries[city.country].name};
    });

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
          forecastData={forecastData}
          animatedValue={scaleAnimValue}
          navigation={navigation}
        />
        <HourlyForecast forecastData={forecastData} />
        <Messages forecastData={forecastData} />
        <DailyForecast forecastData={forecastData} />
        <View style={{flex: 1, flexDirection: 'row'}}>
          <UVIndex uv={forecastData?.current.uvi} />
          <Humidity humidity={forecastData?.current.humidity} />
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Wind wind={forecastData?.current.wind_speed} />
          <Sunset forecastData={forecastData} />
        </View>
      </ScrollView>
    </View>
  );
}

export default Home;
