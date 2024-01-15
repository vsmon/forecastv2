export default function WeekDay(dayOfWeek: number): string {
    const weekDay: Array<string> = [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
    ];
    return weekDay[dayOfWeek];
  }
  