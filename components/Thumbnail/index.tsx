import { useEffect, useRef, useState } from 'react';
import { Animated, GestureResponderEvent, TouchableOpacity } from 'react-native';

interface ThumbnailProps {
  imageId: string,
  height: number,
  width: number,
  onPress?: (event: GestureResponderEvent) => void,
}

const Thumbnail = ({
  imageId,
  height,
  width,
  onPress,
}: ThumbnailProps) => {
  const scaleValue = useRef(new Animated.Value(0)).current;
  const [isImageReady, setIsImageReady] = useState(false);
  useEffect(() => {
    if (isImageReady) {
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
        speed: 50
      }).start();
    }
  }, [isImageReady]);
  
  const renderImage = () => (
    <Animated.Image 
      source={{ uri: `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg` }}
      onLoadEnd={() => setIsImageReady(true)}
      style={{
        height,
        width,
        transform: [
          { scale: scaleValue }
        ],
      }}
    />
  )

  return (
    <>
    {
      onPress ? (
        <TouchableOpacity onPress={onPress}>
          {renderImage()}
        </TouchableOpacity>
      )
      : renderImage()
    }
    </>

  );
};

export default Thumbnail;