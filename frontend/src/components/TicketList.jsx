import React from 'react';
import { Link } from 'react-router-dom';
import logDetails from '../utils/logUtil';

const TicketList = ({ tickets }) => {
  logDetails('Rendering TicketList', { tickets });

  return (
    <div>
      <h3>All Tickets</h3>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket.id}>
            <Link to={`/admin/tickets/${ticket.id}`}>{ticket.description}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketList;
