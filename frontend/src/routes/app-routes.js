import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from '../components/Home';
import Login from '../pages/Login/Login';
import UserHomePage from '../pages/UserHome/UserHomePage';
import SignUp from '../pages/SignUp/SignUp';
import UserHome from '../pages/UserHome/UserHome';
import ScheduleCollection from '../pages/SheduleWaste/ScheduleCollection';
import ProtectedRoute from './ProtectedRoute';
import Unauthorized from '../pages/Login/Unauthorized';
import AdminDashBoard from '../pages/Admin/AdminDashBoard';
import ReportIssue from '../pages/Support/ReportIssue';
import CollectionRouting from '../pages/SheduleWaste/CollectionRouting';
import UsersPage from '../pages/Admin/UsersPage/UsersPage';
import RouteShedule from '../pages/Admin/WasteCollection/RouteShedule';
import DateShedule from '../pages/Admin/WasteCollection/DateShedule';

















const AppRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          
          {/* Protected routes for users */}
          <Route 
            path="/dashboard" 
            element={<ProtectedRoute component={UserHomePage} allowedRoles={['User']} />} 
          />
          <Route 
            path="/userHome" 
            element={<ProtectedRoute component={UserHome} allowedRoles={['User']} />} 
          />
          <Route 
            path="/sheduleCollection" 
            element={<ProtectedRoute component={ScheduleCollection} allowedRoles={['User']} />} 
          />

          {/* Example protected route for admin */}
          <Route 
            path="/admindashboard" 
            element={<ProtectedRoute component={AdminDashBoard} allowedRoles={['admin']} />} 
          />
          <Route 
            path="/users" 
            element={<ProtectedRoute component={UsersPage} allowedRoles={['admin']} />} 
          />
          <Route 
            path="/admindashboard/collection-routine" 
            element={<ProtectedRoute component={RouteShedule} allowedRoles={['admin']} />} 
          />
          <Route 
            path="/admindashboard/collection-routine/dateShedule" 
            element={<ProtectedRoute component={DateShedule} allowedRoles={['admin']} />} 
          />
        </Routes>
      </Router>
    </>
  );
}

export default AppRoutes;
