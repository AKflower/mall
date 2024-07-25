import axios from 'axios';

const API_URL = 'http://localhost:5209/api/Products'; // Thay đổi URL nếu cần

const getProducts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch products.');
    }
};

const getProduct = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch product with id ${id}.`);
    }
};

const createProduct = async (product) => {
    try {
        const response = await axios.post(API_URL, product);
        return response.data;
    } catch (error) {
        throw new Error('Failed to create product.');
    }
};

const updateProduct = async (id, product) => {
    try {
        await axios.put(`${API_URL}/${id}`, product);
    } catch (error) {
        throw new Error(`Failed to update product with id ${id}.`);
    }
};

const deleteProduct = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        throw new Error(`Failed to delete product with id ${id}.`);
    }
};

const getProductsByStall = async (stallId) => {
    try {
        const response = await axios.get(`${API_URL}/stall/${stallId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch products for stall with id ${stallId}.`);
    }
};

const productService = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsByStall,
};

export default productService;
