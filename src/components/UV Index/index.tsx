import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import GlobalStyle from '../../Constants/GlobalStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface uv {
  uv: number;
}

export default function UVIndex({uv}: uv) {
  let uvDescription;
  if (uv <= 2) {
    uvDescription = 'Baixo';
  } else if (uv > 2 && uv <= 5) {
    uvDescription = 'Moderado';
  } else if (uv > 5 && uv <= 7) {
    uvDescription = 'Alto';
  } else if (uv > 7 && uv <= 10) {
    uvDescription = 'Muito Alto';
  } else if (uv >= 10) {
    uvDescription = 'Extremo';
  }

  return (
    <View style={GlobalStyle.container}>
      <Icon name="sun-wireless" size={32} color={'#f7e708'} />
      <Text style={styles.textTitle}>Índice UV</Text>
      <Text style={styles.textDescription}>{uvDescription}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textTitle: {
    color: '#FFF',
    marginTop: 10,
  },
  textDescription: {color: '#FFF9'},
});
