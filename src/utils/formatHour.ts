export default function FormatHour(date: number): string {
    const dt = new Date(date * 1000).toLocaleTimeString();
    const hourFormatted: string = `${dt.split(':')[0]}:${dt.split(':')[1]}`;
    return hourFormatted;
  }

