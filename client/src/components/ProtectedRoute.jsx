import React, { useEffect } from 'react'
import {Navigate,useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from "react-redux"
import axios from 'axios';
import { setUser } from '../redux/userSlice';
import { hideLoading, showLoading } from '../redux/alertsSlice';

const ProtectedRoute = (props) => {
  const {user} = useSelector((state)=>state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const getUser = async()=>{
    try {
      dispatch(showLoading())
        const response = await axios.post('/api/user/getuserinfobyid',{token:localStorage.getItem('token')},{
          headers:{
            'Content-Type' : 'application/json',
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        });
        dispatch(hideLoading())
        if(response.data.success){
          dispatch(setUser(response.data.data))
            //dispach(reloadUserData(false))
        }else{
          localStorage.clear();
          navigate("/login")
        }
    } catch (error) {
      dispatch(hideLoading())
      localStorage.clear();
      navigate("/login")
    }
  }
  useEffect(()=>{
    if(!user){
      getUser();
    }
  },[user])

  if(localStorage.getItem("token")){
    return props.children
  }else{
    return <Navigate to ="/login"/>;
  }
}

export default ProtectedRoute