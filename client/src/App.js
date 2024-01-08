import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

import './App.css';
import { Button} from 'antd';
import Login from './pages/Login';
import Signup from './pages/Signup';
import {Toaster} from 'react-hot-toast'
import Home from './pages/Home';
import {useSelector} from 'react-redux'
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import ApplyDoctor from './pages/ApplyDoctor';
import Notifications from './pages/Notifications';
import DoctorList from './pages/admin/DoctorList';
import UserList from './pages/admin/UserList'
import Profile from './pages/admin/Profile';
import Appointment from './pages/Appointment';
import Doctorprofile from './components/Doctorform'

function App() {
  const {loading} = useSelector(state=>state.alerts);
  return (
    
    <BrowserRouter>
      {
        loading && (
          <div className='spinner-parent'>
              <div class="spinner-border" role="status"> </div>
          </div>
        )
      }
      <Toaster position="top-center" reverseOrder = {false}/>
      <Routes>
        <Route path='/login' element={<PublicRoute><Login/></PublicRoute>}/>
        <Route path='/signup' element={<PublicRoute><Signup/></PublicRoute>}/>
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path="/apply-doctor" element={<ProtectedRoute><ApplyDoctor/></ProtectedRoute>}/>
        <Route path="/notifications" element={<ProtectedRoute><Notifications/></ProtectedRoute>}/>
        <Route path="/all-users" element={<ProtectedRoute><UserList/></ProtectedRoute>}/>
        <Route path="/all-doctor" element={<ProtectedRoute><DoctorList/></ProtectedRoute>}/>
        <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
        <Route path="/appointment" element={<ProtectedRoute><Appointment/></ProtectedRoute>}/>
        <Route path="/doctor/profile/:doctorid" element={<ProtectedRoute><Doctorprofile/></ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
