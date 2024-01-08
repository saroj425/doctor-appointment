import React, { useState } from 'react'
import './Layout.css'
import { Link,useLocation,useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux'
import {Badge} from 'antd'

const Layout = ({children}) => {
  const [collapsed,setCollapsed] = useState(false);
  const {user} = useSelector(state=>state.user);
  console.log("User======",user?._id)
  // const splitstring = user.name.split(" ");
  // const uname = splitstring[0];
  const location = useLocation();
  const navigate = useNavigate();

  const userMenu = [
    {
      name:"Home",
      path:"/",
      icon:"ri-home-line"
    },
    {
      name:"Appointment",
      path:"/appointment",
      icon:"ri-file-list-line"
    },
    {
      name:"Apply Doctor",
      path:"/apply-doctor",
      icon:"ri-hospital-line"
    },
    {
      name:"Profile",
      path:"/profile",
      icon:"ri-user-line"
    },
   
  ]

  const doctorMenu = [
    {
      name:"Home",
      path:"/",
      icon:"ri-home-line"
    },
    {
      name:"Appointment",
      path:"/appointment",
      icon:"ri-file-list-line"
    },
    
    {
      name:"Profile",
      path:`/doctor/profile/${user?.userId}`,
      icon:"ri-user-line"
    },
   
  ]

  const adminMenu = [ 
    {
      name:"Home",
      path:"/",
      icon:"ri-home-line"
    },
    {
      name:"Users",
      path:"/all-users",
      icon:"ri-user-line"
    },
    {
      name:"Doctors",
      path:"/all-doctor",
      icon:"ri-user-line"
    },
    {
      name:"Profile",
      path:"/profile",
      icon:"ri-user-line"
    },
    
  ]


  const menutoBeRender = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;
  return (
    <div className='main p-2'>
        <div className='d-flex layout'>
            <div className={`${collapsed ? "collapsed-sidebar" : "sidebar"}`}>
              <div className='sidebar-header mb-2'> <h2>S.K Infotech</h2> </div>
              <hr/>
              <div className='menu'>
                {
                  menutoBeRender.map((menu)=>{
                    const isActive = location.pathname === menu.path
                    return <div className={`d-flex menu-item ${isActive && "active-menu-item"}`}>
                        <i className={menu.icon}></i>
                        { !collapsed && <Link to={menu.path}>{menu.name}</Link> }
                    </div>
                  })}
                  <div className={`d-flex menu-item`} onClick={()=>{localStorage.clear(); navigate("/login")}}>
                        <i className='ri-logout-box-r-line'></i>
                        { !collapsed && <Link to="/login">Logout</Link> }
                    </div>
              </div>
            </div>
            <div className='content'>
                <div className='header'>
                  {
                    collapsed ?(<i class="ri-menu-2-fill close-icon" onClick={()=>setCollapsed(false)}></i>) : (<i class="ri-close-line close-icon" onClick={()=>setCollapsed(true)}></i>)
                  }
                  <div className='d-flex align-items-center gap-2 px-3'>
                    <Badge count={user?.unseenNotifications.length} className='mr-2' onClick={()=>navigate("/notifications")}>
                      <i class="ri-notification-line close-icon mr-4"></i>
                    </Badge>                    
                    <Link  to="/profile" className='anchor'>{user?.name}</Link>
                  </div>
                </div>
                <div className='body'>
                    {children}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Layout