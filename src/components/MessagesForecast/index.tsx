import React from 'react';
import {View, Text} from 'react-native';
import GlobalStyle from '../../Constants/GlobalStyle';

interface Alerts {
  event: string;
  alertDescription: string;
}

interface AlertsForecast {
  message: Alerts;
}
export default function MessagesForecast({message}: AlertsForecast) {
  return (
    <View style={GlobalStyle.container}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {/* <Text
          style={{
            marginBottom: 10,
            fontSize: 16,
            color: '#FFF',
            fontWeight: 'bold',
          }}>
          Alerts
        </Text> */}
        <Text style={{marginBottom: 10, fontSize: 12, color: '#FFF'}}>
          {message.event}
        </Text>
        <Text style={{marginBottom: 10, fontSize: 12, color: '#FFF'}}>
          {message.alertDescription}
        </Text>
      </View>
    </View>
  );
}
