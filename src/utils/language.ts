import { NativeModules } from "react-native";

export default function Language(): string{
    return NativeModules.I18nManager.localeIdentifier
}