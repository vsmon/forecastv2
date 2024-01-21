import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Settings from '../../Pages/Settings/index';
import StackScreen from '../Stack';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
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
        options={{
          headerShown: true,
          drawerHideStatusBarOnOpen: false,
        }}
      />
    </Drawer.Navigator>
  );
}
