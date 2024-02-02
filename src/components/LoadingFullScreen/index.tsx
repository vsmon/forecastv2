import React, {useRef} from 'react';
import {View, Animated, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface LoadingProps {
  isLoading: boolean;
  size: number;
}

export default function LoadingFullScreen({isLoading, size}: LoadingProps) {
  const animIconValue = useRef(new Animated.Value(1)).current;
  const animIcon = Animated.loop(
    Animated.sequence([
      Animated.timing(animIconValue, {
        toValue: 1.2,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(animIconValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]),
  );
  isLoading ? animIcon.start() : animIcon.stop();

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.icon, {transform: [{scale: animIconValue}]}]}>
        <Icon name="weather-partly-lightning" size={size} color={'#FFF'} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
