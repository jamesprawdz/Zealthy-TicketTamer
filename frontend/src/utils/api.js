import axios from 'axios';
import logDetails from './logUtil';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const createTicket = async (ticketData) => {
  const response = await axios.post(`${API_BASE_URL}/api/tickets`, ticketData);
  logDetails('Ticket created successfully');
  return response.data;
};

const login = async (credentials) => {
  const response = await axios.post(`${API_BASE_URL}/api/auth/login`, credentials);
  logDetails('User logged in successfully');
  return response.data;
};

const getAllTickets = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/admin/tickets`, {
    headers: getAuthHeaders(),
  });
  logDetails('Fetched all tickets successfully');
  return response.data;
};

const getTicketById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/api/admin/tickets/${id}`, {
    headers: getAuthHeaders(),
  });
  logDetails('Fetched ticket by ID successfully');
  return response.data;
};

const updateTicket = async (id, ticketData) => {
  const response = await axios.put(`${API_BASE_URL}/api/admin/tickets/${id}`, ticketData, {
    headers: getAuthHeaders(),
  });
  logDetails('Ticket updated successfully');
  return response.data;
};

const deleteTicket = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/api/admin/tickets/${id}`, {
    headers: getAuthHeaders(),
  });
  logDetails('Ticket deleted successfully');
  return response.data;
};

export { createTicket, login, getAllTickets, getTicketById, updateTicket, deleteTicket };
