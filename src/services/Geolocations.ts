import Geolocation, {
    GeolocationConfiguration, GeolocationError, 
  } from '@react-native-community/geolocation';

  interface ICoordinates {
    position?:{
      latitude: number;
    longitude: number;
    }
    error?: GeolocationError
  };



  export default function getPosition(): Promise<ICoordinates> {
    const config: GeolocationConfiguration = {
      locationProvider: 'auto',
      skipPermissionRequests: false,
    };

    Geolocation.setRNConfiguration(config);

    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        info => {
          const {latitude,longitude} = info.coords;
           resolve({position:{latitude,longitude}});
        },
        error => {
          reject({Error:error});
          console.log('ERROR WHEN GET POSITION', error);
        },
        {timeout:30000, enableHighAccuracy: true  , maximumAge: 10000, /*distanceFilter: 5 */},
      );
    });
  }