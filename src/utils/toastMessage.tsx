import {ToastAndroid} from 'react-native';

export default function toastMessage(message: string) {
  ToastAndroid.showWithGravityAndOffset(
    message,
    ToastAndroid.LONG,
    ToastAndroid.TOP,
    0,
    0,
  );
}
