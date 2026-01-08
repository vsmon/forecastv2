import React from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';

import Routes from './src/Routes/routes';
function App() {
  return (
    <>
      <StatusBar backgroundColor="#000" barStyle={'light-content'} />
      <Routes />
    </>
  );
}

export default App;
