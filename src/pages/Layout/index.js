import React, { useState, useEffect } from 'react';
import './index.scss';
import HeaderNavBar from '@/components/HeaderNavBar/Index';
import { createCartAPI } from '@/apis/cart';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { Input, Select, Slider, Button, Card, Pagination, Spin, Typography, Row, Col, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { getProductListAPI } from '@/apis/product'
import emptyImage from '@/assets/background.png'; // 使用绝对路径或相对路径引入图片
const { Title } = Typography;
const { Option } = Select;

const Layout = () => {
    const { role, userInfo } = useSelector((state) => state.user);
    const navigate = useNavigate()
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [filters, setFilters] = useState({
        category: 'laptops',
        name: '',
        min_price: 0,
        max_price: 2500,
        sort_by: 'price',
        sort_order: 'asc',
        page: 1,
        limit: 3,
    });

    // Fetch products when filters change
    const fetchProducts = async () => {
        setLoading(true);
        // const filteredParams = filters.name === '' ? { ...filters, name: undefined } : { ...filters };
        try {
            const response = await getProductListAPI({ ...filters })
            while (response.data.length < 3) {
                response.data.push(null);  // 使用 null 填充空白项
            }
            setProducts(response.data);
            setTotal(response.size);

        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handle search click
    const handleSearch = () => {
        // setFilters((prevFilters) => ({
        //     ...prevFilters,
        //     page: 1, // Reset to first page when searching
        // }));
        fetchProducts()
    };

    // Handle filter changes
    const handleFilterChange = (newFilters) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            ...newFilters,
        }));
    };

    // Handle price range change
    const handlePriceChange = (value) => {
        handleFilterChange({ min_price: value[0], max_price: value[1] });
    };

    // Handle page change
    const handlePageChange = (page) => {
        handleFilterChange({ page });
    };

    // Handle sort order change
    const handleSortChange = (value) => {
        handleFilterChange({ sort_order: value });
    };

    // Handle category change
    const handleCategoryChange = (value) => {
        handleFilterChange({ category: value, page: 1 });
    };

    const toDetailPage = (id) => {
        if (id != null)
            navigate(`/productdetail/${id}`)
    }
    const addToCart = async (id) => {
        const response = await createCartAPI({ user_id: userInfo.id, product_id: id, quantity: 1 })
        if (response.status === 201 || response.status === 200)
            message.success("Item added to cart")
    }

    const toEditProductPage = (id) => {
        // product_id
        if (id != null)
            navigate(`/edit-product/${id}`)
    }

    // useEffect(() => {
    //     fetchProducts();
    // }, []);

    useEffect(() => {
        // 当 page 变化时执行 fetchProducts
        fetchProducts();
    }, [filters.page]); // 只在 filters.page 变化时触发

    return (

        <div className="product-list-container">
            <HeaderNavBar userRole={role} userInfo={userInfo} />
            <Title level={2} className="page-title">Product List</Title>
            <div className="search-filters">
                <Row gutter={16} justify="space-between">
                    <Col xs={24} sm={12} md={6}>
                        <label>Search by Name</label>
                        <Input
                            placeholder="Search by name"
                            value={filters.name}
                            onChange={(e) => handleFilterChange({ name: e.target.value })}
                            onPressEnter={handleSearch}
                            prefix={<SearchOutlined />}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <label>Category</label>
                        <Select
                            value={filters.category}
                            onChange={handleCategoryChange}
                            style={{ width: '100%' }}
                        >
                            <Option value="laptops">Laptops</Option>
                            <Option value="accessories">Accessories</Option>
                            <Option value="desktops">Desktops</Option>
                        </Select>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <label>Price Range</label>
                        <Slider
                            range
                            min={0}
                            max={10000}
                            defaultValue={[filters.min_price, filters.max_price]}
                            onChange={handlePriceChange}

                        />
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <label>Price order</label>
                        <Select
                            value={filters.sort_order}
                            onChange={handleSortChange}
                            style={{ width: '100%' }}
                        >
                            <Option value="asc">Ascend</Option>
                            <Option value="desc">Decrease</Option>
                        </Select>
                    </Col>
                </Row>
                <Button className='search-btn' type="primary" onClick={handleSearch} style={{ marginTop: 16 }}>
                    Search
                </Button>
            </div>
            <div className="product-list">
                {loading ? (
                    <div className="spin-container">
                        <Spin size="large" />
                    </div>
                ) : (
                    <div className="product-list">
                        {products.map((product, index) => (
                            <Card
                                key={index}
                                hoverable
                                className="product-card"
                                onClick={() => toDetailPage(product == null ? null : product.id)}
                                cover={
                                    product ? (
                                        <img alt={product.name} src={product.image_url} />
                                    ) : (
                                        <img alt='None' src={emptyImage} />
                                    )
                                }
                            >
                                <div className="product-card-body">
                                    {product ? (
                                        <>
                                            <h3>{product.name}</h3>
                                            <p className="product-price">${product.price}</p>
                                            <p className="product-description">{product.description}</p>
                                            {role === 'admin' ? (
                                                <>
                                                    <div style={{ display: 'flex', marginTop: 16 }}>
                                                        <Button color='primary' variant="solid" onClick={(e) => { e.stopPropagation(); addToCart(product.id) }} style={{ marginRight: 10 }}>
                                                            Add to cart
                                                        </Button>
                                                        <Button
                                                            color="default"
                                                            variant="solid"
                                                            onClick={(e) => { e.stopPropagation(); toEditProductPage(product.id) }} // 处理 admin 相关操作
                                                        >
                                                            Edit
                                                        </Button>
                                                    </div>
                                                </>
                                            ) : (
                                                <Button type="primary" onClick={(e) => { e.stopPropagation(); addToCart(product.id) }} style={{ marginTop: 16 }}>
                                                    Add to cart
                                                </Button>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <h3>No Product Available</h3>
                                            <p className="product-price">Price Unavailable</p>
                                            <p className="product-description">Description not available at the moment. Please adjust your search criteria or filter settings</p>
                                        </>
                                    )}
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
            <Pagination
                current={filters.page}
                total={total}
                pageSize={filters.limit}
                onChange={handlePageChange}
                className="pagination"
            />
        </div>
    );
};

export default Layout;
