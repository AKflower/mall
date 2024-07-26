import axios from 'axios';

const API_URL = 'http://localhost:5209/api/ShowTimes'; // Thay đổi URL nếu cần

const getShowTimes = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch show times.');
    }
};

const getShowTime = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch show time with id ${id}.`);
    }
};

const createShowTime = async (showTime) => {
    try {
        const response = await axios.post(API_URL, showTime);
        return response.data;
    } catch (error) {
        throw new Error('Failed to create show time.');
    }
};

const updateShowTime = async (id, showTime) => {
    try {
        await axios.put(`${API_URL}/${id}`, showTime);
    } catch (error) {
        throw new Error(`Failed to update show time with id ${id}.`);
    }
};

const deleteShowTime = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        throw new Error(`Failed to delete show time with id ${id}.`);
    }
};

const getShowTimesByDate = async (date) => {
    try {
        const response = await axios.get(`${API_URL}/bydate`, {
            params: { date }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch show times by date.');
    }
};

const getMoviesAndShowTimesByDateAndStall = async (date, stallId) => {
    try {
        const response = await axios.get(`${API_URL}/by-date-and-stall`, {
            params: { date, stallId }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch movies and show times by date and stall.');
    }
};

const compareShowTimesWithSched = async (date, movieId, stallId, cinemaHallId) => {
    try {
        const response = await axios.get(`${API_URL}/compare-schedules`, {
            params: { date, movieId, stallId, cinemaHallId }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to compare show times with schedules.');
    }
};

const showTimesService = {
    getShowTimes,
    getShowTime,
    createShowTime,
    updateShowTime,
    deleteShowTime,
    getShowTimesByDate,
    getMoviesAndShowTimesByDateAndStall,
    compareShowTimesWithSched
};

export default showTimesService;
