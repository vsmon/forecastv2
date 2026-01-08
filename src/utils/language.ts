import * as RNLocalize from 'react-native-localize';

export default function Language(): string {
  const locales = RNLocalize.getLocales();
  const formattedLang: string = String(
    (locales && locales.length > 0 && locales[0].languageTag) || 'en_US',
  ).replace('-', '_');
  return formattedLang;
}
