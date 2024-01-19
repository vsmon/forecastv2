import React from 'react';
import {View, Text} from 'react-native';
import GlobalStyle from '../../Constants/GlobalStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {IAlertsForecast} from '../../Pages/Home';

interface IAlerts {
  message: IAlertsForecast | any;
}
export default function MessagesForecast({message}: IAlerts) {
  return (
    <View style={GlobalStyle.container}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Icon name="alert" color={'#e5f50e'} size={26} />
        <Text style={{marginBottom: 10, fontSize: 12, color: '#FFF'}}>
          {message?.alertEvent}
        </Text>
        <Text style={{marginBottom: 10, fontSize: 12, color: '#FFF'}}>
          {message?.alertDescription}
        </Text>
      </View>
    </View>
  );
}
