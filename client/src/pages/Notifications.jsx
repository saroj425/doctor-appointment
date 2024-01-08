import React from 'react'
import Layout from '../components/Layout'
import {Tabs} from 'antd'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate,} from 'react-router-dom'
import { hideLoading, showLoading } from '../redux/alertsSlice'
import {toast} from 'react-hot-toast'
import axios from 'axios'
import { setUser } from '../redux/userSlice'

const Notifications = () => {
    const {user} = useSelector(state=>state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const markAllasRead = async()=>{
        try {
            dispatch(showLoading);
            const response = await axios.post("/api/user/mark-all-notification-seen", {userId:user._id} , {
                headers:{
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                  }
            });
            dispatch(hideLoading);
            if(response.data.success){
                toast.success(response.data.message);
                dispatch(setUser(response.data.data));
                
            }else{
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    const deleteAllNotification = async()=>{
        try {
            dispatch(showLoading());
            const response = await axios.post("/api/user/delete-all-notification", {userId:user._id} , {
                headers:{
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                  }
            });
            dispatch(hideLoading());
            if(response.data.success){
                toast.success(response.data.message);
                dispatch(setUser(response.data.data));
                
            }else{
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }


  return (
    <Layout>
        <h1 className='page-title'>Notifications</h1>
        <Tabs>
            <Tabs.Tabpane tab="Unseen" key={0}>
                <div className='d-flex justify-content-end flex-column'>
                    <h4 className='anchor' onClick={()=>markAllasRead()}>Mark all as read</h4>
                    {
                        user?.unseenNotifications.map((notification)=>(
                            <div className='card p-2' onClick={()=>navigate(notification.onClickPath)} style={{cursor:"pointer"}}>
                                <div className='card-text'>{notification.message}</div>
                            </div>
                        ))
                    }
                </div>
            </Tabs.Tabpane>
            <Tabs.Tabpane tab="Seen" key={1}>
                <div className='d-flex justify-content-end flex-column'>
                    <h4 className='anchor' onClick={()=>deleteAllNotification()}>Delete all</h4>
                    {
                        user?.seenNotifications.map((notification)=>(
                            <div className='card p-2' onClick={()=>navigate(notification.onClickPath)} style={{cursor:"pointer"}}>
                                <div className='card-text'>{notification.message}</div>
                            </div>
                        ))
                    }
                </div>
            </Tabs.Tabpane>
        </Tabs>
    </Layout>
  )
}

export default Notifications