import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  AppState,
  Animated,
  Text,
  NativeModules,
  Button,
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
import {IForecastData, ILocations} from '../../types/types';
import getForecastData from '../../api/getForecastData';
import {
  getByKeyStoredCities,
  getStoredForecast,
  storeCity,
  storeForecast,
} from '../../Database/AsyncStorage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import toastMessage from '../../utils/toastMessage';
import getPosition from '../../services/Geolocations';
import getCityByCoords from '../../api/getCityByCoords';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {countries} from 'country-data';
import LoadingFullScreenIcon from '../../components/LoadingFullScreen';
import formatDate from '../../utils/formatDate';
import Language from '../../utils/language';

interface IHomeProps {
  navigation: NativeStackNavigationProp<StackParamList>;
  route: RouteProp<StackParamList>;
}

export enum DatabaseKeys {
  Default = 'default',
  Forecast = 'forecast',
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
      wind_deg: 0,
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

  const cityByParam: ILocations = route.params?.params.city;
  const screenOrigin: string = route.params?.params.screenName;

  async function getForecast(city: ILocations) {
    try {
      const ForecastData: IForecastData = await getForecastData(city);

      const forecastWithCity = {...ForecastData, city};

      setForecastData(forecastWithCity);

      storeForecast(forecastWithCity, DatabaseKeys.Forecast);

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

  async function getDefaultCity(): Promise<ILocations | null> {
    const city = await getByKeyStoredCities(DatabaseKeys.Default);

    return city;
  }

  async function handlePreReload(): Promise<boolean> {
    const storedForecast = await getStoredForecast(DatabaseKeys.Forecast);

    if (storedForecast) {
      console.log(
        'PASSEI STORED FORECAST================',
        storedForecast.current,
      );
      setForecastData(storedForecast);

      setTimeout(() => {
        setIsLoading(false);
      }, 0);

      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }

  const handleReload = async () => {
    setActivityIndicator(true);

    let city: ILocations | null = {
      name: '',
      state: '',
      country: '',
      lat: 0,
      lon: 0,
      countryFull: '',
    };

    try {
      const {position, error} = await getPosition();
      console.log('POSITION============', position);

      if (position) {
        const {latitude, longitude} = position;
        const cityByCoordsResp: ILocations[] = await getCityByCoords(
          latitude,
          longitude,
        );

        const cityByCoords: ILocations = {
          ...cityByCoordsResp[0],
          countryFull: countries[cityByCoordsResp[0].country].name,
        };

        console.log('CITY BY COORDS==============', cityByCoords);
        city = cityByCoords;
        storeCity(city, 'default');
      }
    } catch (error) {
      console.log('ERROR GPS============', error);
      const defaultCity: ILocations | null = await getDefaultCity();
      city = defaultCity;
    }

    console.log('CITY BY PARAMS==============', cityByParam);
    console.log('SCREEN ORIGIN============', screenOrigin);

    if (screenOrigin !== undefined) {
      city = cityByParam;
    }

    if (city === null) {
      navigation.navigate('LocationManager');
      return;
    }
    await getForecast(city);

    navigation.setParams({
      params: {screenName: undefined},
    });

    setIsLoading(false);
    setActivityIndicator(false);
  };

  /* Reload data if app is active */
  /* useEffect(() => {
    const appStateSubscription = AppState.addEventListener(
      'change',
      appState => {
        appState === 'active' ? handleReload() : null;
      },
    );

    return () => {
      appStateSubscription.remove();
    };
  }, []); */

  useEffect(() => {
    (async () => {
      const preLoading = await handlePreReload();
      console.log('PRE LOADING==============>', preLoading);
      !preLoading && handleReload();
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (cityByParam !== undefined) {
        handleReload();
      }
    }, [cityByParam]),
  );

  if (isLoading) {
    return <LoadingFullScreenIcon isLoading={isLoading} size={50} />;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
      }}>
      <ScrollView
        scrollEventThrottle={200}
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
        {activityIndicator ? (
          <View style={{height: 60}}>
            {/* <ActivityIndicator
            animating={activityIndicator}
            size="large"
            color="#FFF"
          /> */}
            <LoadingFullScreenIcon isLoading={activityIndicator} size={30} />
          </View>
        ) : null}

        <HourlyForecast forecastData={forecastData} />
        <Messages forecastData={forecastData} />
        <DailyForecast forecastData={forecastData} />
        <View style={{flex: 1, flexDirection: 'row'}}>
          <UVIndex uv={forecastData.current.uvi} />
          <Humidity humidity={forecastData.current.humidity} />
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Wind
            windSpeed={forecastData.current.wind_speed}
            windDeg={forecastData.current.wind_deg}
          />
          <Sunset forecastData={forecastData} />
        </View>
      </ScrollView>
    </View>
  );
}

export default Home;
