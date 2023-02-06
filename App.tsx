// In App.js in a new project

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';

import GalleryScreen from './screens/Gallery';
import { store } from './store';
import ArtworkDetailScreen from './screens/ArtWorkDetail';
import { Button } from 'react-native';
import FavoriteArtworksScreen from './screens/FavoriteArtworks';

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Gallery">
          <Stack.Screen
            name="Gallery"
            component={GalleryScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <Button onPress={() => navigation.push('Favorites')} title="Favorites"/>
              )
            })}
          />
          <Stack.Screen name="Artwork" component={ArtworkDetailScreen} />
          <Stack.Screen name="Favorites" component={FavoriteArtworksScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;