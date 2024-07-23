import axios from 'axios';

const API_URL = 'http://localhost:5209/api/Galleries'; // Thay đổi URL nếu cần

const getGalleries = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch galleries.');
    }
};

const getImage = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch image with id ${id}.`);
    }
};

const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post(`${API_URL}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to upload image.');
    }
};

const downloadImage = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/download/${id}`, {
            responseType: 'blob'
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to download image with id ${id}.`);
    }
};

const createImage = async (image) => {
    try {
        const response = await axios.post(API_URL, image);
        return response.data;
    } catch (error) {
        throw new Error('Failed to create image.');
    }
};

const updateImage = async (id, image) => {
    try {
        await axios.put(`${API_URL}/${id}`, image);
    } catch (error) {
        throw new Error(`Failed to update image with id ${id}.`);
    }
};

const deleteImage = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        throw new Error(`Failed to delete image with id ${id}.`);
    }
};

const galleryService = {
    getGalleries,
    getImage,
    uploadImage,
    downloadImage,
    createImage,
    updateImage,
    deleteImage,
};

export default galleryService;
