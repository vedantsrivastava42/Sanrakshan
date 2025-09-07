import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from './Components/NavBar/NavBar';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import Home from './user/pages/Home/Home';
import TrackProgress from './user/pages/TrackProgress/TrackProgress';
import DashBoard from './user/pages/DashBoard/DashBoard';
import ApplyNOC from './user/pages/ApplyNOC/ApplyNOC';
import LoginPopup from './user/components/LoginPopup/Loginpopup';
import Footer from './Components/Footer/Footer';
import Complaint from './user/pages/Complaint/Complaint';
import AdminDashboard from './admin/pages/AdminDashboard/AdminDashboard';
import PendingRequests from './admin/pages/PendingRequests/PendingRequests';
import Reports from './admin/pages/Reports/Reports';
import { useState } from 'react';

const App = () => {
  const [referenceId] = useState('ref-1725605939080'); // Replace with dynamic value as needed
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle login popup visibility
  const toggleLoginPopup = () => setIsOpen(!isOpen);

  return (
    <AuthProvider>
      {isOpen && (
        <LoginPopup
          toggleDialog={toggleLoginPopup}
          isOpen={isOpen}
        />
      )}
      <div className='app'>
        <Navbar toggleLoginPopup={toggleLoginPopup} /> {/* Pass function if needed */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/trackProgress" element={<TrackProgress referenceId={referenceId} />} />
          <Route path="/applynoc" element={<ApplyNOC />} />
          <Route path="/complaint" element={<Complaint />} />
          {/* Admin routes */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/pending-requests" element={<PendingRequests />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
      <Footer />
    </AuthProvider>
  );
};

export default App;