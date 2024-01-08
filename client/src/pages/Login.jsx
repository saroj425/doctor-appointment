import React from 'react'
import {Form,Input,Button} from 'antd'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux' 
import toast from 'react-hot-toast'
import { hideLoading, showLoading } from '../redux/alertsSlice'

const Login = () => {
    // const {loading} = useSelector(state=>state.alerts);
    // console.log(loading);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = async(values)=>{
        try {
            //dispatch(showLoading())
            const response = await axios.post("/api/user/login",values);  
            //dispatch(hideLoading())         
            if(response.data.success){
                toast.success(response.data.message);
                toast.success("Redirecting to home page");
                localStorage.setItem("token",response.data.data)
                navigate("/");
            }else{
                toast.error(response.data.message)
            }
        } catch (error) {
            //dispatch(hideLoading());
            toast.error("Invalid Password");
        }
        // console.log("Received value from form", values);
    }


  return (
    <div className='authontication'>
        <div className='auth-form card p-3'>
            <h1 className='card-title'>Welcome Back</h1>
            <Form layout='vertical' onFinish={onFinish}>                
                <Form.Item  label="Email" name="email">
                    <Input placeholder='Email'/>
                </Form.Item>
                <Form.Item  label="Password" name="password">
                    <Input type="password" placeholder='Password'/>
                </Form.Item>
                <Button className='primary-button mt-3' htmlType='submit'>Login</Button>
                <div className='mt-3'>
                    <Link to="/signup" className='anchor'>Click Here to Register Page</Link>
                </div>
            </Form>
        </div>
    </div>
  )
}

export default Login