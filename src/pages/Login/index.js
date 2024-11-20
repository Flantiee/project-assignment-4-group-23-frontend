import './index.scss'
import { Card, Form, Input, Button, message } from 'antd'
import { fetchLogin } from '@/store/module/user'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'


const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onFinish = async formValue => {

        // 执行登录操作
        await dispatch(fetchLogin(formValue));

        // 登录成功，跳转到首页，并显示登录成功消息
        message.success('Login Success');
        navigate('/');
    }

    return (
        <div className="login">
            <Card className="login-container">
                <Form onFinish={onFinish}>
                    {/* Email input field with validation */}
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email!' },  // Email is required
                            { type: 'email', message: 'Please input a valid email address!' },  // Validate email format
                        ]}
                    >
                        <Input size="large" placeholder="Email" />
                    </Form.Item>

                    {/* Password input field with validation */}
                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: 'Please input your password!' },  // Password is required
                            { min: 6, message: 'Password must be at least 6 characters!' },  // Password minimum length of 6
                        ]}
                    >
                        <Input.Password size="large" placeholder="Password" />
                    </Form.Item>

                    {/* Submit button */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="middle" block>
                            Login
                        </Button>
                    </Form.Item>

                    {/* Register button (additional action) */}
                    <Form.Item>
                        <Link to="/register">
                            <Button type="default" size="middle" block>
                                Register
                            </Button>
                        </Link>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login