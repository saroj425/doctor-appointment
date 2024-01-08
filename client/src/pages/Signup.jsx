import React from 'react'
import {Form,Input,Button} from 'antd'
import { Link,useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'

import axios from 'axios';
import toast from 'react-hot-toast';
import { hideLoading, showLoading } from '../redux/alertsSlice';

//const url = "http://localhost:5000"

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = async(values)=>{
        try {
            dispatch(showLoading());
            const response = await axios.post("/api/user/register",values);
            dispatch(hideLoading());
            if(response.data.success){
                toast.success(response.data.message);
                toast("Redirecting to login page");
                navigate("/login");
            }else{
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
        // console.log("Received value from form", values);
    }


  return (
    <div className='authontication'>
        <div className='auth-form card p-3'>
            <h1 className='card-title'>Register Your Self</h1>
            <Form layout='vertical' onFinish={onFinish}>
                <Form.Item  label="Name" name="name">
                    <Input placeholder='Name'/>
                </Form.Item>
                <Form.Item  label="Email" name="email">
                    <Input placeholder='Email'/>
                </Form.Item>
                <Form.Item  label="Password" name="password">
                    <Input type='password' placeholder='Password'/>
                </Form.Item>
                <Button className='primary-button mt-3' htmlType='submit'>Register</Button>
                <div className='mt-3'>
                    <Link to="/login" className='anchor'>Click Here to Login Page</Link>
                </div>
            </Form>
        </div>
    </div>
  )
}

export default Signup