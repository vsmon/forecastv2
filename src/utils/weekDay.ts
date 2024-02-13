import { NativeModules } from "react-native";
import Language from "./language";

export default function WeekDay(dayOfWeek: number): string {
    const weekDay: Array<string> = Language() === 'pt_BR'
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
  