import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import GlobalStyle from '../../Constants/GlobalStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {IAlertsForecast, IForecastData} from '../../Pages/Home';

interface IAlerts {
  forecastData: IForecastData;
}

function Alerts(ForecastData: IForecastData): IAlertsForecast {
  if (ForecastData.alerts) {
    const {event, description} = ForecastData.alerts[0] || {};
    return {alertEvent: event, alertDescription: description};
  }
  return {
    alertEvent: '',
    alertDescription: 'Nenhum Alerta no momento',
  };
}

export default function MessagesForecast({forecastData}: IAlerts) {
  const [alertsForecast, setAlertsForecast] = useState<IAlertsForecast | null>(
    null,
  );
  async function handleReload() {
    const alerts: IAlertsForecast = Alerts(forecastData);
    setAlertsForecast(alerts);
    console.log('PASSEI ALERTS==========');
  }
  useEffect(() => {
    handleReload();
  }, []);
  return (
    <View style={GlobalStyle.container}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Icon name="alert" color={'#e5f50e'} size={26} />
        <Text style={{marginBottom: 10, fontSize: 12, color: '#FFF'}}>
          {alertsForecast?.alertEvent}
        </Text>
        <Text style={{marginBottom: 10, fontSize: 12, color: '#FFF'}}>
          {alertsForecast?.alertDescription}
        </Text>
      </View>
    </View>
  );
}
