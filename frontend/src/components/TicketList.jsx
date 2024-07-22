import React from 'react';
import { Link } from 'react-router-dom';
import logDetails from '../utils/logUtil';

const TicketList = ({ tickets }) => {
  logDetails('Rendering TicketList');

  return (
    <div className="ticket-list">
      <h3 className="ticket-list-title">All Tickets</h3>
      <table className="ticket-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Response</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket.id}>
              <td>{ticket.name}</td>
              <td>{ticket.email}</td>
              <td>{ticket.description}</td>
              <td>{ticket.priority}</td>
              <td>{ticket.status}</td>
              <td>{ticket.response}</td>
              <td>{ticket.comments}</td>
              <td>
                <Link to={`/admin/tickets/${ticket.id}`} className="view-details-link">View Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketList;
