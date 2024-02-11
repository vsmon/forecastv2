import {PlatformColor, StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 25,
    marginBottom: 5,
    backgroundColor: '#171517',
    /* backgroundColor: PlatformColor('@android:color/holo_blue_bright'),
    color: PlatformColor('?android:attr/textColor'), */
  },
  textColor: {
    color: '#FFF2',
  },
});
