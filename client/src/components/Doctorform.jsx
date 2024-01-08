import React from 'react'
import Layout from './Layout'
import {Form,Row,Col,Input,TimePicker,Button} from 'antd'

const Doctorform = (onFinish) => {
  return (
    <Layout>
        <h1 className='page-title'>Doctor form</h1>
        <Form layout='vertical' onFinish={onFinish}>
            <h2><b>Personal Information</b></h2>
            <Row gutter={20}>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label="First Name" name="firstName" rules={[{required:true}]}>
                        <Input placeholder="Enter First Name"/>
                    </Form.Item>                    
                </Col>
                <Col span={8} xs={24} sm={28} lg={8}>
                    <Form.Item label="Last Name" name="lastName" rules={[{required:true}]}>
                        <Input placeholder="Enter Last Name"/>
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={28} lg={8}>
                    <Form.Item label="Phone No" name="phoneNumber" rules={[{required:true}]}>
                        <Input placeholder="Enter Phone Number"/>
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={28} lg={8}>
                    <Form.Item label="Address" name="address" rules={[{required:true}]}>
                        <Input placeholder="Enter Address"/>
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={28} lg={8}>
                    <Form.Item label="Website" name="website" rules={[{required:true}]}>
                        <Input placeholder="Enter website URL"/>
                    </Form.Item>
                </Col>
            </Row>
            <hr/>
            <h2><b>Professional Information</b></h2>
            <Row gutter={20}>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label="Specialization" name="specialization" rules={[{required:true}]}>
                        <Input placeholder="Enter specialization"/>
                    </Form.Item>                    
                </Col>
                <Col span={8} xs={24} sm={28} lg={8}>
                    <Form.Item label="Experience" name="experience" rules={[{required:true}]}>
                        <Input placeholder="Exxperience" type='number'/>
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={28} lg={8}>
                    <Form.Item label="Fee Per Consultation" name="feePerConsultation" rules={[{required:true}]}>
                        <Input placeholder="Enter Consultation fee" type='number'/>
                    </Form.Item>
                </Col>
                
                <Col span={8} xs={24} sm={28} lg={8}>
                    <Form.Item label="Timings" name="timings" rules={[{required:true}]}>
                        <TimePicker.RangePicker />
                    </Form.Item>
                </Col>
                
            </Row>
            <div className='d-flex justify-content-end'>
                <Button className="primary-button" htmlType='submit'> Submit</Button>
            </div>
        </Form>
    </Layout>
  )
}

export default Doctorform