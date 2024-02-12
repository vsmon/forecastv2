import React from 'react';
import {View, Text, StyleSheet, NativeModules} from 'react-native';
import GlobalStyle from '../../Constants/GlobalStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface uv {
  uv: number;
}

export default function UVIndex({uv}: uv) {
  let uvDescription: string = '';
  if (uv <= 2) {
    uvDescription =
      NativeModules.I18nManager.localeIdentifier === 'pt_BR' ? 'Baixo' : 'Low';
  } else if (uv > 2 && uv <= 5) {
    uvDescription = uvDescription =
      NativeModules.I18nManager.localeIdentifier === 'pt_BR'
        ? 'Moderado'
        : 'Moderate';
  } else if (uv > 5 && uv <= 7) {
    uvDescription = uvDescription =
      NativeModules.I18nManager.localeIdentifier === 'pt_BR' ? 'Alto' : 'High';
  } else if (uv > 7 && uv <= 10) {
    uvDescription = uvDescription =
      NativeModules.I18nManager.localeIdentifier === 'pt_BR'
        ? 'Muito Alto'
        : 'Very High';
  } else if (uv >= 10) {
    uvDescription = uvDescription =
      NativeModules.I18nManager.localeIdentifier === 'pt_BR'
        ? 'Extremo'
        : 'Extreme';
  }

  return (
    <View style={GlobalStyle.container}>
      <Icon name="sun-wireless" size={32} color={'#f7e708'} />
      <Text style={styles.textTitle}>
        {NativeModules.I18nManager.localeIdentifier === 'pt_BR'
          ? 'Índice UV'
          : 'UV index'}
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
