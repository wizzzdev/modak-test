// In App.js in a new project

import { StackNavigationProp } from '@react-navigation/stack';
import { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { Text, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Thumbnail from '../../components/Thumbnail';
import { artworksSlice, useGetArtworksQuery } from '../../slices/artWorks';
import { RootState } from '../../store';

interface Artwork {
  item: {
    image_id: string,
    id: string,
  },
  index: number,
}

interface FavoriteArtworksScreen {
  navigation: StackNavigationProp<any>
}

const FavoriteArtworksScreen = ({
  navigation
}: FavoriteArtworksScreen) => {
  const dispatch = useDispatch();
  const {
    width: deviceWidth
  } = useWindowDimensions();

  const artWorks = useSelector((state: RootState) => state.artworks.favoriteArtworks);

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

  return (
    <>
      <FlatList
        style={{ zIndex: -1}}
        numColumns={3}
        data={artWorks}
        renderItem={_renderItem}
        onEndReachedThreshold={0.5}
      />
    </>
  );
}

export default FavoriteArtworksScreen;