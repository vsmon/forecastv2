export default function FormatDate(date: number): {hourFormatted:string, dateFormatted:string} {
    const dt = new Date(date * 1000).toLocaleDateString();
    const hour = new Date(date * 1000).toLocaleTimeString()
    const hourFormatted: string = `${hour.split(':')[0]}:${hour.split(':')[1]}`;
    const dateFormatted: string = `${dt.split('/')[0]}/${dt.split('/')[1]}/${
      dt.split('/')[2]
    }`
    return {hourFormatted, dateFormatted};
  }

