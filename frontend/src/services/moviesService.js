import axios from 'axios';

const API_URL = 'http://localhost:5209/api/Movies'; // Thay đổi URL nếu cần

const getMovies = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch movies.');
    }
};

const getMovie = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch movie with id ${id}.`);
    }
};
const getMoviesByStallId = (stallId) => {
    return axios.get(`${API_URL}/stall/${stallId}`);
};
const createMovie = async (movie) => {
    try {
        const response = await axios.post(API_URL, movie);
        return response.data;
    } catch (error) {
        throw new Error('Failed to create movie.');
    }
};

const updateMovie = async (id, movie) => {
    try {
        await axios.put(`${API_URL}/${id}`, movie);
    } catch (error) {
        throw new Error(`Failed to update movie with id ${id}.`);
    }
};

const deleteMovie = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        throw new Error(`Failed to delete movie with id ${id}.`);
    }
};

const moviesService = {
    getMovies,
    getMovie,
    createMovie,
    updateMovie,
    deleteMovie,
    getMoviesByStallId
};

export default moviesService;
