import React from 'react';
import {View, Text} from 'react-native';

function Settings() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
      }}>
      <Text style={{fontSize: 50, color: '#FFF'}}>Settings</Text>
    </View>
  );
}

export default Settings;
