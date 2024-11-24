// src/components/HeaderNavBar.js
import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { UserOutlined, ShoppingCartOutlined, AppstoreAddOutlined, HistoryOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import { removeToken } from '@/util';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/module/user';
const { Header } = Layout;

const HeaderNavBar = ({ userInfo, userRole }) => {
    const location = useLocation(); // 获取当前的路由信息
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout())
        removeToken()
        navigate('/login')
    }

    return (
        <Header style={{ background: 'white', padding: 0, boxShadow: 'none', height: '40px' }}>
            <div style={{ float: 'left', marginLeft: 25, fontSize: 25, color: '#000', height: '40px' }}>
                <Link to="/" style={{ color: '#000' }}>Computer Mall</Link>
            </div>

            <Menu
                theme="light"  // 使用 light 主题，背景白色，文字黑色
                mode="horizontal"
                defaultSelectedKeys={[location.pathname]} // 根据当前路径设置选中的菜单项
                style={{ lineHeight: '40px', float: 'right', width: '40%' }}
            >
                {/* 未登录时显示登录和注册 */}
                {userInfo === null ? (
                    <>
                        <Menu.Item key="/login" icon={<LoginOutlined />} style={{ color: '#000' }}>
                            <Link to="/login" style={{ color: '#000' }}>Login</Link>
                        </Menu.Item>
                        <Menu.Item key="/register" icon={<UserAddOutlined />} style={{ color: '#000' }}>
                            <Link to="/register" style={{ color: '#000' }}>Register</Link>
                        </Menu.Item>
                    </>
                ) : (
                    <>
                        {/* 已登录时显示用户信息和其他功能 */}
                        <Menu.Item key="/user-info" icon={<UserOutlined />} style={{ color: '#000' }}>
                            <Link to="/user-info" style={{ color: '#000' }}>UserInfo</Link>
                        </Menu.Item>
                        <Menu.Item key="/log-out" icon={<UserOutlined />} style={{ color: '#000' }} onClick={handleLogout}>
                            Logout
                        </Menu.Item>
                        <Menu.Item key="/cart" icon={<ShoppingCartOutlined />} style={{ color: '#000' }}>
                            <Link to="/cart" style={{ color: '#000' }}>Cart</Link>
                        </Menu.Item>
                        <Menu.Item key="/orders" icon={<HistoryOutlined />} style={{ color: '#000' }}>
                            <Link to="/orders" style={{ color: '#000' }}>Previous Order</Link>
                        </Menu.Item>
                        {/* 如果是管理员角色，显示创建商品页面 */}
                        {userRole === 'admin' && (
                            <Menu.Item key="/create-product" icon={<AppstoreAddOutlined />} style={{ color: '#000' }}>
                                <Link to="/create-product" style={{ color: '#000' }}>Add new Product</Link>
                            </Menu.Item>
                        )}
                    </>
                )}
            </Menu>
        </Header>
    );
};

export default HeaderNavBar;
