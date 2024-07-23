import axios from 'axios';

const API_URL = 'http://localhost:5209/api/Auth'; // Thay đổi URL nếu cần

const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { Email:email, Password:password });
        if (response.data.token) {
            console.log('Test',response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        throw new Error('Login failed. Please check your credentials.');
    }
};

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const authService = {
    login,
    logout,
    getCurrentUser,
};

export default authService;
