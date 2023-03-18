import axios from 'axios';

const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: 'af81739caa69a36e0797ea68589af93f',
        language: 'es-ES',
    },
});

export default movieDB;
