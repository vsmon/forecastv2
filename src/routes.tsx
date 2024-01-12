import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {View, Text} from 'react-native';

import Home from './Pages/Home';
import Settings from './Pages/Settings';

type DrawerParamList = {
  Home: undefined;
  Settings: undefined;
};

const Drawer = createDrawerNavigator();

function Route() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitle: '',
          headerStyle: {backgroundColor: '#000'},
          headerTintColor: '#FFF',
        }}>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Settings" component={Settings} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Route;
