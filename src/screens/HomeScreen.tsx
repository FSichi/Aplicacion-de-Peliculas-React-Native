import React, { useContext } from 'react';
import Carousel from 'react-native-snap-carousel';
import { Dimensions, View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMovies } from '../hooks/useMovies';
import { MoviePoster } from '../components/MoviePoster';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { Loading } from '../components/Loading';
import { GradientBackground } from '../components/GradientBackground';

import { getImageColors } from '../helpers/getColores';
import { GradientContext } from '../context/GradientContext';
import { useEffect } from 'react';

const { width: windowWidth } = Dimensions.get('window');

export const HomeScreen = () => {

    const { top } = useSafeAreaInsets();
    const { nowPlaying, topRated, popular, upcoming, isLoading } = useMovies();

    const { setMainColors } = useContext(GradientContext);


    const getPosterColors = async (index: number) => {
        const movie = nowPlaying[index];
        const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

        const [primary = 'green', secondary = 'orange'] = await getImageColors(uri);

        setMainColors({ primary, secondary });

    };

    useEffect(() => {

        if (nowPlaying.length > 0) {
            getPosterColors(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nowPlaying]);


    if (isLoading) { return (<Loading />); }

    return (
        <GradientBackground>
            <ScrollView>
                <View style={{ marginTop: top + 20 }}>

                    {/* CAROUSEL PRINCIPAL */}
                    <View style={{ height: 440 }}>
                        <Carousel
                            data={nowPlaying!}
                            renderItem={({ item }: any) => <MoviePoster movie={item} />}
                            sliderWidth={windowWidth}
                            itemWidth={300}
                            inactiveSlideOpacity={0.9}
                            onSnapToItem={(index) => getPosterColors(index)}
                        />
                    </View>

                    {/* PELICULAS POPULARES */}
                    <HorizontalSlider title="Popular" movies={popular} />
                    <HorizontalSlider title="Top Rated" movies={topRated} />
                    <HorizontalSlider title="Upcoming" movies={upcoming} />

                </View>
            </ScrollView>
        </GradientBackground>
    );
};
