import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import movieApi from '../../common/apis/movieApi';
import { OMDB_API_KEY } from '../../common/apis/movieApiKey';

const initialState = {
    movies: {}
};

// There is a third parameter (object) in createAsyncThunk (NOT NEEDED IN THIS PROJECT)
export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies', async () => {
    const movieSearchTerm = 'mission';
    const { data } = await movieApi.get(`?apiKey=${OMDB_API_KEY}&s=${movieSearchTerm}&type=movie`).catch((err) => {
        console.log(err);
    });
    return data;
});

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        addMovies: (state, { payload }) => {
            state.movies = payload;
        }
    },
    extraReducers: {
        [fetchAsyncMovies.pending]: () => {
            console.log('pending!');
        },
        [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
            console.log('fulfilled!');
            return { ...state, movies: payload };
        },
        [fetchAsyncMovies.rejected]: () => {
            console.log('rejected!');
        }
    }
});

export const { addMovies } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;

export default movieSlice.reducer;
