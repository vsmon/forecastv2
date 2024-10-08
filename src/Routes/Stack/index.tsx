import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import Home from '../../Pages/Home';
import SearchLocation from '../../Pages/SearchLocation';
import LocationManager from '../../Pages/LocationManager';
import {NativeModules} from 'react-native';
import Language from '../../utils/language';

export type StackParamList = {
  Home: any;
  Settings: any;
  LocationManager: any;
  SearchLocation: any;
  StackScreen: any;
};

interface IStackNavigationProps {
  navigation: NativeStackNavigationProp<StackParamList>;
}

const Stack = createNativeStackNavigator<StackParamList>();

export default function StackNavigator({navigation}: IStackNavigationProps) {
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
        options={{
          headerShown: true,
          headerTitle:
            Language() === 'pt_BR'
              ? 'Gerenciar Localizações'
              : 'Locations Management',
        }}
      />
      <Stack.Screen
        name="SearchLocation"
        component={SearchLocation}
        options={{
          headerShown: true,
          headerTitle:
            Language() === 'pt_BR'
              ? 'Pesquisar Localização'
              : 'Search Location',
        }}
      />
    </Stack.Navigator>
  );
}
