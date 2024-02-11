import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import GlobalStyle from '../../Constants/GlobalStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {IForecastData} from '../../types/types';
import WeekDay from '../../utils/weekDay';
import {FlatList} from 'react-native-gesture-handler';

export interface IDailyForecast {
  dt: number;
  min: number;
  max: number;
  week: string;
  pop: number;
  icon: string;
  moon_phase: number;
}
interface Daily {
  dt: number;
  week: string;
  min: number | 0;
  max: number | 0;
  pop: number;
  icon: string;
  moon_phase: number;
}

interface IDaily {
  forecastData: IForecastData;
}

/* enum MoonPhase {
  'moon-first-quarter' = 0.25,
  'moon-full' = 0.5,
  'moon-last-quarter' = 0.75,
  'moon-new' = 0 | 1,
  'moon-waning-crescent' = 4,
  'moon-waning-gibbous' = 6,
  'moon-waxing-crescent' = 7,
  'moon-waxing-gibbous' = 8
} */

/* daily.moon_phase Moon phase. 
0 and 1 are 'new moon', 
0.25 is 'first quarter moon', 
0.5 is 'full moon' and 
0.75 is 'last quarter moon'. 
The periods in between are called 
'waxing crescent', 
'waxing gibbous', 
'waning gibbous', 
and 'waning crescent', respectively. */

function MoonPhase(moonPhase: number): string {
  let iconName: string = '';
  switch (true) {
    case moonPhase === 0:
      iconName = 'moon-new';
      break;
    case moonPhase === 1:
      iconName = 'moon-new';
      break;
    case moonPhase === 0.25:
      iconName = 'moon-first-quarter';
      break;
    case moonPhase === 0.5:
      iconName = 'moon-full';
      break;
    case moonPhase === 0.75:
      iconName = 'moon-last-quarter';
      break;
    case moonPhase > 0 && moonPhase < 0.25:
      iconName = 'moon-waxing-crescent';
      break;
    case moonPhase > 0.25 && moonPhase < 0.5:
      iconName = 'moon-waxing-gibbous';
      break;
    case moonPhase > 0.5 && moonPhase < 0.75:
      iconName = 'moon-waning-gibbous';
      break;
    case moonPhase > 0.75 && moonPhase < 1:
      iconName = 'moon-waning-crescent';
      break;
    default:
      iconName = 'moon-full';
      break;
  }
  return iconName;
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
export default function DailyForecast({forecastData}: IDaily) {
  const [dailyForecast, setDailyForecast] = useState<IDailyForecast[]>([
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

  async function handleReload() {
    const daily: IDailyForecast[] = await Daily(forecastData);
    setDailyForecast(daily);
    console.log('PASSEI DAILY==========');
  }

  useEffect(() => {
    handleReload();
  }, [forecastData]);

  return (
    <View style={[GlobalStyle.container, {alignItems: 'stretch'}]}>
      <View style={styles.yesterdayContainer}>
        <Text style={styles.textYesterdayTitle}>Ontem</Text>
        <Text style={styles.textMinMaxYesterday}>
          {dailyForecast[0].max}°{'  '}
          {dailyForecast[0].min}°
        </Text>
      </View>

      <View style={styles.horizontalLine}></View>

      {dailyForecast.map((item: Daily, index: number) => {
        return (
          <View key={index} style={styles.itemContainer}>
            <Text style={styles.textWeek}>
              {index === 0 ? 'Hoje' : item.week}
            </Text>
            <View style={styles.rainContainer}>
              <Icon
                name={item.pop <= 10 ? 'water-outline' : 'water'}
                size={24}
                color={'skyblue'}
              />
              <Text style={styles.textRain}> {item.pop}%</Text>
            </View>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{
                  uri: `https://openweathermap.org/img/wn/${item.icon}@2x.png`,
                }}
              />
            </View>
            <View style={styles.moonPhaseContainer}>
              <Icon
                name={MoonPhase(item.moon_phase)}
                size={22}
                color={'#FFF9'}
              />
            </View>
            <View style={styles.tempMaxMinContainer}>
              <Text style={styles.textMaxMinTemp}>
                {item.max}°{'  '}
                {item.min}°
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  yesterdayContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textYesterdayTitle: {marginBottom: 5, fontSize: 12, color: '#FFF9'},
  textMinMaxYesterday: {
    marginBottom: 5,
    fontSize: 14,
    paddingLeft: 5,
    color: '#FFF9',
  },
  horizontalLine: {backgroundColor: '#FFF2', height: 1, margin: 15},
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textWeek: {color: '#FFF', width: 100},
  rainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 70,
  },
  textRain: {
    color: '#FFF9',
    fontSize: 12,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {height: 40, width: 40},
  moonPhaseContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  tempMaxMinContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  textMaxMinTemp: {
    fontSize: 14,
    color: '#FFF',
  },
});
