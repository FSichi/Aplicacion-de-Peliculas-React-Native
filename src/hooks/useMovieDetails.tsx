import { useEffect, useState } from 'react';
import { MovieFull } from '../interfaces/MovieInterface';
import { CreditsResponse, Cast } from '../interfaces/CreditsInterface';
import movieDB from '../api/movieDB';

interface MovieDetails {
    isLoading: boolean;
    movieFull?: MovieFull;
    cast: Cast[];
}

export const useMovieDetails = (movieId: number) => {

    const [state, setState] = useState<MovieDetails>({
        isLoading: true,
        movieFull: undefined,
        cast: [],
    });

    const getMovieDetails = async () => {
        const movieDetailsPromise = movieDB.get<MovieFull>(`/${movieId}`);
        const castPromise = movieDB.get<CreditsResponse>(`/${movieId}/credits`);

        const [movieDetailsResponse, castPromiseResponse] = await Promise.all([movieDetailsPromise, castPromise]);

        setState({
            isLoading: false,
            movieFull: movieDetailsResponse.data,
            cast: castPromiseResponse.data.cast,
        });

    };

    useEffect(() => {
        getMovieDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return {
        ...state,
    };
};
