import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import movieApi from '../../common/apis/movieApi';
import { OMDB_API_KEY } from '../../common/apis/movieApiKey';
import { addMovies } from '../../features/movies/movieSlice';
import MovieListing from '../MovieListing/MovieListing';

const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch();
    }, [dispatch]);

    return (
        <>
            <div className='banner-image'></div>
            <MovieListing />
        </>
    );
};

export default Home;
