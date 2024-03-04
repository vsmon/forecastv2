import React from 'react';
import {View, Text, StyleSheet, NativeModules} from 'react-native';
import GlobalStyle from '../../Constants/GlobalStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Language from '../../utils/language';

interface uv {
  uv: number;
}

export default function UVIndex({uv}: uv) {
  let uvDescription: string = '';
  switch (true) {
    case uv <= 2.9 /* 1 until 2 */:
      uvDescription = Language() === 'pt_BR' ? 'Baixo' : 'Low';
      break;
    case uv >= 3 && uv <= 5.9 /* 3 until 5 */:
      uvDescription = uvDescription =
        Language() === 'pt_BR' ? 'Moderado' : 'Moderate';
      break;
    case uv >= 6 && uv <= 7.9 /* 6 until 7 */:
      uvDescription = uvDescription = Language() === 'pt_BR' ? 'Alto' : 'High';
      break;
    case uv >= 8 && uv <= 10.9 /* 8 until 10 */:
      uvDescription = uvDescription =
        Language() === 'pt_BR' ? 'Muito Alto' : 'Very High';
      break;
    case uv >= 11:
      uvDescription = uvDescription =
        Language() === 'pt_BR' ? 'Extremo' : 'Extreme';
      break;
    default:
      uvDescription = 'Value out of range';
      break;
  }

  return (
    <View style={GlobalStyle.container}>
      <Icon name="sun-wireless" size={32} color={'#f7e708'} />
      <Text style={styles.textTitle}>
        {Language() === 'pt_BR' ? 'Índice UV' : 'UV index'}
      </Text>
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
