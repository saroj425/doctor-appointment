import React, { useState,useEffect } from 'react'
import Layout from '../../components/Layout'
import Doctorform from '../../components/Doctorform'
import {Form,Row,Col,Input,TimePicker,Button} from 'antd'
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate,useParams} from 'react-router-dom'
import { showLoading,hideLoading } from '../../redux/alertsSlice'
import toast from 'react-hot-toast'
import Doctorform from '../../components/Doctorform'

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {user} = useSelector(state=>state.user);
    const params = useParams();
    const [doctor,setDoctor] = useState(null);

    console.log("paramsparams",params)
    const onFinish = async(values)=>{
        // try {
        //    // dispatch(showLoading);
        //     const response = await axios.post("/api/doctor/get-doctor-by-user-id",{...values,userId:user._id },{
        //         headers:{
        //             'Content-Type' : 'application/json',
        //             Authorization: `Bearer ${localStorage.getItem("token")}`
        //           }
        //     });
        //     ///dispatch(hideLoading);
        //     if(response.data.success){
        //         toast.success(response.data.message);
        //         navigate("/");
        //     }else{
        //         toast.error(response.data.message)
        //     }
        // } catch (error) {
        //     toast.error("Something went wrong");
        // }
        // console.log("Received value from form", values);
    }

    const getDoctordata = async()=>{
        try {
          dispatch(showLoading())
            const response = await axios.get('/api/doctor/get-doctor-by-user-id',{userId:params.userId},{
              headers:{
                'Content-Type' : 'application/json',
                Authorization: "Bearer " + localStorage.getItem("token")
              }
            });
            dispatch(hideLoading())
            if(response.data.success){
            //   dispatch(setUser(response.data.data))
            setDoctor(response.data.data);
                //dispach(reloadUserData(false))
            }
        } catch (error) {
          dispatch(hideLoading())          
        }
      }
      useEffect(()=>{
          getDoctordata();
      },[])


  return (
    <Layout>
        <h1 className='page-title'>Doctor Profile</h1>
        <hr/>
        <Doctorform onFinish={onFinish}/>
    </Layout>
  )
}

export default Profile