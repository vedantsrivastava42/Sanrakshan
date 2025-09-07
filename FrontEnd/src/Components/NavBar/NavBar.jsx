
import './NavBar.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const Navbar = ({ toggleLoginPopup }) => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const [menu,setMenu] =useState("home");
  
  const handleLogout = () => {
    logout();
  };

  return (
    <div className='navbar'>
      <img className="logo" src={assets.logo} alt="not found" />
      <ul className="navbar-menu">
        <li onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>  <Link to="/">Home</Link> </li>
        {isAdmin() ? (
          // Admin-specific navigation
          <>
            <li onClick={()=>setMenu("pending-requests")} className={menu==="pending-requests"?"active":""}>  <Link to="/pending-requests">Pending Requests</Link> </li>
            <li onClick={()=>setMenu("admin-dashboard")} className={menu==="admin-dashboard"?"active":""}>  <Link to="/admin-dashboard">Admin Dashboard</Link> </li>
            <li onClick={()=>setMenu("reports")} className={menu==="reports"?"active":""}>  <Link to="/reports">Reports</Link> </li>
          </>
        ) : (
          // Regular user navigation
          <>
            <li onClick={()=>setMenu("track-progress")} className={menu==="track-progress"?"active":""}>  <Link to="/trackprogress">Track Progress</Link> </li>
            <li onClick={()=>setMenu("dashboard")} className={menu==="dashboard"?"active":""}>  <Link to="dashboard">DashBoard</Link> </li>
            <li onClick={()=>setMenu("apply-noc")} className={menu==="apply-noc"?"active":""}>  <Link to="applynoc">Apply for NOC</Link> </li>
            <li onClick={()=>setMenu("complaint")} className={menu==="complaint"?"active":""}>  <Link to="complaint">Lodge Complaint</Link> </li>
          </>
        )}
      </ul>
      <div className="navbar-right">
        {isAuthenticated() ? (
          <>
            <span style={{color: '#fff', marginRight: '10px'}}>
              Welcome, {user?.name || user?.email}
            </span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={toggleLoginPopup}>Sign in</button>
            <button onClick={toggleLoginPopup}>Login</button>
          </>
        )}
      </div>
    </div>
  )
}

export {Navbar}
