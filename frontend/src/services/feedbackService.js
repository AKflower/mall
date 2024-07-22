import axios from 'axios';

const API_URL = 'http://localhost:5209/api/FeedBacks'; // Adjust the base URL as needed

const feedbackService = {
    getFeedBacks: async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error("There was an error fetching feedbacks!", error);
            throw error;
        }
    },
    getFeedBack: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`There was an error fetching the feedback with ID ${id}!`, error);
            throw error;
        }
    },
    postFeedBack: async (feedback) => {
        try {
            feedback.Name = '';
            const response = await axios.post(API_URL, feedback);
            return response.data;
        } catch (error) {
            console.error("There was an error posting the feedback!", error);
            throw error;
        }
    },
    putFeedBack: async (id, feedback) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, feedback);
            return response.data;
        } catch (error) {
            console.error(`There was an error updating the feedback with ID ${id}!`, error);
            throw error;
        }
    },
    deleteFeedBack: async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
        } catch (error) {
            console.error(`There was an error deleting the feedback with ID ${id}!`, error);
            throw error;
        }
    },
    getFeedBacksByRating: async (rating) => {
        try {
            const response = await axios.get(`${API_URL}/rating/${rating}`);
            return response.data;
        } catch (error) {
            console.error(`There was an error fetching feedbacks with rating ${rating}!`, error);
            throw error;
        }
    },
    getFeedBacksByDate: async (date) => {
        try {
            const response = await axios.get(`${API_URL}/bydate?date=${date}`);
            return response.data;
        } catch (error) {
            console.error(`There was an error fetching feedbacks for date ${date}!`, error);
            throw error;
        }
    },
    getTotalFeedBacksByMonth: async (month, year) => {
        try {
            const response = await axios.get(`${API_URL}/totalbymonth?month=${month}&year=${year}`);
            return response.data;
        } catch (error) {
            console.error(`There was an error fetching the total feedbacks for month ${month} and year ${year}!`, error);
            throw error;
        }
    }
};

export default feedbackService;
