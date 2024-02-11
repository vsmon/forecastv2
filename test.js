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
