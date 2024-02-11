export default function FormatDate(date: number): {hourFormatted:string, dateFormatted:string} {
    const dateFormatted:string = new Date(date * 1000).toLocaleDateString(undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const hourFormatted:string = new Date(date * 1000).toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    })
    
    return {hourFormatted, dateFormatted};
  }

