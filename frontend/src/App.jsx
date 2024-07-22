import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import AddTicketForm from './components/AddTicketForm';
import LoginPage from './pages/LoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import TicketDetailPage from './pages/TicketDetailPage';
import logDetails from './utils/logUtil';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      logDetails("User is authenticated", { isAuthenticated: true });
    }
  }, []);

  return (
    <Router>
      <NavigationBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<AddTicketForm />} />
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/admin/tickets" element={<AdminDashboardPage />} />
        <Route path="/admin/tickets/:id" element={<TicketDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
