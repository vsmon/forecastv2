import React from 'react';
import {View, Text, Image} from 'react-native';
import GlobalStyle from '../../Constants/GlobalStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Daily {
  dt: number;
  min: number;
  max: number;
  pop: number;
  icon: string;
}

interface DailyForecast {
  dailyForecast: Daily[];
}

export default function DailyForecast({dailyForecast}: DailyForecast) {
  const weekDay: Array<string> = [
    'Domingo',
    'Segunda',
    'Terca',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sabado',
  ];
  return (
    <View style={[GlobalStyle.container, {alignItems: 'stretch'}]}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{marginBottom: 5, fontSize: 12}}>Ontem</Text>
        <Text style={{marginBottom: 5, fontSize: 12, paddingLeft: 5}}>
          {dailyForecast[0].max.toFixed(0)}°{'  '}
          {dailyForecast[0].min.toFixed(0)}°
        </Text>
      </View>
      <View style={{backgroundColor: '#FFF2', height: 1, margin: 15}}></View>

      {dailyForecast.map((item, index) => {
        const date: number = Number(
          new Date(item.dt * 1000).getDay().toLocaleString(),
        );
        const rainProb: number = item.pop * 100;
        console.log(item.pop);
        return (
          <View
            key={index}
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}>
              <Text style={{color: '#FFF'}}>
                {index === 0 ? 'Hoje' : weekDay[date]}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                name={rainProb <= 10 ? 'water-outline' : 'water'}
                size={28}
                color={'skyblue'}
              />
              <View
                style={{
                  flex: 1,
                }}>
                <Text> {rainProb.toFixed(0)}%</Text>
              </View>
            </View>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                style={{height: 40, width: 40}}
                source={{
                  uri: `https://openweathermap.org/img/wn/${item.icon}@2x.png`,
                }}
              />
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Text
                style={{
                  marginBottom: 5,
                  fontSize: 12,
                  paddingLeft: 5,
                  color: '#FFF',
                }}>
                {dailyForecast[0].max.toFixed(0)}°{'  '}
                {dailyForecast[0].min.toFixed(0)}°
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}
