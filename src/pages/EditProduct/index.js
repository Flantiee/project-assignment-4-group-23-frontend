import React, { useState, useEffect } from 'react';
import './index.scss';  // 导入 SCSS 文件
import { Form, Input, Button, Select, InputNumber, Upload, message, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom'; // 导入用于导航的 hook
import { getToken } from '@/util';
import { getProductDetailAPI, updateProductAPI } from '@/apis/product';
const { Option } = Select;

const EditProduct = () => {
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [productDetail, setProductDetail] = useState(null)
    const { id } = useParams();
    const navigate = useNavigate();  // 使用 history hook 来进行页面跳转
    const base_url = 'http://127.0.0.1:7777'
    const token = getToken()

    const handleImageChange = (info) => {
        if (info.file.status === 'done') {
            setImageUrl(info.file.response?.url); // assuming the backend returns a URL of the uploaded image
        } else if (info.file.status === 'error') {
            message.error('Image upload failed');
        }
    };

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const data = {
                ...values,
                img: imageUrl,
                id: id
            };
            // Send data to the backend (assuming you have an API endpoint)
            const response = await updateProductAPI(data)
            if (response.status === 200) {
                message.success('Product updated');
                form.resetFields();
                navigate('/')
            }

        } catch (error) {
            message.error('Failed to create product');
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        navigate('/')
    };
    // fetchData from backend
    const fetchProductDetail = async () => {
        const response = await getProductDetailAPI(id);
        if (response.status === 200)
            setProductDetail(response.data)
    }

    useEffect(() => {
        fetchProductDetail()
    }, [id]); // 空数组表示仅在组件首次加载时执行一次

    useEffect(() => {
        if (productDetail) {
            form.setFieldsValue({
                name: productDetail.name,
                price: productDetail.price,
                brand: productDetail.brand,
                category: productDetail.category,
                quantity: productDetail.quantity,
                description: productDetail.description,
            });
            setImageUrl(productDetail.image_url)

        }
    }, [productDetail, form]); // 当 productDetail 或 form 变化时更新表单

    return (
        <div className="create-product-page">
            <Row justify="center">
                <Col xs={24} sm={18} md={12} lg={8}>
                    <div className="form-container">
                        <h2>Create Product</h2>
                        <Form form={form} onFinish={handleSubmit} layout="vertical">
                            {/* Product Name */}
                            <Form.Item
                                label="Product Name"
                                name="name"
                                rules={[{ required: true, message: 'Please enter product name' }]}
                            >
                                <Input placeholder="Enter name" />
                            </Form.Item>

                            {/* Price */}
                            <Form.Item
                                label="Price"
                                name="price"
                                rules={[{ required: true, message: 'Please enter product price' }]}
                            >
                                <InputNumber
                                    min={0}
                                    step={0.01}
                                    style={{ width: '100%' }}
                                    placeholder="Enter price"
                                />
                            </Form.Item>

                            {/* Brand Name */}
                            <Form.Item
                                label="Brand Name"
                                name="brand"
                                rules={[{ required: true, message: 'Please enter brand name' }]}
                            >
                                <Input placeholder="Enter brand" />
                            </Form.Item>

                            {/* Category */}
                            <Form.Item
                                label="Category"
                                name="category"
                                rules={[{ required: true, message: 'Please select category' }]}
                            >
                                <Select placeholder="Select category">
                                    <Option value="laptops">Laptops</Option>
                                    <Option value="desktops">Desktops</Option>
                                    <Option value="accessories">Accessories</Option>
                                </Select>
                            </Form.Item>

                            {/* Product Image */}
                            <Form.Item
                                label="Product Image"
                                name="img"

                            >
                                <Upload
                                    name="img"
                                    action={`${base_url}/upload`} // Your backend upload endpoint
                                    listType="picture"
                                    onChange={handleImageChange}
                                    showUploadList={false}
                                    headers={{
                                        Authorization: `Bearer ${token}`,  // 将 token 添加到 Authorization 请求头中
                                    }}
                                >
                                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                                </Upload>
                                {/* 显示上传的图片缩略图 */}
                                {imageUrl && (
                                    <div className="upload-thumbnail">
                                        <img src={imageUrl} alt="Thumbnail" />
                                    </div>
                                )}
                            </Form.Item>

                            {/* Quantity */}
                            <Form.Item
                                label="Quantity"
                                name="quantity"
                                rules={[{ required: true, message: 'Please enter quantity' }]}
                            >
                                <InputNumber min={1} style={{ width: '100%' }} placeholder="Enter quantity" />
                            </Form.Item>

                            {/* Description */}
                            <Form.Item
                                label="Description"
                                name="description"
                                rules={[{ required: true, message: 'Please enter product description' }]}
                            >
                                <Input.TextArea rows={4} placeholder="Enter product description" />
                            </Form.Item>

                            {/* 按钮布局 */}
                            <Form.Item>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            block
                                            loading={loading}
                                        >
                                            Update Product
                                        </Button>
                                    </Col>
                                    <Col span={12}>
                                        <Button
                                            type="default"
                                            block
                                            onClick={handleBack}
                                        >
                                            Go Back
                                        </Button>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default EditProduct;
