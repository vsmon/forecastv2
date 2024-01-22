import React from 'react';
import {View, Text} from 'react-native';
import GlobalStyle from '../../Constants/GlobalStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface humidity {
  humidity: number | undefined;
}

export default function Humidity({humidity}: humidity) {
  return (
    <View style={GlobalStyle.container}>
      <Icon name="water" size={32} color={'#00b7ff'} />
      <Text style={{color: '#FFF', marginTop: 10}}>Umidade</Text>
      <Text style={{color: '#FFF9'}}>{humidity}%</Text>
    </View>
  );
}
