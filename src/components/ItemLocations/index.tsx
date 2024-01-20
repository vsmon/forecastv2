import React from 'react';
import {View, Text, Pressable, Alert} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Locations} from '../../types/types';
import {StackParamList} from '../../Routes/Stack';

interface ItemLocations {
  city: Locations;
  navigation: NavigationProp<StackParamList>;
  onPress: any;
  starColor: string;
}

export default function ItemLocations({
  city,
  navigation,
  onPress,
  starColor,
}: ItemLocations) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#171517',
        justifyContent: 'center',
        //padding: 25,
        margin: 5,
        marginBottom: 15,
        borderRadius: 15,
      }}>
      <Pressable
        onPress={() => {
          navigation.navigate('Home', {
            params: {city, screenName: 'ItemLocations'},
          });
        }}>
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
            <Icon name="star" size={22} color={starColor} onPress={onPress} />
          </View>
          {city.state ? (
            <Text style={{fontSize: 12}}>
              {city.state},{city.country}
            </Text>
          ) : (
            <Text style={{fontSize: 14}}>{city.country}</Text>
          )}
        </View>
      </Pressable>
    </View>
  );
}
