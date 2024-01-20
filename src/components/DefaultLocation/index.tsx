import React from 'react';
import {View, Text, Pressable, Alert} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Locations} from '../../types/types';
import {StackParamList} from '../../Routes/Stack';

interface DefaultLocations {
  city: Locations | undefined;
  navigation: NavigationProp<StackParamList>;
}

export default function DefaultLocation({city, navigation}: DefaultLocations) {
  return (
    <View
      style={{
        backgroundColor: '#171517',

        margin: 5,
        marginBottom: 15,
        borderRadius: 15,
      }}>
      <Pressable
        onPress={() => {
          navigation.navigate('Home', {
            params: {city, screenName: 'DefaultLocation'},
          });
        }}>
        <View style={{padding: 25}}>
          <View>
            <Icon name="star" size={22} color={'#e7ff0d'} />
            <Text style={{fontSize: 18, color: '#FFF'}}>{city?.name}</Text>
          </View>

          <View style={{justifyContent: 'flex-start'}}>
            {city?.state ? (
              <Text style={{fontSize: 14}}>
                {city.state},{city.country}
              </Text>
            ) : (
              <Text style={{fontSize: 14}}>{city?.country}</Text>
            )}
          </View>
        </View>
      </Pressable>
    </View>
  );
}
