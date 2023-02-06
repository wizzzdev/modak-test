import { configureStore } from '@reduxjs/toolkit'
import { artWorksSlice } from './slices/artWorks'

export const store = configureStore({
  reducer: {
    [artWorksSlice.reducerPath]: artWorksSlice.reducer, 
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(artWorksSlice.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch