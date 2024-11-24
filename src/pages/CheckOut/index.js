import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Divider, Typography, Button, message } from 'antd';
import { DollarOutlined, LeftOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { confirmCheckOutAPI } from '@/apis/checkout';
import './index.scss'; // 引入SCSS文件

const { Title } = Typography;

const Checkout = () => {
    const navigate = useNavigate()
    const { userInfo } = useSelector(state => state.user)
    const location = useLocation();  // 获取路由位置对象
    const totalPrice = location.state;  // 从 location.state 获取传递的数据

    // route guardin, block access from other pages except cart page
    useEffect(() => {
        // 假设通过某个标志来判断是否是代码跳转
        const isProgrammaticNavigation = sessionStorage.getItem('isProgrammaticNavigation');
        // 如果不是通过代码跳转，重定向到其他页面
        if (!isProgrammaticNavigation) {
            navigate('/'); // 或者其他你希望跳转的页面
        }

        // 清理 sessionStorage 中的标志
        return () => {
            sessionStorage.removeItem('isProgrammaticNavigation');
        };
    }, [navigate]);

    const handleConfirmCheckout = async () => {
        // 处理结账操作
        const response = await confirmCheckOutAPI(userInfo.id)
        if (response.status == 201) {
            message.success("CheckOut successed")
            navigate('/')
        }
    };

    const handleBack = () => {
        // 返回上一页面
        navigate('/cart')
    };

    return (
        <div className="checkout-page">
            <div className="background-overlay">
                <div className="content-container">
                    <Title level={2} className="page-title">Checkout</Title>
                    <Row gutter={16}>
                        {/* 用户信息 */}
                        <Col xs={24} sm={24} md={12} lg={12}>
                            <Card title="User Information">
                                <p><strong>Name:</strong> {userInfo.name}</p>
                                <p><strong>Address:</strong> {userInfo.address}</p>
                                <p><strong>Phone:</strong> {userInfo.phone}</p>
                                <p><strong>Payment Method:</strong> {`${userInfo.payment_method} card`}</p>
                                <p><strong>Card Number:</strong> {`**** **** **** ${userInfo.payment_card_slice}`}</p>
                            </Card>
                        </Col>

                        {/* 订单价格 */}
                        <Col xs={24} sm={24} md={12} lg={12}>
                            <Card title="Order Summary">
                                <Divider />
                                <Row>
                                    <Col span={12}>Item Total</Col>
                                    <Col span={12} style={{ textAlign: 'right' }}>
                                        <DollarOutlined /> {totalPrice.total.toFixed(2)}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>Tax (13%)</Col>
                                    <Col span={12} style={{ textAlign: 'right' }}>
                                        <DollarOutlined /> {totalPrice.tax.toFixed(2)}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>Shipping</Col>
                                    <Col span={12} style={{ textAlign: 'right' }}>
                                        <DollarOutlined /> {totalPrice.shipping.toFixed(2)}
                                    </Col>
                                </Row>
                                <Divider />
                                <Row>
                                    <Col span={12}>
                                        <strong>Total Price</strong>
                                    </Col>
                                    <Col span={12} style={{ textAlign: 'right' }}>
                                        <strong><DollarOutlined /> {totalPrice.finalTotal.toFixed(2)}</strong>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>

                    {/* 底部按钮部分 */}
                    <Row justify="center" style={{ marginTop: '30px' }}>
                        <Col span={12}>
                            <Button
                                type="primary"
                                block
                                size="small"  // 修改按钮大小
                                onClick={handleConfirmCheckout}
                                style={{ height: '40px' }}  // 统一按钮高度
                            >
                                Confirm Checkout
                            </Button>
                        </Col>
                        <Col span={12} >
                            <Button
                                type="default"
                                block
                                icon={<LeftOutlined />}
                                size="small"  // 修改按钮大小
                                onClick={handleBack}
                                style={{ height: '40px' }}  // 统一按钮高度
                            >
                                Back to Cart
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
