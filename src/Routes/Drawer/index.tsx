import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Settings from '../../Pages/Settings/index';
import StackScreen, { StackParamList } from '../Stack';
import LocationManager from '../../Pages/LocationManager';
import Language from '../../utils/language';
import SearchLocation from '../../Pages/SearchLocation';
import Home from '../../Pages/Home';

const Drawer = createDrawerNavigator<StackParamList>();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="StackScreen"
      drawerContent={props => <Settings {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: '#000' },
        headerShadowVisible: false,
        headerTintColor: '#FFF',
        headerBackgroundContainerStyle: { backgroundColor: '#FFF' },
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="StackScreen"
        component={StackScreen}
        options={({ route }) => {
          const title = route.params?.params.title;
          console.log('PARAM===========', route.params?.params.title);
          return {
            headerShown: true,
            headerTitle: title ?? '',
            drawerHideStatusBarOnOpen: false,
          };
        }}
      />
    </Drawer.Navigator>
  );
}
