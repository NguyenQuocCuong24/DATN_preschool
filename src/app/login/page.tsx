"use client";
import http from "@/src/request/httpConfig";
import { Button, Card, Checkbox, Form, Input, Typography } from "antd";
import React from "react";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
const { Title } = Typography;

const Login: React.FC = () => {
    const router = useRouter()
  const onFinish = async (values: { username: string; password: string }) => {
    await http.post("/auth", values)
      .then((response) => {
        if(response.status == 200){
            const payload = response.payload as { token: string };
            const token = payload.token;
            localStorage.setItem("token", token);
            document.cookie = `token=${token}; path=/; secure; SameSite=Lax`;
            router.push("/");
        } 
      })
      .catch(info => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f0f2f5",
        padding: "24px",
      }}
    >
    <ToastContainer />
      <Card >
        <Title level={3} style={{ textAlign: "center" }}>
          Đăng nhập
        </Title>
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
            >
            <Input />
            </Form.Item>

            <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            >
            <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" label={null}>
            <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
            </Form.Item>
            </Form>
      </Card>
    </div>
  );
};

export default Login;
