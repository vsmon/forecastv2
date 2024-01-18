import React from 'react';
import {View, Text} from 'react-native';
import GlobalStyle from '../../Constants/GlobalStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface wind {
  wind: number | undefined;
}

export default function Wind({wind}: wind) {
  return (
    <View style={GlobalStyle.container}>
      <Icon name="weather-windy" size={32} />
      <Text style={{color: '#FFF'}}>Vento</Text>
      <Text>{wind} km/h</Text>
    </View>
  );
}
