import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import DrawerNavigator from './Drawer';

function Routes() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}

export default Routes;
