import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, NativeModules} from 'react-native';
import GlobalStyle from '../../Constants/GlobalStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {IForecastData} from '../../types/types';

export interface IAlertsForecast {
  alertEvent: string | undefined;
  alertDescription: string | undefined;
  alerts?: [{event: string; description: string}];
}
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
    alertDescription:
      NativeModules.I18nManager.localeIdentifier === 'pt_BR'
        ? `Nenhum Alerta no momento`
        : `No Alerts at the moment`,
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
  }, [forecastData]);

  return (
    <View style={GlobalStyle.container}>
      <View style={styles.container}>
        <Icon name="alert" color={'#e5f50e'} size={26} />
        <Text style={styles.textTitleAlert}>{alertsForecast?.alertEvent}</Text>
        <Text style={styles.textDescAlert}>
          {alertsForecast?.alertDescription}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  textTitleAlert: {marginBottom: 10, fontSize: 12, color: '#FFF'},
  textDescAlert: {marginBottom: 10, fontSize: 12, color: '#FFF'},
});
