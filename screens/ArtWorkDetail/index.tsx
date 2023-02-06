import { Button, SafeAreaView, StyleSheet, Text } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import { useWindowDimensions } from 'react-native';

import Thumbnail from "../../components/Thumbnail";
import { RootState } from "../../store";
import { artworksSlice } from "../../slices/artWorks";

const ArtworkDetailScreen = () => {
  const dispatch = useDispatch();
  const selectedArtwork = useSelector((state: RootState) => state.artworks.selectedArtwork);
  const {
    width: deviceWidth
  } = useWindowDimensions();

  const addToFavorites = () => {
    dispatch(artworksSlice.actions.addArtworkToFavorites(selectedArtwork));
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}> {selectedArtwork.title}</Text>
      <Thumbnail
        width={deviceWidth / 1.3}
        height={deviceWidth / 1.3}
        imageId={selectedArtwork.image_id}
      />
      <Button title="Add to favorites" onPress={addToFavorites} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
  }
});

export default ArtworkDetailScreen;