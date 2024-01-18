import React from 'react';
import {View, Text} from 'react-native';
import GlobalStyle from '../../Constants/GlobalStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Alerts {
  event: string;
  alertDescription: string;
}

interface AlertsForecast {
  message: Alerts | any;
}
export default function MessagesForecast({message}: AlertsForecast) {
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
