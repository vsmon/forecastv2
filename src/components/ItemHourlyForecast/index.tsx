import React from 'react';
import {View, Text, ScrollView, Image, StyleSheet} from 'react-native';
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
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {hourlyForecast.map((item, index) => {
          return (
            <View style={styles.detailContainer} key={index}>
              <Text style={{color: '#FFF9'}}>{item.dt}</Text>
              <Image
                style={styles.icon}
                source={{
                  uri: `https://openweathermap.org/img/wn/${item.icon}@2x.png`,
                }}
              />
              <Text style={styles.textTemp}>{item.temp}°</Text>
              {/* <Text>Graphic</Text> */}
              <View style={styles.rainContainer}>
                {item.pop > 0 && item.pop <= 50 ? (
                  <View style={styles.halfRainIcon} />
                ) : null}
                <Icon
                  name={item.pop <= 50 ? 'water-outline' : 'water'}
                  size={18}
                  color={'skyblue'}
                />
                <Text style={styles.textRain}>{item.pop}%</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    alignItems: 'center',
  },
  detailContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingRight: 15,
    alignItems: 'center',
  },
  icon: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTemp: {color: '#FFF', marginBottom: 5},
  rainContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textRain: {
    fontSize: 12,
    color: '#FFF9',
    alignSelf: 'center',
  },
  halfRainIcon: {
    height: 5,
    width: 7,
    marginRight: -13,
    marginBottom: -8,
    borderBottomLeftRadius: 3.5,
    borderBottomRightRadius: 3.5,
    backgroundColor: 'skyblue',
  },
});
