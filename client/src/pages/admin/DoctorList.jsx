import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import {useDispatch} from 'react-redux'
import axios from 'axios'
import {Table} from 'antd'
import {toast} from 'react-hot-toast'
//import { render } from '../../../../routes/adminRoutes';

const DoctorList = () => {

  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch()

  const getDoctorData = async()=>{
    try {
        dispatch(showLoading);
        const resposne = await axios.get("/api/admin/get-all-doctors",{
          headers:{
            'Content-Type' : 'application/json',
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        dispatch(hideLoading);
        if(resposne.data.success){
          setDoctors(resposne.data.data ?? [])
        }
    } catch (error) {
      dispatch(hideLoading);
    }
  }

  const changeDoctorStatus = async(record,status)=>{
    console.log("recordrecordrecord",record);
    try {
        dispatch(showLoading());
        const resposne = await axios.post("/api/admin/change-doctor-status",{doctorId:record._id,userId:record.userId,status:status},{
          headers:{
            'Content-Type' : 'application/json',
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        dispatch(hideLoading());
        if(resposne.data.success){

          toast.success(resposne.data.message)
          setDoctors(resposne.data.data)
        }
    } catch (error) {
      toast.error("Error in changing status")
      dispatch(hideLoading());
    }
  }

  useEffect(()=>{
    getDoctorData();

  },[])

  const columns = [
    {
      title:"Name",
      dataIndex:"name",
      render:(text,record)=><p className='card-text'> {record.firstName} {record.lastName}</p>,
    },
    {
      title:"Phone",
      dataIndex:"phoneNumber",
    },
    {
      title:"Created At",
      dataIndex:"createdAt",
    },
    {
      title:"Status",
      dataIndex:"status",
    },
    {
      title:"Actions",
      dataIndex:"actions",
      render:(text,record)=>(
        <div className='d-flex'>
          {record.status ==="Pending" && <h1 className='anchor' onClick={()=>changeDoctorStatus(record,'Approved')}>Approve</h1>}
          {record.status ==="Approved" && <h1 className='anchor'onClick={()=>changeDoctorStatus(record,'Block')}>Block</h1>}  
        </div>
      )
    }
  ]



  return (
    <Layout>
        <h1>Doctor List</h1>
        <Table columns={columns} dataSource={doctors}/>
    </Layout>
  )
}

export default DoctorList