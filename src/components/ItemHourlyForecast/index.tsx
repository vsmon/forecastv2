import React from 'react';
import {View, Text, ScrollView, Image} from 'react-native';

interface HourlyItem {
  dt: number;
  temp: number;
  pop: number;
  icon: string;
  description: string;
}

interface HourlyForecastItem {
  hourlyForecast: HourlyItem[];
}

export default function ItemHourlyForecast({
  hourlyForecast,
}: HourlyForecastItem) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        alignItems: 'center',
      }}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {hourlyForecast.map((item, index) => {
          const temperature: string = item.temp.toFixed(0);
          const date: string = new Date(item.dt * 1000)
            .getHours()
            .toLocaleString();
          const rainProb: number = item.pop * 100;
          return (
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                paddingRight: 15,
                alignItems: 'center',
              }}
              key={index}>
              <Text>{date}:00</Text>
              <Image
                style={{height: 40, width: 40}}
                source={{
                  uri: `https://openweathermap.org/img/wn/${item.icon}@2x.png`,
                }}
              />
              <Text>{temperature}°</Text>
              <Text>G</Text>
              <Text>{rainProb}%</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
