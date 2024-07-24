import axios from 'axios';

const API_URL = 'http://localhost:5209/api/Tickets'; // Thay đổi URL nếu cần

const getTickets = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch tickets.');
    }
};

const getTicket = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch ticket with id ${id}.`);
    }
};

const createTicket = async (ticket) => {
    try {
        const response = await axios.post(API_URL, ticket);
        return response.data;
    } catch (error) {
        throw new Error('Failed to create ticket.');
    }
};

const createTicketsBulk = async (tickets) => {
    try {
        const response = await axios.post(`${API_URL}/bulk-create`, tickets);
        return response.data;
    } catch (error) {
        throw new Error('Failed to create tickets in bulk.');
    }
};

const updateTicket = async (id, ticket) => {
    try {
        await axios.put(`${API_URL}/${id}`, ticket);
    } catch (error) {
        throw new Error(`Failed to update ticket with id ${id}.`);
    }
};

const deleteTicket = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        throw new Error(`Failed to delete ticket with id ${id}.`);
    }
};

const getSeatNumbersByShowtime = async (showtimeId) => {
    try {
        const response = await axios.get(`${API_URL}/showtime/${showtimeId}/seats`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch seat numbers for showtime with id ${showtimeId}.`);
    }
};

const ticketsService = {
    getTickets,
    getTicket,
    createTicket,
    createTicketsBulk,
    updateTicket,
    deleteTicket,
    getSeatNumbersByShowtime,
};

export default ticketsService;
