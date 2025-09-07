import "./AdminDashboard.css";
import { useAuth } from '../../../Context/AuthContext';

const AdminDashboard = ({ pendingApplications = 0, scheduledApplications = 0 }) => {
  const { user } = useAuth();
  
  return (
    <>
      <div className="dashboard-container">
        <h2>Officer's Details</h2>
        <div className="card-container">
          <div className="dash">
            <p className="dash">Name: {user?.name || 'N/A'}</p>
            <p className="dash">Designation: {user?.role || 'N/A'}</p>
          </div>
        </div>
      </div>
      <div className="dashboard-container">
        <h2>Application Dashboard</h2>
        <div className="card-container">
          <div className="card">
            <h3>Pending Applications</h3>
            <p>{pendingApplications}</p>
          </div>
          <div className="card">
            <h3>Scheduled Applications</h3>
            <p>{scheduledApplications}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
