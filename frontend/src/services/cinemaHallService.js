import axios from 'axios';

const API_URL = 'http://localhost:5209/api/CinemaHalls'; // Thay đổi URL nếu cần

const getCinemaHalls = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch cinema halls.');
    }
};

const getCinemaHall = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch cinema hall with id ${id}.`);
    }
};

const createCinemaHall = async (cinemaHall) => {
    try {
        const response = await axios.post(API_URL, cinemaHall);
        return response.data;
    } catch (error) {
        throw new Error('Failed to create cinema hall.');
    }
};

const updateCinemaHall = async (id, cinemaHall) => {
    try {
        await axios.put(`${API_URL}/${id}`, cinemaHall);
    } catch (error) {
        throw new Error(`Failed to update cinema hall with id ${id}.`);
    }
};

const deleteCinemaHall = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        throw new Error(`Failed to delete cinema hall with id ${id}.`);
    }
};

const getCinemaHallsByStallId = async (stallId) => {
    try {
        const response = await axios.get(`${API_URL}/stall/${stallId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch cinema halls for stall with id ${stallId}.`);
    }
};

const cinemaHallsService = {
    getCinemaHalls,
    getCinemaHall,
    createCinemaHall,
    updateCinemaHall,
    deleteCinemaHall,
    getCinemaHallsByStallId,
};

export default cinemaHallsService;
