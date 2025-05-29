"use client";
import http from "@/src/request/httpConfig";
import { Button, Card, Form, Input, Typography } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Title } = Typography;

const Login: React.FC = () => {
  const router = useRouter();

  const onFinish = async (values: { username: string; password: string }) => {
    await http
      .post("/auth", values)
      .then((response) => {
        if (response.status === 200) {
          const payload = response.payload as { token: string };
          const token = payload.token;
          localStorage.setItem("token", token);
          document.cookie = `token=${token}; path=/; secure; SameSite=Lax`;
          localStorage.setItem("username", values.username);
          router.push("/home");
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <div
      className="w-screen h-screen bg-cover bg-center bg-no-repeat"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('/login.png')"
      }}
    >
      <ToastContainer />
      <Card
        style={{
          width: 400,
          borderRadius: 16,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          padding: "24px",
          backgroundColor: "#fff",
        }}
      >
        <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
          Đăng nhập hệ thống<br />quản lý mầm non
        </Title>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: true, username: typeof window !== "undefined" ? localStorage.getItem("username") || "" : "" }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[
              { required: true, message: "Vui lòng nhập tên đăng nhập!" },
            ]}
          >
            <Input placeholder="Nhập tên đăng nhập" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%", borderRadius: 8 }}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
