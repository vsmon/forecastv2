import { NativeModules } from "react-native";

export default function WeekDay(dayOfWeek: number): string {
    const weekDay: Array<string> = NativeModules.I18nManager.localeIdentifier === 'pt_BR'
    ? [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
    ]
    : [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return weekDay[dayOfWeek];
  }
  