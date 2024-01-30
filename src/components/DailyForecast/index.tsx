import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import GlobalStyle from '../../Constants/GlobalStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {IDailyForecast, IForecastData} from '../../Pages/Home';
import WeekDay from '../../utils/weekDay';

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
  }, []);
  return (
    <View style={[GlobalStyle.container, {alignItems: 'stretch'}]}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{marginBottom: 5, fontSize: 12, color: '#FFF9'}}>
          Ontem
        </Text>
        <Text
          style={{
            marginBottom: 5,
            fontSize: 14,
            paddingLeft: 5,
            color: '#FFF9',
          }}>
          {dailyForecast[0].max}°{'  '}
          {dailyForecast[0].min}°
        </Text>
      </View>
      <View style={{backgroundColor: '#FFF2', height: 1, margin: 15}}></View>

      {dailyForecast.map((item: Daily, index: number) => {
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
                {index === 0 ? 'Hoje' : item.week}
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
                name={item.pop <= 10 ? 'water-outline' : 'water'}
                size={24}
                color={'skyblue'}
              />
              <View
                style={{
                  flex: 1,
                }}>
                <Text style={{color: '#FFF9', fontSize: 12}}> {item.pop}%</Text>
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

            <Icon name={MoonPhase(item.moon_phase)} size={22} color={'#FFF9'} />
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Text
                style={{
                  marginBottom: 5,
                  fontSize: 14,
                  paddingLeft: 5,
                  color: '#FFF',
                }}>
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
