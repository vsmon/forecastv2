import React from 'react';
import {NavigationContainer, NavigationProp} from '@react-navigation/native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './Pages/Home';
import Settings from './Pages/Settings';
import SearchLocation from './Pages/SearchLocation';
import LocationManager from './Pages/LocationManager';

export type StackParamList = {
  Home: any;
  Settings: any;
  LocationManager: any;
  SearchLocation: any;
};

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator<StackParamList>();

function StackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#000'},
        headerTintColor: '#FFF',
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LocationManager"
        component={LocationManager}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="SearchLocation"
        component={SearchLocation}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
}

function Route() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={props => <Settings {...props} />}
        screenOptions={{
          headerTitle: '',
          headerStyle: {backgroundColor: '#000'},
          headerShadowVisible: false,
          headerTintColor: '#FFF',
          headerBackgroundContainerStyle: {backgroundColor: '#FFF'},
          headerShown: true,
        }}>
        <Drawer.Screen
          name="StackScreen"
          component={StackScreen}
          options={{headerShown: true}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Route;
