import React from "react";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  CommentOutlined,
  BookOutlined,
  DashboardOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import { outAdmin } from "../redux/slices/adminSlice";

const { Header, Content, Sider } = Layout;

const AdminDashboardMain: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(outAdmin());
    navigate("/");
  }
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        theme="dark"
        width={250}
        className="admin-dashboard-sider"
      >
        <div className="logo" style={{ padding: "16px", color: "#fff" }}>
          <Link to="/" className="text-xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">
              MRBS
            </span>
          </Link>
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]} defaultSelectedKeys={["admin"]}>
          <Menu.Item key="/admin" icon={<DashboardOutlined />}>
            <Link to="/admin">Обзор</Link>
          </Menu.Item>
          <Menu.Item key="/admin/room-management" icon={<HomeOutlined />}>
            <Link to="/admin/room-management">Заллы</Link>
          </Menu.Item>
          <Menu.Item key="/admin/booking-management" icon={<BookOutlined />}>
            <Link to="/admin/booking-management">Бронирования</Link>
          </Menu.Item>
          <Menu.Item key="/admin/slot-management" icon={<CommentOutlined />}>
            <Link to="/admin/slot-management">Отзывы</Link>
          </Menu.Item>
          <Menu.Item onClick={() => handleLogout()} key="/admin/logout" icon={<LogoutOutlined />}>
            <p className="logout-button">Выйти</p>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <h1 style={{ textAlign: "center", margin: "16px 0" }}>
            Admin Dashboard
          </h1>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboardMain;
