import React from 'react';
import {View, Text, Image, Animated} from 'react-native';
import GlobalStyle from '../../Constants/GlobalStyle';
import {ICurrentForecast} from '../../Pages/Home';
import {countries} from 'country-data';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ICurrent {
  currentForecast: ICurrentForecast;
  animatedValue: Animated.Value;
}

export default function CurrentForecast({
  currentForecast,
  animatedValue,
}: ICurrent) {
  const headerHeight = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [100, 80],
    extrapolate: 'clamp',
  });

  const imageSize = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [180, 120],
    extrapolate: 'clamp',
  });

  const opacityHidden = animatedValue.interpolate({
    inputRange: [0, 25],
    outputRange: [1, 0],
  });
  const opacityShow = animatedValue.interpolate({
    inputRange: [0, 150],
    outputRange: [0, 1],
  });

  return (
    <Animated.View
      style={[
        GlobalStyle.container,
        {
          flex: 0,
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 0,
          alignItems: 'stretch',
          borderRadius: 0,
          marginTop: 0,
          backgroundColor: 'transparent',
        },
      ]}>
      <Animated.View
        style={{
          flex: 1,
          paddingLeft: 20,
          paddingRight: 20,
          backgroundColor: '#000',
          height: headerHeight,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            //backgroundColor: 'blue',
            flex: 1,
          }}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{marginBottom: 5, fontSize: 48, color: '#FFF'}}>
                {currentForecast.temp}°{' '}
              </Text>
              <Animated.Text
                style={{
                  fontSize: 14,
                  color: '#FFF',
                  opacity: opacityShow,
                }}>
                {currentForecast.max}° / {currentForecast.min}° {'\n'}
                {currentForecast.description}
              </Animated.Text>
            </View>
            <Animated.Text
              style={{
                marginBottom: 30,
                fontSize: 18,
                color: '#FFF',
                opacity: opacityHidden,
              }}>
              {currentForecast.description}
            </Animated.Text>
          </View>
          <View
            style={{
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              marginTop: -30,
              //backgroundColor: 'red',
            }}>
            <Animated.Image
              style={{height: imageSize, width: imageSize}}
              source={{
                uri: `https://openweathermap.org/img/wn/${currentForecast.icon}@2x.png`,
              }}
            />
          </View>
        </View>
      </Animated.View>
      <Animated.View
        style={{
          padding: 20,
          opacity: opacityHidden,
        }}>
        <Text style={{marginBottom: 5, fontSize: 14, color: '#FFF'}}>
          {currentForecast.dt}
        </Text>
        <Text
          style={{
            marginBottom: 5,
            fontSize: 14,
            flexDirection: 'row',
            color: '#FFF',
          }}>
          {currentForecast.city?.name}
          {currentForecast.city?.state
            ? ' - ' + currentForecast.city.state
            : null}
          {', '}
          {countries[currentForecast.city!.country]?.name}{' '}
          <Icon name="map-marker" size={14} color={'#FFF'} />
        </Text>
        <Text style={{fontSize: 11, color: '#FFF'}}>
          {currentForecast.max}° / {currentForecast.min}° {}
          Sensação térmica de {currentForecast.feels_like}°
        </Text>
      </Animated.View>
    </Animated.View>
  );
}
