import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './UserHome.css';
import NavbarComponent from '../../components/NavbarComponent'; 
import Footer from '../../components/Footer/Footer';
import placeholderImage from '../../assets/images/image.png'; // Make sure this path is correct.

const UserHome = () => {
  const [user, setUser] = useState(null);
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }

    // Update the current date and time every second
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedDate = dateTime.toLocaleDateString(undefined, {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const formattedTime = dateTime.toLocaleTimeString();

  return (
    <div className="user-home">
      {/* Navbar */}
      <NavbarComponent />

      {/* Header with dynamic user name */}
      <header className="user-header">
        {user ? (
          <h2>Hi, {user.firstName}!</h2>
        ) : (
          <h2>Hi, Guest!</h2>
        )}
        <p>{formattedDate} {formattedTime}</p>
      </header>

      <Footer/>
    </div>
  );
};

export default UserHome;
