import React, { useEffect, useState } from "react";
import { getAllTickets } from "../utils/api";
import TicketList from "../components/TicketList";
import logDetails from "../utils/logUtil";

const AdminDashboardPage = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await getAllTickets();
        setTickets(response);
      } catch (error) {
        logDetails("Failed to fetch tickets", error);
      }
    };
    fetchTickets();
  }, []);

  return (
    <div className="admin-dashboard">
      <TicketList tickets={tickets} />
    </div>
  );
};

export default AdminDashboardPage;
