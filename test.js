const date = new Date(1705010400 * 1000).getHours().toLocaleString();

console.log(date);

const data = {
  temp: {
    max: 10,
    min: 5,
  },
};

const {
  temp: {min},
} = data;
console.log(min);

const ForecastData = require('./seed.json');

const newList = ForecastData.hourly.map(item => {
  const data = {
    dt: item.dt,
    temp: item.temp,
  };
  return data;
});
console.log(newList);
