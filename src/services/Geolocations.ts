import Geolocation, {
    GeolocationConfiguration, GeolocationError, 
  } from '@react-native-community/geolocation';

  type Coordinates = {
    latitude: number;
    longitude: number;
  };



  export default function getPosition(): Promise<Coordinates> {
    const config: GeolocationConfiguration = {
      locationProvider: 'auto',
      skipPermissionRequests: false,
    };

    Geolocation.setRNConfiguration(config);

    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        info => {
          const {latitude, longitude} = info.coords;
          resolve({latitude, longitude});
        },
        error => {
          console.log(error);
          reject(error.message);
        },
        {enableHighAccuracy: true, maximumAge: 1000, distanceFilter: 5},
      );
    });
  }