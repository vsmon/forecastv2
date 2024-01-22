import React from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface HourlyItem {
  dt: string;
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
          return (
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                paddingRight: 15,
                alignItems: 'center',
              }}
              key={index}>
              <Text style={{color: '#FFF9'}}>{item.dt}</Text>
              <Image
                style={{
                  height: 40,
                  width: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                source={{
                  uri: `https://openweathermap.org/img/wn/${item.icon}@2x.png`,
                }}
              />
              <Text style={{color: '#FFF'}}>{item.temp}°</Text>
              {/* <Text>G</Text> */}
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon
                  name={item.pop <= 10 ? 'water-outline' : 'water'}
                  size={18}
                  color={'skyblue'}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: '#FFF9',
                    marginTop: 10,
                  }}>
                  {item.pop}%
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
