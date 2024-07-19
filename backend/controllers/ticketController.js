const Ticket = require('../models/ticketModel');
const logEmail = require('../utils/emailLogUtil');
const logDetails = require('../utils/logUtil');

const createTicket = async (req, res) => {
  logDetails("Starting createTicket function...");
  try {
    const { name, email, description, priority } = req.body;
    logDetails("Received data", req.body);

    const newTicket = await Ticket.create({ name, email, description, priority });
    logDetails("New ticket created", newTicket.toJSON());

    const emailContent = `
      Hello ${newTicket.name},

      Thank you for reaching out to our support team. We have successfully created a ticket for your issue with the following details:

      - Description: ${newTicket.description}
      - Status: ${newTicket.status}
      - Priority: ${newTicket.priority}

      Our support team will review your ticket and get back to you as soon as possible.
      
      If you need to provide additional information or have any questions, please reply to this email.

      Best regards,
      The Support Team
    `;

    logEmail(newTicket.email, "Your Support Ticket has been Created", emailContent);
    logDetails("Email log complete");

    res.status(201).json(newTicket);
    logDetails("Ticket creation response sent");
  } catch (error) {
    console.error("Error during ticket creation:", error);
    res.status(500).json({ error: 'Failed to create ticket' });
  }
};

const getAllTickets = async (req, res) => {
  logDetails("Starting getAllTickets function...");
  try {
    const tickets = await Ticket.findAll();
    logDetails("Fetched tickets", tickets.map(ticket => ticket.toJSON()));

    res.status(200).json(tickets);
    logDetails("Tickets retrieval response sent");
  } catch (error) {
    console.error("Error during ticket fetch:", error);
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
};

const getTicketById = async (req, res) => {
  logDetails("Starting getTicketById function...");
  try {
    const { id } = req.params;
    logDetails("Received data", { id });

    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      logDetails("Ticket not found", { id });
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.status(200).json(ticket);
    logDetails("Ticket retrieval response sent", ticket.toJSON());
  } catch (error) {
    console.error("Error during ticket fetch by ID:", error);
    res.status(500).json({ error: 'Failed to fetch ticket' });
  }
};

const getResponseForStatus = (status) => {
  const responses = {
    closed: 'Ticket successfully resolved!',
    in_progress: 'Ticket is currently being worked on.',
    postponed: 'Ticket has been postponed.'
  };
  return responses[status] || null;
};

const getStatusForResponse = (response) => {
  const statuses = {
    'Ticket successfully resolved!': 'closed',
    'Ticket is currently being worked on.': 'in_progress',
    'Ticket has been postponed.': 'postponed'
  };
  return statuses[response] || 'open';
};

const updateTicket = async (req, res) => {
  logDetails("Starting updateTicket function...");
  try {
    const { id } = req.params;
    const { status, response, comments } = req.body;
    logDetails("Received data", { id, status, response, comments });

    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      logDetails("Ticket not found", { id });
      return res.status(404).json({ error: 'Ticket not found' });
    }

    if (ticket.status === 'closed' || ticket.response === 'Ticket successfully resolved!') {
      logDetails("Attempt to update a closed ticket", { id });
      if (comments) {
        ticket.comments = comments;
        await ticket.save();
        logDetails("Updated ticket comments", ticket.toJSON());
        return res.status(200).json(ticket);
      } else {
        return res.status(403).json({ error: 'Cannot update a closed ticket except for comments' });
      }
    }

    if (status) {
      ticket.status = status;
      ticket.response = getResponseForStatus(status);
    } else if (response) {
      ticket.response = response;
      ticket.status = getStatusForResponse(response);
    }
    ticket.comments = comments;

    if (ticket.status === 'closed' || ticket.response === 'Ticket successfully resolved!') {
      ticket.closedAt = new Date();
    }

    await ticket.save();
    logDetails("Updated ticket", ticket.toJSON());

    res.status(200).json(ticket);
    logDetails("Ticket update response sent");
  } catch (error) {
    console.error("Error during ticket update:", error);
    res.status(500).json({ error: 'Failed to update ticket' });
  }
};

const deleteTicket = async (req, res) => {
  logDetails("Starting deleteTicket function...");
  try {
    const { id } = req.params;
    logDetails("Received data", { id });

    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      logDetails("Ticket not found", { id });
      return res.status(404).json({ error: 'Ticket not found' });
    }

    if (ticket.status === 'closed' || ticket.response === 'Ticket successfully resolved!') {
      await ticket.destroy();
      logDetails("Deleted ticket", { id });
      return res.status(200).json({ message: 'Ticket deleted successfully' });
    } else {
      logDetails("Attempt to delete a non-closed ticket", { id });
      return res.status(403).json({ error: 'Can only delete closed tickets' });
    }
  } catch (error) {
    console.error("Error during ticket deletion:", error);
    res.status(500).json({ error: 'Failed to delete ticket' });
  }
};

module.exports = {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
};
