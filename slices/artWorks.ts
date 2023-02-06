import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const initialState = { 
  selectedArtwork: {
    title: '',
    image_id: ''
  },
  favoriteArtworksIds: [],
  favoriteArtworks: []
};

export const artworksSlice = createSlice({
  name: 'artworks',
  initialState,
  reducers: {
    setSelectedArtwork(state, action) {
      state.selectedArtwork = action.payload
    },
    setFavoriteArtworks(state, action) {
      state.favoriteArtworks = action.payload
    },
    addArtworkToFavorites(state, action) {
      state.favoriteArtworksIds.push(action.payload.id),
      state.favoriteArtworks.push(action.payload),
      AsyncStorage.setItem('@favoriteArtworks', JSON.stringify(state.favoriteArtworks))
    }
  },
});

export const artWorksApi = createApi({
  reducerPath: 'artworksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.artic.edu/api/v1' }),
  endpoints: builder => ({
    getArtworks: builder.query<any, number>({
      query: (pageNumber) => `/artworks?page=${pageNumber}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      merge: (currentCache, newItems) => {
        currentCache.data = [...currentCache.data, ...newItems.data]
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
    }),
    })
});


export const { useGetArtworksQuery } = artWorksApi;