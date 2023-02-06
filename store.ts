import { configureStore } from '@reduxjs/toolkit'
import { artWorksApi, artworksSlice } from './slices/artWorks'

export const store = configureStore({
  reducer: {
    [artworksSlice.name]: artworksSlice.reducer,
    [artWorksApi.reducerPath]: artWorksApi.reducer, 
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(artWorksApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch