const dt = new Date(1705122000 * 1000).toLocaleTimeString();

console.log(`${dt.split(':')[0]}:${dt.split(':')[1]}`);

const seed = require('./seed.json');

console.log(seed.hourly.length);

const pop = seed.hourly.map(({dt, temp, weather: [{description}]}) => {
  return {dt, temp, description};
});
console.log(pop);

const current = {
  alertDescription:
    'INMET publica aviso iniciando em: 17/01/2024 15:25. Chuva entre 20 e 30 mm/h ou até 50 mm/dia, ventos intensos (40-60 km/h). Baixo risco de corte de energia elétrica, queda de galhos de árvores, alagamentos e de descargas elétricas.',
  description: 'chuva moderada',
  event: 'Chuvas Intensas',
  feels_like: 30,
  humidity: 45,
  icon: '10d',
  max: 34,
  min: 24,
  sunrise: 1705480651,
  sunset: 1705528893,
  temp: 29.49,
  uvi: 0.31,
  wind_speed: 3.3,
};

const currentWithCity = {...current, city: 'MINHA CIDADE'};

console.log(currentWithCity);
