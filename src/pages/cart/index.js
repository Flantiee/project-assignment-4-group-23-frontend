import React, { useState, useEffect } from 'react';
import { Row, Col, Button, InputNumber, Typography, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './index.scss';
import { useSelector } from 'react-redux';
import { getCartListAPI, deleteCartAPI, updateCartAPI } from '@/apis/cart';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const Cart = () => {
    const userInfo = useSelector(state => state.user.userInfo); // get userId from redux
    const navigate = useNavigate()
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [costDetails, setCostDetails] = useState({
        total: 0,
        tax: 0,
        shipping: 0,
        finalTotal: 0
    })

    // 获取购物车商品数据
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await getCartListAPI(userInfo.id);
                setCartItems(response.data);
            } catch (error) {

            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, [userInfo]);

    // update cart
    const updateQuantity = async (id, quantity) => {
        const response = await updateCartAPI({ id, quantity })
        if (response.status === 200) {
            setCartItems(cartItems.map(item =>
                item.id === id ? { ...item, quantity } : item
            ));
        }
    };

    // delete one of the product
    const removeItem = async (id) => {
        const response = await deleteCartAPI(id)
        if (response.status === 200) {
            message.success("Product Deleted")
            setCartItems(cartItems.filter(item => item.id !== id));
        }
    };

    // start the checkout process
    const navigateToCheckOut = () => {
        if (cartItems != null && cartItems.length !== 0) {
            sessionStorage.setItem('isProgrammaticNavigation', 'true');
            navigate('/check-out', { state: costDetails })
        }

        else
            message.error("Please add Items to your cart")
    }

    // navigate to Product List
    const navigateToProductList = () => {
        navigate('/')
    }

    // 计算总价
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    // 计算税费
    const calculateTax = (total) => {
        return total * 0.13; // 假设税费为总价的10%
    };

    // 计算邮费
    const calculateShipping = (total) => {
        return total * 0.02;
    };

    // 计算总支出
    const calculateFinalTotal = () => {
        const total = calculateTotal();
        const tax = calculateTax(total);
        const shipping = calculateShipping(total);
        return total + tax + shipping;
    };



    useEffect(() => {
        if (cartItems != null) {
            const total = calculateTotal();
            const tax = calculateTax(total);
            const shipping = calculateShipping(total);
            const finalTotal = calculateFinalTotal();
            const tempCostDetail = { total, tax, shipping, finalTotal }
            setCostDetails(tempCostDetail)
        }
    }, [cartItems])

    return (
        <div className="page-container">
            <div className="cart-container">
                <Title level={2}>Shopping Cart</Title>
                {loading ? (
                    <Text>Loading.......</Text>
                ) : cartItems != null ? (
                    <div className="cart-items">
                        <Row className="cart-header">
                            <Col span={4}><Text strong>Image</Text></Col>
                            <Col span={10}><Text strong>Description</Text></Col>
                            <Col span={3}><Text strong>Quantity</Text></Col>
                            <Col span={3}><Text strong>TotalPrice</Text></Col>
                            <Col span={2}><Text strong>Delete</Text></Col>
                        </Row>
                        {cartItems.map(item => (
                            <Row key={item.id} className="cart-item">
                                <Col span={4} className="cart-item-img">
                                    <img src={item.image_url} alt={item.name} />
                                </Col>
                                <Col span={10}>
                                    <Title level={5}>{item.name}</Title>
                                    <Text>{item.description}</Text>
                                </Col>
                                <Col span={2} className="cart-item-quantity">
                                    <InputNumber
                                        min={1}
                                        value={item.quantity}
                                        onChange={(value) => updateQuantity(item.id, value)}
                                        style={{ width: '100%' }}
                                    />
                                </Col>
                                <Col span={4} className="cart-item-total">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </Col>
                                <Col span={2} className="cart-item-delete">
                                    <Button
                                        type="link"
                                        icon={<DeleteOutlined />}
                                        onClick={() => removeItem(item.id)}
                                    />
                                </Col>
                            </Row>
                        ))}
                    </div>
                ) : (
                    <Text>Cart is Empty</Text>
                )}

                <div className="cart-summary">
                    <Row>
                        <Col span={16}></Col>
                        <Col span={4}>
                            <Text strong>TotalPrice: </Text>
                            ${costDetails.total.toFixed(2)}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={16}></Col>
                        <Col span={4}>
                            <Text strong>Tax: </Text>
                            ${costDetails.tax.toFixed(2)}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={16}></Col>
                        <Col span={4}>
                            <Text strong>Delivery Fee: </Text>
                            ${costDetails.shipping.toFixed(2)}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={16}></Col>
                        <Col span={4}>
                            <Text strong>PaymentAmount: </Text>
                            ${costDetails.finalTotal.toFixed(2)}
                        </Col>
                    </Row>
                </div>

                <div className="cart-actions">
                    <Button type="primary" className="cart-action-btn" onClick={navigateToCheckOut}>Checkout</Button>
                    <Button className="cart-action-btn" onClick={navigateToProductList}>Back to List</Button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
