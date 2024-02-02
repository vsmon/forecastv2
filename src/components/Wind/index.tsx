import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import GlobalStyle from '../../Constants/GlobalStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface wind {
  wind: number | undefined;
}

export default function Wind({wind}: wind) {
  return (
    <View style={GlobalStyle.container}>
      <Icon name="weather-windy" size={32} color={'#FFF9'} />
      <Text style={styles.textTitle}>Vento</Text>
      <Text style={styles.textDescription}>{wind} km/h</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textTitle: {color: '#FFF', marginTop: 10},
  textDescription: {color: '#FFF9'},
});
