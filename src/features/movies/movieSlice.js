import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import movieApi from '../../common/apis/movieApi';
import { OMDB_API_KEY } from '../../common/apis/movieApiKey';

const initialState = {
    movies: {},
    shows: {},
    selectedMovieOrShow: {}
};

// There is a third parameter (object) in createAsyncThunk (NOT NEEDED IN THIS PROJECT)

// Movies
export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies', async () => {
    const movieSearchTerm = 'mission';
    const { data } = await movieApi.get(`?apiKey=${OMDB_API_KEY}&s=${movieSearchTerm}&type=movie`).catch((err) => {
        console.log(err);
    });
    return data;
});

// Shows
export const fetchAsyncShows = createAsyncThunk('movies/fetchAsyncShows', async () => {
    const seriesSearchTerm = 'doctor';
    const { data } = await movieApi.get(`?apiKey=${OMDB_API_KEY}&s=${seriesSearchTerm}&type=series`).catch((err) => {
        console.log(err);
    });
    return data;
});

export const fetchAsyncMovieOrShowDetails = createAsyncThunk('movies/fetchAsyncMovieOrShowDetails', async (imdbID) => {
    const { data } = await movieApi.get(`?apiKey=${OMDB_API_KEY}&i=${imdbID}&Plot=full`).catch((err) => {
        console.log(err);
    });
    return data;
});

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        removeSelectedMovieOrShow: (state) => {
            state.selectedMovieOrShow = {};
        }
    },
    extraReducers: {
        [fetchAsyncMovies.pending]: () => {
            console.log('movies pending!');
        },
        [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
            console.log('movies fulfilled!');
            return { ...state, movies: payload };
        },
        [fetchAsyncMovies.rejected]: () => {
            console.log('movies rejected!');
        },
        [fetchAsyncShows.fulfilled]: (state, { payload }) => {
            console.log('shows fulfilled!');
            return { ...state, shows: payload };
        },
        [fetchAsyncMovieOrShowDetails.fulfilled]: (state, { payload }) => {
            console.log('movie or show fulfilled!');
            return { ...state, selectedMovieOrShow: payload };
        }
    }
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;

export const getAllMovies = (state) => state.movies.movies;

export const getAllShows = (state) => state.movies.shows;

export const getSelectedShowOrMovie = (state) => state.movies.selectedMovieOrShow;

export default movieSlice.reducer;
