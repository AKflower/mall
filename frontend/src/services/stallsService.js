import axios from 'axios';

const API_URL = 'http://localhost:5209/api/Stalls'; // Thay đổi URL nếu cần

const getStalls = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch stalls.');
    }
};

const getStall = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch stall with id ${id}.`);
    }
};

const createStall = async (stall) => {
    try {
        const response = await axios.post(API_URL, stall);
        return response.data;
    } catch (error) {
        throw new Error('Failed to create stall.');
    }
};

const updateStall = async (id, stall) => {
    try {
        await axios.put(`${API_URL}/${id}`, stall);
    } catch (error) {
        throw new Error(`Failed to update stall with id ${id}.`);
    }
};

const deleteStall = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        throw new Error(`Failed to delete stall with id ${id}.`);
    }
};
const getTopPickStalls = async () => {
    try {
        const response = await axios.get(`${API_URL}/TopPicks`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch top pick stalls.');
    }
};
const stallService = {
    getStalls,
    getStall,
    createStall,
    updateStall,
    deleteStall,
    getTopPickStalls
};

export default stallService;
