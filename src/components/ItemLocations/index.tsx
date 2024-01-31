import React, {useState} from 'react';
import {View, Text, Pressable, Alert} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ILocations} from '../../types/types';
import {StackParamList} from '../../Routes/Stack';

interface ItemLocations {
  city: ILocations;
  navigation: NavigationProp<StackParamList>;
  onPress: any;
  onLongPress: any;
  starColor: string;
}

export default function ItemLocations({
  city,
  navigation,
  onPress,
  onLongPress,
  starColor,
}: ItemLocations) {
  const [isRemoveCity, setIsRevomeCity] = useState<boolean>(false);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#171517',
        justifyContent: 'center',
        margin: 5,
        marginBottom: 15,
        borderRadius: 15,
      }}>
      <Pressable
        android_ripple={{
          color: 'gray',
          foreground: false,
          radius: 200,
          borderless: false,
        }}
        onPress={() => {
          navigation.navigate('Home', {
            params: {city, screenName: 'ItemLocations'},
          });
        }}
        onLongPress={() => setIsRevomeCity(!isRemoveCity)}>
        <View style={{padding: 25}}>
          <Icon name="map-marker" size={22} color={'#FFF'} />
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 18, color: '#FFF'}}>{city.name}</Text>

            {isRemoveCity ? (
              <Icon
                name="delete"
                size={22}
                color={'#ff0303'}
                onPress={onLongPress}
              />
            ) : (
              <Icon name="star" size={22} color={starColor} onPress={onPress} />
            )}
          </View>
          {city.state ? (
            <Text style={{fontSize: 12, color: '#FFF9'}}>
              {city.state}, {city.countryFull}
            </Text>
          ) : (
            <Text style={{fontSize: 14, color: '#FFF9'}}>
              {city.countryFull}
            </Text>
          )}
        </View>
      </Pressable>
    </View>
  );
}
