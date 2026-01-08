import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import DrawerNavigator from './Drawer';
import StackNavigator from './Stack';

function Routes() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}

export default Routes;
