import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Locations} from '../../types/types';
import {StackParamList} from '../../routes';

interface ItemLocations {
  city: Locations;
  navigation: NavigationProp<StackParamList>;
}

export default function ItemLocations({city, navigation}: ItemLocations) {
  return (
    <View>
      <Pressable
        onPress={() => {
          navigation.navigate('Home', {params: city});
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#171517',
            justifyContent: 'center',
            padding: 25,
            margin: 5,
            marginBottom: 15,
            borderRadius: 15,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              backgroundColor: '#171517',
              alignItems: 'center',
            }}>
            <Icon name="map-marker" size={22} color={'#FFF'} />
            <Text style={{fontSize: 18, color: '#FFF'}}>{city.name}</Text>
          </View>
          {city.state ? (
            <Text style={{fontSize: 14}}>
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
