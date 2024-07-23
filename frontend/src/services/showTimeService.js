import axios from 'axios';

const API_URL = 'http://localhost:5209/api/ShowTimes'; // Thay đổi URL nếu cần

const getShowTimes = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch showtimes.');
    }
};

const getShowTime = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch showtime with id ${id}.`);
    }
};

const createShowTime = async (showTime) => {
    try {
        const response = await axios.post(API_URL, showTime);
        return response.data;
    } catch (error) {
        throw new Error('Failed to create showtime.');
    }
};

const updateShowTime = async (id, showTime) => {
    try {
        await axios.put(`${API_URL}/${id}`, showTime);
    } catch (error) {
        throw new Error(`Failed to update showtime with id ${id}.`);
    }
};

const deleteShowTime = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        throw new Error(`Failed to delete showtime with id ${id}.`);
    }
};

const getShowTimesByDate = async (date) => {
    try {
        const response = await axios.get(`${API_URL}/bydate`, {
            params: { date }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch showtimes by date.');
    }
};

const getShowTimesByDateAndCinemaHall = async (date, cinemaHallId) => {
    try {
        const response = await axios.get(`${API_URL}/by-date`, {
            params: { date, cinemaHallId }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch showtimes by date and cinema hall.');
    }
};

const showTimeService = {
    getShowTimes,
    getShowTime,
    createShowTime,
    updateShowTime,
    deleteShowTime,
    getShowTimesByDate,
    getShowTimesByDateAndCinemaHall,
};

export default showTimeService;
