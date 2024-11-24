// UserRegistrationForm.js
import React, { useEffect } from 'react';
import './index.scss';
import { Form, Input, Button, Select, Row, Col, message } from 'antd';
import { updateUserAPI } from '@/apis/user'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserInfo } from '@/store/module/user';


const { Option } = Select;

const UserInfo = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userInfo = useSelector((state) => state.user.userInfo)

    // 使用 setFieldsValue 动态设置 email 字段的值
    useEffect(() => {
        form.setFieldsValue({
            email: userInfo.email,
            role: userInfo.role,
            name: userInfo.name,
            phone: userInfo.phone,
            address: userInfo.address,
            payment_method: userInfo.payment_method,
        });
    }, [userInfo]);

    // Handle form submission
    const onFinish = async (formValue) => {
        const res = await updateUserAPI({ ...formValue, id: userInfo.id })
        if (res.status !== 200) {
            message.error(res.message)
        } else {
            message.success("Information Update Success")
            dispatch(fetchUserInfo())
        }

    };

    const toIndexPage = () => {
        navigate('/')
    }

    return (
        <div className='register'>
            <div className="registration-form-container">
                <h2>User Information</h2>
                <Form
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    layout="vertical"

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
                                    { min: 6, message: 'Password must be at least 6 characters' },
                                ]}
                                hasFeedback

                            >
                                <Input.Password placeholder="*******" />
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
                                    { pattern: /^[0-9]{16}$/, message: 'Card number must be 16 digits' },
                                ]}
                            >
                                <Input placeholder={`********${userInfo.payment_card_slice}`} />
                            </Form.Item>
                        </Col>

                        <Col xs={24}>
                            <Form.Item>
                                <div className="button-container">
                                    <Button type="primary" htmlType="submit" className="submit-button">
                                        Update
                                    </Button>

                                    <Button type="default" className="submit-button" onClick={toIndexPage}>
                                        Back
                                    </Button>

                                </div>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
};

export default UserInfo;
