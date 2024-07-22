import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTicketById, updateTicket, deleteTicket } from '../utils/api';
import logDetails from '../utils/logUtil';

const TicketDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [form, setForm] = useState({ status: '', response: '', comments: '', priority: '' });

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await getTicketById(id);
        setTicket(response);
        setForm({
          status: response.status,
          response: response.response,
          comments: response.comments || '',
          priority: response.priority || 'medium',
        });
        logDetails('Fetched ticket details', response);
      } catch (error) {
        logDetails('Failed to fetch ticket', error);
      }
    };
    fetchTicket();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTicket(id, form);
      navigate('/admin');
      logDetails('Ticket updated', form);
    } catch (error) {
      logDetails('Failed to update ticket', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTicket(id);
      navigate('/admin');
      logDetails('Ticket deleted', { id });
    } catch (error) {
      logDetails('Failed to delete ticket', error);
    }
  };

  if (!ticket) return <p>Loading...</p>;

  return (
    <div>
      <h2>Ticket Details</h2>
      <p>{ticket.description}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Status:
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
            <option value="postponed">Postponed</option>
          </select>
        </label>
        <label>
          Response:
          <textarea name="response" value={form.response} onChange={handleChange} />
        </label>
        <label>
          Comments:
          <textarea name="comments" value={form.comments} onChange={handleChange} />
        </label>
        <label>
          Priority:
          <select name="priority" value={form.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <button type="submit">Update Ticket</button>
      </form>
      <button onClick={handleDelete}>Delete Ticket</button>
    </div>
  );
};

export default TicketDetailPage;
