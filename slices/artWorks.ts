import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const artWorksSlice = createApi({
  reducerPath: 'artworks',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.artic.edu/api/v1' }),
  endpoints: builder => ({
    getArtworks: builder.query<any, void>({
      query: () => '/artworks?page=1',
    })
  })
})

export const { useGetArtworksQuery } = artWorksSlice