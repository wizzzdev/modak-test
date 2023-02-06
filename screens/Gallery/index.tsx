// In App.js in a new project

import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { Text, FlatList } from 'react-native';
import { useDispatch } from 'react-redux';

import Thumbnail from '../../components/Thumbnail';
import { artworksSlice, useGetArtworksQuery } from '../../slices/artWorks';

interface Artwork {
  item: {
    image_id: string,
    id: string,
  },
  index: number,
}

interface GalleryScreenProps {
  navigation: StackNavigationProp<any>
}

const GalleryScreen = ({
  navigation
}: GalleryScreenProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(true);
  const dispatch = useDispatch();
  const {
    data,
    isSuccess,
    isLoading,
  } = useGetArtworksQuery(currentPage);
  const {
    width: deviceWidth
  } = useWindowDimensions();

  useEffect(() => {
    AsyncStorage
      .getItem('@favoriteArtworks')
      .then((favoriteArtworks) => {
        if (favoriteArtworks && favoriteArtworks.length) {
          dispatch(artworksSlice.actions.setFavoriteArtworks(JSON.parse(favoriteArtworks)))
        }
        setIsLoadingFavorites(false);
      })
  }, [])

  if (isLoading && !data || isLoadingFavorites) {
    return <Text>
      Loading...
    </Text>
  }

  const artWorks = data.data;

  const fetchMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  }

  const selectArtwork = (artwork) => {
    dispatch(artworksSlice.actions.setSelectedArtwork(artwork));
    navigation.push('Artwork');
  }

  const _renderItem = ({ item: artwork }: Artwork) => {
    return (
      <Thumbnail
        imageId={artwork.image_id}
        key={artwork.id}
        height={deviceWidth / 2}
        width={deviceWidth / 2}
        onPress={() => selectArtwork(artwork)}
      />
  )};

  if (isSuccess || data) {
    return (
      <>
        <FlatList
          style={{ zIndex: -1}}
          numColumns={3}
          data={artWorks}
          renderItem={_renderItem}
          onEndReachedThreshold={0.5}
          onMomentumScrollEnd={fetchMore}
        />
      </>
    );
  }
}

export default GalleryScreen;