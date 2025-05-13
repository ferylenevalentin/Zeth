import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import InfoIcon from '@mui/icons-material/Info';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';

function Sidebar() {
  const navigate = useNavigate(); // Initialize useNavigate for routing

  const handleLogout = () => {
    const confirmLogout = window.confirm("Do you really want to logout?");
    if (confirmLogout) {
      navigate('/'); // Redirect to the login page
    }
  };

  return (
    <div className="sidebar-main">
      <div className="sidebar-links">
        <Link to="/">
          <HomeIcon /> HOME
        </Link>
        <Link to="/addstudent">
          <InfoIcon /> MANAGE STUDENTS
        </Link>
        <Link to="/adduser">
          <GroupIcon /> VIEW USERS
        </Link>
        <button className="logout-button" onClick={handleLogout}>
          <LogoutIcon /> LOGOUT
        </button>
      </div>
    </div>
  );
}

export default Sidebar;