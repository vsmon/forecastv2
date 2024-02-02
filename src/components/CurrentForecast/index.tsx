import React, {useEffect, useState} from 'react';
import {View, Text, Animated, Easing, StyleSheet} from 'react-native';
import {StackParamList} from '../../Routes/Stack';
import GlobalStyle from '../../Constants/GlobalStyle';
import {IForecastData} from '../../types/types';
import {countries} from 'country-data';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import FormatDate from '../../utils/formatDate';
import {ILocations} from '../../types/types';

export interface ICurrentForecast {
  dt: string;
  temp: number;
  feels_like: number;
  description: string;
  icon: string;
  max: number;
  min: number;
  city: ILocations;
  event?: string;
  alertDescription?: string;
  sunrise: number;
  sunset: number;
  uvi: number;
  humidity: number;
  wind_speed: number;
  alerts?: [{event: string; alertDescription: string}];
}

interface ICurrent {
  forecastData: IForecastData;
  animatedValue: Animated.Value;
  navigation: NativeStackNavigationProp<StackParamList>;
  //route: RouteProp<StackParamList>;
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
    city: {name, lat, lon, country, state, countryFull},
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
    city: {
      name,
      lat,
      lon,
      country,
      state,
      countryFull: countries[country].name,
    },
  };
  return Promise.resolve(currentForecast);
}

export default function CurrentForecast({
  forecastData,
  animatedValue,
  navigation,
}: ICurrent) {
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
      countryFull: '',
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
  const [imageSizeValue, setImageSizeValue] = useState<number>(0);

  async function handleReload() {
    const current: ICurrentForecast = await Current(forecastData);

    setCurrentForecast(current);
    console.log('PASSEI CURRENT==========');
  }

  const headerHeight = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [100, 80],
    extrapolate: 'clamp',
  });

  const imageSize = animatedValue.interpolate({
    inputRange: [0, 150],
    outputRange: [150, 105],
    easing: Easing.linear,
    extrapolate: 'clamp',
  });

  const opacityHidden = animatedValue.interpolate({
    inputRange: [0, 25],
    outputRange: [1, 0],
    easing: Easing.linear,
  });
  const opacityShow = animatedValue.interpolate({
    inputRange: [0, 150],
    outputRange: [0, 1],
    easing: Easing.linear,
  });

  /*let valueToChangeTitle: number = 0;

   imageSize.addListener(value => {
    valueToChangeTitle = value.value;

    if (valueToChangeTitle === 120 || valueToChangeTitle === 150) {
      setImageSizeValue(valueToChangeTitle);
    }
  }); */

  opacityShow.addListener(value => {
    if ((value.value >= 0.1 && value.value <= 0.4) || value.value === 0) {
      setImageSizeValue(value.value);
    }
  });

  useEffect(() => {
    handleReload();
  }, [forecastData]);

  useEffect(() => {
    if (imageSizeValue >= 0.1 && imageSizeValue <= 0.4) {
      navigation.navigate('StackScreen', {
        params: {title: currentForecast.city.name},
      });
    } else if (imageSizeValue === 0) {
      navigation.navigate('StackScreen', {
        params: {title: ''},
      });
    }

    return () => opacityShow.removeAllListeners();
  }, [imageSizeValue]);

  return (
    <Animated.View style={[GlobalStyle.container, styles.container]}>
      <Animated.View style={[styles.animatedContainer, {height: headerHeight}]}>
        <View style={styles.tempIconContainer}>
          <View>
            <View style={styles.tempContainer}>
              <Text style={styles.textTemp}>{currentForecast.temp}°</Text>
              <Animated.Text
                style={[styles.textDetails, {opacity: opacityShow}]}>
                {currentForecast.max}° / {currentForecast.min}° {'\n'}
                {currentForecast.description}
              </Animated.Text>
            </View>
            <Animated.Text
              style={[styles.textDescription, {opacity: opacityHidden}]}>
              {currentForecast.description}
            </Animated.Text>
          </View>
          <Animated.View style={styles.iconContainer}>
            <Animated.Image
              style={[styles.icon, {height: imageSize, width: imageSize}]}
              source={{
                uri: `https://openweathermap.org/img/wn/${currentForecast.icon}@2x.png`,
              }}
            />
          </Animated.View>
        </View>
      </Animated.View>
      <Animated.View
        style={[styles.detailsContainer, {opacity: opacityHidden}]}>
        <Text style={styles.textDate}>{currentForecast.dt}</Text>
        <Text style={styles.textLocation}>
          {currentForecast.city.name}
          {currentForecast.city.state
            ? ' - ' + currentForecast.city.state
            : null}
          {', '}
          {currentForecast.city.countryFull}{' '}
          <Icon name="map-marker" size={14} color={'#FFF'} />
        </Text>
        <Text style={styles.textTempMaxMin}>
          {currentForecast.max}° / {currentForecast.min}° {}
          Sensação térmica de {currentForecast.feels_like}°
        </Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 0,
    alignItems: 'stretch',
    borderRadius: 0,
    marginTop: 0,
    backgroundColor: 'transparent',
  },
  animatedContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#000',
    height: 350,
  },
  tempContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'blue',
  },
  tempIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //backgroundColor: 'blue',
    flex: 1,
  },
  detailsContainer: {
    padding: 20,
    opacity: 1,
  },
  textLocation: {
    marginBottom: 5,
    fontSize: 14,
    flexDirection: 'row',
    color: '#FFF',
  },
  textTemp: {
    marginBottom: 5,
    fontSize: 60,
    color: '#FFF',
    marginRight: 15,
  },
  textDetails: {
    fontSize: 18,
    color: '#FFF',
    opacity: 1,
  },
  textDate: {marginBottom: 5, fontSize: 14, color: '#FFF'},
  textTempMaxMin: {fontSize: 11, color: '#FFF'},
  textDescription: {
    marginBottom: 30,
    fontSize: 18,
    color: '#FFF',
    opacity: 0,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    flex: 1,
    height: 150,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
