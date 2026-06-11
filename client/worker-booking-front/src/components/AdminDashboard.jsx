import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userRole, setUserRole] = useState("customer");
  const [error, setError] = useState(null);

  const API_BASE_URL = "https://urbanfix-backend-production.up.railway.app";

  const availableTabsByRole = {
    admin: [
      { key: "dashboard", label: "Dashboard" },
      { key: "users", label: "Users" },
      { key: "workers", label: "Workers" },
      { key: "requests", label: "Requests" },
    ],
    customer: [
      { key: "users", label: "Customer" },
      { key: "workers", label: "Worker" },
    ],
    worker: [
      { key: "users", label: "Customer" },
      { key: "workers", label: "Worker" },
    ],
  };

  const availableTabs =
    availableTabsByRole[userRole] || availableTabsByRole.customer;

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const savedUser = storedRole
      ? { role: storedRole }
      : JSON.parse(localStorage.getItem("user") || "{}");

    setUserRole(savedUser?.role || "customer");
  }, []);

  useEffect(() => {
    if (!availableTabs.some((tab) => tab.key === activeTab)) {
      setActiveTab(availableTabs[0].key);
    }
  }, [availableTabs, activeTab]);

  useEffect(() => {
    fetchDashboardData();
  }, [activeTab]);

  const getAuthToken = () => {
    return localStorage.getItem("token");
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    const token = getAuthToken();

    try {
      if (activeTab === "dashboard") {
        const response = await fetch(`${API_BASE_URL}/admin/dashboard/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (data.success) {
          setStats(data.data);
        }
      } else if (activeTab === "users") {
        const response = await fetch(`${API_BASE_URL}/admin/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (data.success) {
          setUsers(data.data);
        }
      } else if (activeTab === "workers") {
        const response = await fetch(`${API_BASE_URL}/admin/workers`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (data.success) {
          setWorkers(data.data);
        }
      } else if (activeTab === "requests") {
        const response = await fetch(`${API_BASE_URL}/admin/requests`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (data.success) {
          setRequests(data.data);
          // console.log(data.data); //reqs
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const token = getAuthToken();
      try {
        const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (data.success) {
          setUsers(users.filter((u) => u._id !== userId));
          alert("User deleted successfully");
        }
      } catch (err) {
        alert("Error deleting user: " + err.message);
      }
    }
  };

  //role updation

  const handleUpdateRole = async (userId, newRole) => {
    const token = getAuthToken();
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/users/${userId}/role`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role: newRole }),
        },
      );
      const data = await response.json();
      if (data.success) {
        setUsers(
          users.map((u) => (u._id === userId ? { ...u, role: newRole } : u)),
        );
        alert("Role updated successfully");
      }
    } catch (err) {
      alert("Error updating role: " + err.message);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>
        <nav>
          {availableTabs.map((tab) => (
            <button
              key={tab.key}
              className={activeTab === tab.key ? "active" : ""}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="admin-content">
        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">Error: {error}</p>}

        {activeTab === "dashboard" && stats && (
          <div className="dashboard-stats">
            <h1>Dashboard</h1>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Users</h3>
                <p>{stats.totalUsers}</p>
              </div>
              <div className="stat-card">
                <h3>Total Workers</h3>
                <p>{stats.totalWorkers}</p>
              </div>
              <div className="stat-card">
                <h3>Total Requests</h3>
                <p>{stats.totalRequests}</p>
              </div>
              <div className="stat-card">
                <h3>Completed Requests</h3>
                <p>{stats.completedRequests}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="users-section">
            <h1>Users Management</h1>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Verified</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.contact}</td>
                    <td>
                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleUpdateRole(user._id, e.target.value)
                        }
                      >
                        <option value="Admin">Admin</option>
                        <option value="customer">Customer</option>
                        <option value="worker">Worker</option>
                      </select>
                    </td>
                    <td>{user.isverified ? "Yes" : "No"}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "workers" && (
          <div className="workers-section">
            <h1>Workers Management</h1>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Verified</th>
                </tr>
              </thead>
              <tbody>
                {workers.map((worker) => (
                  <tr key={worker._id}>
                    <td>{worker.name}</td>
                    <td>{worker.email}</td>
                    <td>{worker.contact}</td>
                    <td>{worker.isverified ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "requests" && (
          <div className="requests-section">
            <h1>Requests Management</h1>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Worker</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req._id}>
                    <td>{req._id.substring(0, 8)}...</td>
                    <td>{req.customerId.name || "N/A"}</td>
                    <td>{req.workerProfileId._id || "N/A"}</td>
                    <td>{req.status || "Pending"}</td>
                    <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
