interface IForecastData {
  current: {
    dt: number;
    temp: number;
    feels_like: number;
    uvi: number;
    humidity: number;
    wind_speed: number;
    sunrise: number;
    sunset: number;
    weather: [{description: string; icon: string}];
  };
  city: ILocations;
  daily: [
    {
      dt: number;
      pop: number;
      icon: string;
      moon_phase: number;
      temp: {max: number; min: number};
      weather: [{icon: string}];
    },
  ];
  hourly: [
    {
      dt: number;
      temp: number;
      weather: [{icon: string; description: string}];
      pop: number;
      icon: string;
    },
  ];
  alerts?: [{event: string; description: string}];
}

interface ILocations {
    name: string;
    lat: number;
    lon: number;
    country: string;
    state: string;
    countryFull: string
  }

    

export type {ILocations, IForecastData}  