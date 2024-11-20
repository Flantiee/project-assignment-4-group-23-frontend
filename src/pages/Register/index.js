// UserRegistrationForm.js
import React from 'react';
import './index.scss';
import { Form, Input, Button, Select, Row, Col, message } from 'antd';
import { registerAPI } from '@/apis/user'
import { useNavigate } from 'react-router-dom'


const { Option } = Select;

const Register = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate()

    // Handle form submission
    const onFinish = async (formValue) => {
        const res = await registerAPI(formValue)
        if (res.status !== 200) {
            message.error(res.message)
        } else {
            navigate('/login')
        }
    };

    return (
        <div className='register'>
            <div className="registration-form-container">
                <h2>User Registration</h2>
                <Form
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    layout="vertical"
                    initialValues={{
                        role: 'user',
                        payment_method: 'debit',
                    }}
                    className="registration-form"
                >
                    <Row gutter={16}>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    { required: true, message: 'Please input your email!' },
                                    { type: 'email', message: 'Please input a valid email!' },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12}>
                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[
                                    { required: true, message: 'Please input your password!' },
                                    { min: 6, message: 'Password must be at least 6 characters' },
                                ]}
                                hasFeedback
                            >
                                <Input.Password />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12}>
                            <Form.Item
                                name="role"
                                label="Role"
                                rules={[{ required: true, message: 'Please select your role!' }]}
                            >
                                <Select>
                                    <Option value="user">User</Option>
                                    <Option value="admin">Admin</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12}>
                            <Form.Item
                                name="name"
                                label="Full Name"
                                rules={[{ required: true, message: 'Please input your full name!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12}>
                            <Form.Item
                                name="phone"
                                label="Phone"
                                rules={[
                                    { required: true, message: 'Please input your phone number!' },
                                    { pattern: /^[0-9]{10}$/, message: 'Phone number must be 10 digits' },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12}>
                            <Form.Item
                                name="address"
                                label="Address"
                                rules={[{ required: true, message: 'Please input your address!' }]}
                            >
                                <Input.TextArea />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12}>
                            <Form.Item
                                name="payment_method"
                                label="Payment Method"
                                rules={[{ required: true, message: 'Please select a payment method!' }]}
                            >
                                <Select>
                                    <Option value="debit">Debit</Option>
                                    <Option value="credit">Credit</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12}>
                            <Form.Item
                                name="payment_card_number"
                                label="Payment Card Number"
                                rules={[
                                    { required: true, message: 'Please input your card number!' },
                                    { pattern: /^[0-9]{16}$/, message: 'Card number must be 16 digits' },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col xs={24}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="submit-button">
                                    Register
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
};

export default Register;
