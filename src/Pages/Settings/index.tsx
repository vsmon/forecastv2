import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Pressable, NativeModules} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ILocations} from '../../types/types';
import {
  getAllStoredCities,
  getByKeyStoredCities,
} from '../../Database/AsyncStorage';
import {
  useDrawerStatus,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {countries} from 'country-data';
import Language from '../../utils/language';
import {DatabaseKeys} from '../Home';

export default function Settings({navigation}: DrawerContentComponentProps) {
  const [locations, setLocations] = useState<ILocations[] | null>([
    {
      name: '',
      country: '',
      lat: 0,
      lon: 0,
      state: '',
      countryFull: '',
    },
  ]);
  const [defaultLocation, setDefaultLocation] = useState<ILocations>({
    name: '',
    country: '',
    lat: 0,
    lon: 0,
    state: '',
    countryFull: '',
  });

  async function handleReload() {
    const cities: ILocations[] | null = await getAllStoredCities();
    const city = await getByKeyStoredCities(DatabaseKeys.Default);

    if (cities === null || city === null) {
      return;
    }

    setLocations(cities);
    setDefaultLocation(city);
  }

  useEffect(() => {
    handleReload();
  }, [useDrawerStatus()]);

  return (
    <View style={{flex: 1, backgroundColor: '#171517', padding: 25}}>
      <View
        style={{
          //flex: 1,
          /* backgroundColor: 'red', */
          marginTop: 25,
        }}>
        <View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Icon name="star" size={22} color={'#e7ff0d'} />
            <Text style={{fontSize: 18, marginLeft: 10, color: '#FFF9'}}>
              {Language() === 'pt_BR'
                ? 'Localização Favorita'
                : 'Favorite Location'}
            </Text>
          </View>
        </View>

        <Pressable
          android_ripple={{
            color: 'gray',
            foreground: false,
            radius: 200,
            borderless: false,
          }}
          style={{
            flexDirection: 'row',
            padding: 15,
          }}
          onPress={() =>
            navigation.navigate('Home', {
              params: {city: defaultLocation, screenName: 'Settings'},
            })
          }>
          <Icon name="map-marker" size={22} color={'#FFF'} />
          <View style={{justifyContent: 'center', marginLeft: 20}}>
            <Text
              style={{
                fontSize: 18,
                color: '#FFF',
              }}>
              {defaultLocation.name}
            </Text>
            {defaultLocation.state ? (
              <Text style={{fontSize: 12, color: '#FFF9'}}>
                {defaultLocation.state}, {defaultLocation.countryFull}
              </Text>
            ) : (
              <Text style={{fontSize: 14, color: '#FFF9'}}>
                {defaultLocation.countryFull}
              </Text>
            )}
          </View>
        </Pressable>
      </View>
      <View
        style={{
          backgroundColor: '#FFF2',
          height: 1,
          marginBottom: 15,
          marginTop: 5,
        }}></View>
      <View
        style={{
          flex: 1,
          /* backgroundColor: 'blue', */
        }}>
        <View style={{flexDirection: 'row', marginBottom: 20}}>
          <Icon name="map-marker-multiple" size={22} color={'#e7ff0d'} />
          <Text style={{fontSize: 18, marginLeft: 10, color: '#FFF9'}}>
            {Language() === 'pt_BR' ? 'Outras Localidades' : 'Other Locations'}
          </Text>
        </View>
        <View style={{height: 550, flex: 1}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            maxToRenderPerBatch={15}
            data={locations}
            renderItem={({item, separators}) => (
              <View>
                <Pressable
                  android_ripple={{
                    color: 'gray',
                    foreground: false,
                    radius: 200,
                    borderless: false,
                  }}
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
                  <View style={{justifyContent: 'center', marginLeft: 20}}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: '#FFF',
                      }}>
                      {item.name}
                    </Text>
                    {item.state ? (
                      <Text style={{fontSize: 12, color: '#FFF9'}}>
                        {item.state}, {item.countryFull}
                      </Text>
                    ) : (
                      <Text style={{fontSize: 14, color: '#FFF9'}}>
                        {item.countryFull}
                      </Text>
                    )}
                  </View>
                </Pressable>
              </View>
            )}
          />
        </View>
      </View>
      <View
        style={
          {
            /* backgroundColor: 'gray', */
            //flex: 2,
          }
        }>
        <Pressable
          style={{
            backgroundColor: '#FFF3',
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 15,
          }}
          onPress={() => navigation.navigate('LocationManager')}>
          <Text style={{color: '#FFF'}}>
            {Language() === 'pt_BR'
              ? 'Gerenciar Localizações'
              : 'Locations Management'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
