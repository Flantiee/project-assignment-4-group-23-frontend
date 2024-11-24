import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row, Spin, Empty } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './index.scss';
import { getPreviousCheckOutListAPI } from '@/apis/checkout';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const userId = useSelector(state => state.user.userInfo.id)

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const response = await getPreviousCheckOutListAPI(userId)
                if (response.status === 200)
                    setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const navigateToIndex = () => {
        navigate('/')
    }

    return (
        <div className="order-list-container">
            <div className="order-list-header">
                <h1>My Transactions</h1>
            </div>

            {loading ? (
                <div className="spin-container">
                    <Spin size="large" />
                </div>
            ) : orders.length > 0 ? (
                <Row gutter={16}>
                    {orders.map((order, index) => (
                        <Col span={8} key={index} className="order-item">
                            <Card title={`Transaction Id: ${order.id}`} bordered={false}>
                                <div className="order-details">
                                    <p><strong>Total Price: </strong> ${order.total_price}</p>
                                    <p><strong>Tax: </strong> ${order.tax}</p>
                                    <p><strong>Delivery: </strong> ${order.shipping_fee}</p>
                                    <p><strong>Payment Amount:</strong> ${order.payment_amount}</p>
                                    <p><strong>Payment Method:</strong> {order.payment_method}</p>
                                    <p><strong>Address:</strong> {order.address}</p>
                                    <p><strong>Order:</strong> {new Date(order.created_at).toLocaleString()}</p>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <Empty description="No Transaction exists" />
            )}

            <div className="back-button">
                <Button type="primary" onClick={navigateToIndex}>Back to Index</Button>
            </div>
        </div>
    );
};

export default Orders;
