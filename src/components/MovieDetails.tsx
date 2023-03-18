import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { MovieFull } from '../interfaces/MovieInterface';
import { Cast } from '../interfaces/CreditsInterface';
import Icon from 'react-native-vector-icons/Ionicons';
import { CastItem } from './CastItem';

interface Props {
    movieFull: MovieFull;
    cast: Cast[];
}


export const MovieDetails = ({ movieFull, cast }: Props) => {
    return (
        <>
            {/* Detalles */}

            <View style={{ marginHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Icon name="star-outline" color="grey" size={16} />
                    <Text style={{ marginLeft: 5, color: 'black' }}>{movieFull.vote_average}</Text>

                    <Text style={{ marginLeft: 5, color: 'black' }}>
                        - {movieFull.genres.map(g => g.name).join(', ')}
                    </Text>
                </View>

                {/* HISTORIA */}

                <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold', color: 'black' }}>
                    Historia
                </Text>
                <Text style={{ fontSize: 16, marginTop: 3, marginBottom: 10, color: 'black' }}>
                    {movieFull.overview}
                </Text>

                {/* PRESUPUESTO */}

                <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold', color: 'black' }}>
                    Presupuesto
                </Text>
                <Text style={{ fontSize: 16, marginTop: 3, marginBottom: 10, color: 'black' }}>
                    $ {new Intl.NumberFormat('de-DE').format(movieFull.budget)}
                </Text>

            </View>

            {/* Casting */}

            <View style={{ marginTop: 10, marginBottom: 100 }}>
                <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold', marginHorizontal: 20, color: 'black' }}>
                    Actores
                </Text>

                <FlatList
                    data={cast}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <CastItem actor={item} />}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{ marginTop: 10, height: 70 }}
                />

            </View>


        </>
    );
};
