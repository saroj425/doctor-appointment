import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import {useDispatch} from 'react-redux'
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import axios from 'axios';
import {Table} from 'antd'
import {Toast} from 'react-hot-toast'

const UserList = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch()

  const getUserData = async()=>{
    try {
        dispatch(showLoading);
        const resposne = await axios.get("/api/admin/get-all-users",{
          headers:{
            'Content-Type' : 'application/json',
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        dispatch(hideLoading);
        if(resposne.data.success){
          setUsers(resposne.data.data)
        }
    } catch (error) {
      dispatch(hideLoading);
    }
  }

  const changeUserStatus = async(record,status)=>{
    console.log("recordrecordrecord",record);
    try {
        dispatch(showLoading());
        const resposne = await axios.post("/api/admin/change-user-status",{userId:record._id,userId:record.userId,status:status},{
          headers:{
            'Content-Type' : 'application/json',
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        dispatch(hideLoading());
        if(resposne.data.success){

          toast.success(resposne.data.message)
          setUsers(resposne.data.data)
        }
    } catch (error) {
      toast.error("Error in changing status")
      dispatch(hideLoading());
    }
  }

  useEffect(()=>{
    getUserData();
  },[])

  const columns = [
    {
      title:"Name",
      dataIndex:"name",
    },
    {
      title:"Email",
      dataIndex:"email",
    },
    {
      title:"Created At",
      dataIndex:"createdAt",
    },
    {
      title:"Actions",
      dataIndex:"actions",
      render:(text,record)=>(
        <div className='d-flex'>
          <h1 className='anchor'>Block</h1>
        </div>
      )
    }
  ]

  return (
    <Layout>
        <h1>User List</h1>
        <Table columns={columns} dataSource={users}></Table>
    </Layout>
  )
}

export default UserList