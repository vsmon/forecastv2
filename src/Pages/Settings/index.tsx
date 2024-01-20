import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Locations} from '../../types/types';
import {
  getAllStoredCities,
  getByKeyStoredCities,
} from '../../Database/AsyncStorage';
import {
  useDrawerStatus,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {ScrollView} from 'react-native-gesture-handler';

export default function Settings({navigation}: DrawerContentComponentProps) {
  const [locations, setLocations] = useState<Locations[]>([]);
  const [defaultLocation, setDefaultLocation] = useState<Locations>();

  async function handleReload() {
    const cities: Locations[] = await getAllStoredCities();
    setLocations(cities);

    const city = await getByKeyStoredCities('default');

    setDefaultLocation(city);
  }

  useEffect(() => {
    handleReload();
  }, [useDrawerStatus()]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#171517',
        padding: 25,
      }}>
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            //flex: 1,
            backgroundColor: '#171517',
            justifyContent: 'center',
            //padding: 25,
            margin: 5,
            marginBottom: 15,
            borderRadius: 15,
          }}>
          <View>
            <View style={{flexDirection: 'row', marginBottom: 20}}>
              <Icon name="star" size={22} color={'#e7ff0d'} />
              <Text style={{fontSize: 18, marginLeft: 10}}>
                Localização Favorita
              </Text>
            </View>

            <Pressable
              style={{
                marginBottom: 20,
                flexDirection: 'row',
                padding: 15,
              }}
              onPress={() =>
                navigation.navigate('Home', {
                  params: {city: defaultLocation, screenName: 'Settings'},
                })
              }>
              <Icon name="map-marker" size={22} />
              <Text style={{fontSize: 18, marginLeft: 10, color: '#FFF'}}>
                {defaultLocation?.name}, {defaultLocation?.country}
              </Text>
            </Pressable>
            {/* <DefaultLocation city={defaultLocation} navigation={navigation} /> */}
          </View>
          <View style={{flexDirection: 'row', marginBottom: 20}}>
            <Icon name="map-marker-multiple" size={22} color={'#e7ff0d'} />
            <Text style={{fontSize: 18, marginLeft: 10}}>
              Outras Localizações
            </Text>
          </View>
          <View>
            <FlatList
              nestedScrollEnabled={true}
              data={locations}
              renderItem={({item, separators}) => (
                <Pressable
                  style={{
                    marginBottom: 5,
                    flexDirection: 'row',
                    padding: 15,
                  }}
                  onPress={() =>
                    navigation.navigate('Home', {
                      params: {city: item, screenName: 'Settings'},
                    })
                  }>
                  {/* <Icon name="map-marker" size={22} /> */}
                  <Text
                    style={{
                      fontSize: 18,
                      marginLeft: 10,
                      color: '#FFF',
                    }}>
                    {item.name}, {item.country}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </View>
      </ScrollView>
      <Pressable
        style={{
          backgroundColor: '#FFF3',
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 15,
        }}
        onPress={() => navigation.navigate('LocationManager')}>
        <Text>Gerenciar Localizações</Text>
      </Pressable>
    </View>
  );
}
