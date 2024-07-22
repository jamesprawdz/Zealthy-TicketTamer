import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTicketById, updateTicket, deleteTicket } from "../utils/api";
import logDetails from "../utils/logUtil";

const TicketDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [form, setForm] = useState({
    status: "",
    response: "",
    comments: "",
    priority: "",
  });

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await getTicketById(id);
        setTicket(response);
        setForm({
          status: response.status,
          response: response.response,
          comments: response.comments || "",
          priority: response.priority || "medium",
        });
        logDetails("Successfully fetched ticket details");
      } catch (error) {
        logDetails("Failed to fetch ticket", error);
      }
    };
    fetchTicket();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => {
      const updatedForm = { ...prevForm, [name]: value };
      if (name === "status") {
        if (value === "closed")
          updatedForm.response = "Ticket successfully resolved!";
        else if (value === "in_progress")
          updatedForm.response = "Ticket is currently being worked on.";
        else if (value === "postponed")
          updatedForm.response = "Ticket has been postponed.";
        else if (value === "open") updatedForm.response = "";
      } else if (name === "response") {
        if (value === "Ticket successfully resolved!")
          updatedForm.status = "closed";
        else if (value === "Ticket is currently being worked on.")
          updatedForm.status = "in_progress";
        else if (value === "Ticket has been postponed.")
          updatedForm.status = "postponed";
        else if (value === "") updatedForm.status = "open";
      }
      return updatedForm;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTicket(id, form);
      navigate("/admin/tickets");
      logDetails("Ticket updated", form);
    } catch (error) {
      logDetails("Failed to update ticket", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTicket(id);
      navigate("/admin/tickets");
      logDetails("Ticket deleted", { id });
    } catch (error) {
      logDetails("Failed to delete ticket", error);
    }
  };

  if (!ticket) return <p>Loading...</p>;

  const isClosed =
    ticket.status === "closed" ||
    ticket.response === "Ticket successfully resolved!";

  return (
    <div className="ticket-detail">
      <button onClick={() => navigate("/admin/tickets")} className="back-button">
        Back to Dashboard
      </button>
      <h2>Ticket Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <strong>Name:</strong> {ticket.name}
        </div>
        <div>
          <strong>Email:</strong> {ticket.email}
        </div>
        <div>
          <strong>Description:</strong>
          <div>{ticket.description}</div>
        </div>
        <div>
          <label>
            <strong>Status:</strong>{" "}
            {isClosed ? (
              <span>{form.status}</span>
            ) : (
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
                <option value="postponed">Postponed</option>
              </select>
            )}
          </label>
        </div>
        <div>
          <label>
            <strong>Priority:</strong>{" "}
            {isClosed ? (
              <span>{form.priority}</span>
            ) : (
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            )}
          </label>
        </div>
        <div>
          <label>
            <strong>Response:</strong>{" "}
            {isClosed ? (
              <span>{form.response}</span>
            ) : (
              <select
                name="response"
                value={form.response}
                onChange={handleChange}
              >
                {form.status !== "closed" && (
                  <option value="">-- Select a response --</option>
                )}
                <option value="Ticket successfully resolved!">
                  Ticket successfully resolved!
                </option>
                <option value="Ticket is currently being worked on.">
                  Ticket is currently being worked on.
                </option>
                <option value="Ticket has been postponed.">
                  Ticket has been postponed.
                </option>
              </select>
            )}
          </label>
        </div>
        <div>
          <label>
            <strong>Comments:</strong>
            <textarea
              name="comments"
              value={form.comments}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <p>
            <strong>Opened At:</strong>{" "}
            {new Date(ticket.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Updated At:</strong>{" "}
            {new Date(ticket.updatedAt).toLocaleString()}
          </p>
          <p>
            <strong>Closed At:</strong>{" "}
            {ticket.closedAt
              ? new Date(ticket.closedAt).toLocaleString()
              : "N/A"}
          </p>
        </div>
        <button type="submit" disabled={isClosed && !form.comments} className="update-button">
          Update Ticket
        </button>
      </form>
      {isClosed && (
        <button className="delete-button" onClick={handleDelete}>
          Delete Ticket
        </button>
      )}
    </div>
  );
};

export default TicketDetailPage;
