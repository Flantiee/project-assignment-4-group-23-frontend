import './index.scss'
import { Card, Form, Input, Button } from 'antd'
import { message } from 'antd'
import useStore from '@/store'
import { fetchLogin } from '@/store/module/user'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinish = async formValue => {
        await dispatch(fetchLogin(formValue))
        navigate('/')
        message.success('Login Success')
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
                        <Button type="default" size="middle" block>
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login