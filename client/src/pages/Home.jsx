import React, { useState,useEffect } from 'react'
import axios from 'axios';
import Layout from '../components/Layout';

const Home = () => {
  const [data,setData] = useState();

  const getData = async()=>{
    try {
      const response = await axios.post('api/user/getuserinfobyid',{},{
        headers:{
          'Content-Type' : 'application/json',
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getData()
  },[])
  return (
    <Layout>
      <h1>Homepage</h1>
    </Layout>
  )
}

export default Home