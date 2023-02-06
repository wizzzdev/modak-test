// In App.js in a new project

import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

interface ThumbnailProps {
  uri: string,
  height: number,
  width: number,
  index: number,
}

const Thumbnail = ({
  uri,
  height,
  width,
  index,
}: ThumbnailProps) => {
  const scaleValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
        speed: 50
      }).start();
    }, 100 * index)

    return () => clearTimeout(timeout);
  }, [])
  return (
    <Animated.Image 
      source={{ uri }}
      style={{
        height,
        width,
        transform: [
          { scale: scaleValue }
        ],
        resizeMode: "cover",
      }}
    />
  );
};

export default Thumbnail;