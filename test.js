function FormatDate(date) {
  const dateFormatted = new Date(date * 1000).toLocaleDateString(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const hourFormatted = new Date(date * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const dateTimeFormatted = new Date(date * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
  return {hourFormatted, dateFormatted, dateTimeFormatted};
}

console.log('DATE===========', FormatDate(1705173718).dateTimeFormatted);
console.log(
  'FULL=========',
  FormatDate(1705173718).dateFormatted +
    ' - ' +
    FormatDate(1705173718).hourFormatted,
);

const uv = 9;
let uvDescription = '';
/* if (uv <= 2) {
  uvDescription = 'Low';
} else if (uv > 2 && uv <= 5) {
  uvDescription = uvDescription = 'Moderate';
} else if (uv > 5 && uv <= 7) {
  uvDescription = uvDescription = 'High';
} else if (uv > 7 && uv <= 10) {
  uvDescription = uvDescription = 'Very High';
} else if (uv >= 10) {
  uvDescription = uvDescription = 'Extreme';
} */

switch (true) {
  case uv <= 2:
    uvDescription = 'Low';
    break;
  case uv > 2 && uv <= 5:
    uvDescription = 'Moderate';
    break;
  case uv > 5 && uv <= 7:
    uvDescription = 'High';
    break;
  case uv > 7 && uv < 10:
    uvDescription = 'Very High';
    break;
  case uv >= 10:
    uvDescription = 'Extreme';
    break;
  default:
    uvDescription = '';
    break;
}
console.log(uvDescription);
