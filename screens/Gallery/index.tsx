// In App.js in a new project

import { useWindowDimensions } from 'react-native';
import { Text, StyleSheet, FlatList } from 'react-native';

import Thumbnail from '../../components/Thumbnail';
import { useGetArtworksQuery } from '../../slices/artWorks';

interface Artwork {
  item: {
    thumbnail: {
      lqip: string
    }
  },
  index: number,
}

const GalleryScreen = ()=> {
  const {
    data,
    isSuccess,
    isLoading,
  } = useGetArtworksQuery();
  const {
    height: deviceHeight,
    width: deviceWidth
  } = useWindowDimensions();

  if (isLoading) {
    return <Text>
      Loading...
    </Text>
  }

  const artWorks = data.data;

  const _renderItem = ({ item: artwork, index }: Artwork) => {
    return (
      <Thumbnail
        uri={artwork.thumbnail.lqip}
        key={'_'}
        height={deviceWidth / 2}
        width={deviceWidth / 2}
        index={index}
      />
  )};

  if (isSuccess) {
    return (
      <FlatList
        numColumns={3}
        data={artWorks}
        renderItem={_renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    flexDirection: "row"
  }
});

export default GalleryScreen;