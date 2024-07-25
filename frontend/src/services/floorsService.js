import axios from 'axios';

const API_URL = 'http://localhost:5209/api/Floors'; // Thay đổi URL nếu cần

const getFloors = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch floors.');
    }
};

const getFloor = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch floor with id ${id}.`);
    }
};

const getAvailableParkings = async (floorId) => {
    try {
        const response = await axios.get(`${API_URL}/${floorId}/available`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch available parkings for floor with id ${floorId}.`);
    }
};

const createFloor = async (floor) => {
    try {
        const response = await axios.post(API_URL, floor);
        return response.data;
    } catch (error) {
        throw new Error('Failed to create floor.');
    }
};

const updateFloor = async (id, floor) => {
    try {
        await axios.put(`${API_URL}/${id}`, floor);
    } catch (error) {
        throw new Error(`Failed to update floor with id ${id}.`);
    }
};

const deleteFloor = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        throw new Error(`Failed to delete floor with id ${id}.`);
    }
};

const floorsService = {
    getFloors,
    getFloor,
    getAvailableParkings,
    createFloor,
    updateFloor,
    deleteFloor,
};

export default floorsService;
