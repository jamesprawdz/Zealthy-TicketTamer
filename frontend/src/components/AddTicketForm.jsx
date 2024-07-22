import React, { useState } from 'react';
import { createTicket } from '../utils/api';
import logDetails from '../utils/logUtil';

const AddTicketForm = () => {
  const [form, setForm] = useState({ name: '', email: '', description: '', priority: 'medium' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTicket(form);
      setMessage('Ticket submitted successfully!');
      setForm({ name: '', email: '', description: '', priority: 'medium' });
      logDetails('Ticket submitted', form);
    } catch (error) {
      setMessage('Failed to submit ticket.');
      logDetails('Ticket submission failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit a Support Ticket</h2>
      <label>
        Name:
        <input type="text" name="name" value={form.name} onChange={handleChange} required />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={form.email} onChange={handleChange} required />
      </label>
      <label>
        Description:
        <textarea name="description" value={form.description} onChange={handleChange} required />
      </label>
      <label>
        Priority:
        <select name="priority" value={form.priority} onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>
      <button type="submit">Submit</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default AddTicketForm;
