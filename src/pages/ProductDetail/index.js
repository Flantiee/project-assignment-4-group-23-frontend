import React, { useEffect, useState } from 'react';
import './index.scss';
import { getProductDetailAPI } from '@/apis/product';
import { createCartAPI } from '@/apis/cart';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card, Col, Row, Typography, Image, Tag, Space, Button, Skeleton, message } from 'antd';
const { Title, Text } = Typography;


const ProductDetail = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const userInfo = useSelector((state) => state.user.userInfo)
    const { id } = useParams();

    const addToCart = async () => {
        const response = await createCartAPI({ user_id: userInfo.id, product_id: id, quantity: 1 })
        if (response.status === 201)
            message.success("Item added to cart")
    }

    const navigateToProductList = () => {
        navigate('/')
    }

    // Fetch product details from backend API
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductDetailAPI(id);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="loading-container">
                <Skeleton active paragraph={{ rows: 4 }} />
            </div>
        );
    }

    if (!product) {
        return <div>No product found.</div>;
    }

    const { name, price, category, brand, image_url, quantity, description, created_at } = product;

    return (
        <div className="product-detail-container">
            <Row gutter={[24, 24]} justify="center">
                <Col xs={24} sm={12} md={10} lg={8}>
                    {/* Product Image */}
                    <Card
                        hoverable
                        cover={<Image alt={name} src={image_url} />}
                        className="product-card"
                    />
                </Col>

                <Col xs={24} sm={12} md={10} lg={12}>
                    {/* Product Information */}
                    <Card className="product-info-card">
                        <Title level={2}>{name}</Title>
                        <Text className="product-brand">Brand: {brand}</Text>
                        <div className="price-category">
                            <Text className="price" strong>${price}</Text>
                            <Tag color="blue">{category}</Tag>
                        </div>
                        <div className="product-quantity">
                            <Text type="secondary">In Stock: {quantity}</Text>
                        </div>
                        <p className="product-description">{description}</p>
                        <div className="created-at">
                            <Text type="secondary">Available since: {new Date(created_at).toLocaleDateString()}</Text>
                        </div>
                        <Space>
                            <Button type="primary" size="large" onClick={() => addToCart()}>Add to Cart</Button>
                            <Button size="large" onClick={() => navigateToProductList()} >Back To List</Button>
                        </Space>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ProductDetail;
