import React from 'react';
import {View, Text, Image} from 'react-native';

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
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        padding: 20,
        borderColor: '#FFF2',
        borderWidth: 2,
        margin: 5,
        borderRadius: 25,
        marginBottom: 20,
        backgroundColor: '#FFF1',
      }}>
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
        return (
          <View key={index} style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={{color: '#FFF'}}>
                {index === 0 ? 'Hoje' : weekDay[date]}
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text>{rainProb}%</Text>
            </View>
            <View style={{flex: 1}}>
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
