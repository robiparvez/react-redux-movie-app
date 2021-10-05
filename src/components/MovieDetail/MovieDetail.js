import './MovieDetail.scss';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchAsyncMovieOrShowDetails, getSelectedShowOrMovie, removeSelectedMovieOrShow } from '../../features/movies/movieSlice';
import { useSelector } from 'react-redux';

const MovieDetail = () => {
    const { imdbID } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAsyncMovieOrShowDetails(imdbID));
        return () => {
            dispatch(removeSelectedMovieOrShow());
        };
    }, [imdbID, dispatch]);

    const movieOrShowDetails = useSelector(getSelectedShowOrMovie);
    const { Title, imdbRating, imdbVotes, Runtime, Year, Plot, Director, Actors, Genre, Language, Awards, Poster } = movieOrShowDetails;

    return (
        <div className='movie-section'>
            {Object.keys(movieOrShowDetails).length === 0 ? (
                <h3>...Loading</h3>
            ) : (
                <>
                    <div className='section-left'>
                        <div className='movie-title'>{Title}</div>
                        <div className='movie-rating'>
                            <span>
                                IMDB Rating <i className='fa fa-star'></i> : {imdbRating}
                            </span>
                            <span>
                                IMDB Votes <i className='fa fa-thumbs-up'></i> : {imdbVotes}
                            </span>
                            <span>
                                IMDB Runtime <i className='fa fa-film'></i> : {Runtime}
                            </span>
                            <span>
                                IMDB Year <i className='fa fa-calendar'></i> : {Year}
                            </span>
                        </div>
                        <div className='movie-plot'>{Plot}</div>
                        <div className='movie-info'>
                            <div>
                                <span>Director</span>
                                <span>{Director}</span>
                            </div>
                            <div>
                                <span>Stars</span>
                                <span>{Actors}</span>
                            </div>
                            <div>
                                <span>Genres</span>
                                <span>{Genre}</span>
                            </div>
                            <div>
                                <span>Languages</span>
                                <span>{Language}</span>
                            </div>
                            <div>
                                <span>Awards</span>
                                <span>{Awards}</span>
                            </div>
                        </div>
                    </div>
                    <div className='section-right'>
                        <img src={Poster} alt={Title} />
                    </div>
                </>
            )}
        </div>
    );
};

export default MovieDetail;
