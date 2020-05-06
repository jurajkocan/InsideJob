import React, { useState } from "react";
import { withRouter, RouteComponentProps, Link, Route } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  SendOutlined,
} from "@ant-design/icons";

import { style } from "typestyle";
import { Roots } from "src/constants/Roots";
const masterPageStyle = {
  trigger: style({
    fontSize: 18,
    lineHeight: "64px",
    padding: "0 24px",
    cursor: "pointer",
    transition: "color 0.3s",
    $nest: {
      "&:hover": {
        color: "#ffffff",
      },
    },
  }),

  logo: style({
    height: 32,
    background: "rgba(255, 255, 255, 0.2)",
    margin: "16px",
  }),
};

const { Header, Sider, Content } = Layout;
const MasterPageComponent: React.FC<RouteComponentProps<any>> = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  let selectedMenuKey: string[] = [];
  switch (props.location.pathname) {
    case Roots.UserList:
      selectedMenuKey = ["1"];
      break;
    case Roots.FilmList:
      selectedMenuKey = ["2"];
      break;
    case Roots.StarshipList:
      selectedMenuKey = ["3"];
      break;
    default:
      break;
  }
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Link to={Roots.Home}>
          <div className={masterPageStyle.logo} />
        </Link>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedMenuKey}
          defaultSelectedKeys={[]}
        >
          <Menu.Item
            onClick={() => props.history.push(Roots.UserList)}
            key="1"
            icon={<UserOutlined translate="" />}
          >
            people
          </Menu.Item>
          <Menu.Item
            onClick={() => props.history.push(Roots.FilmList)}
            key="2"
            icon={<VideoCameraOutlined translate="" />}
          >
            Films
          </Menu.Item>
          <Menu.Item
            onClick={() => props.history.push(Roots.StarshipList)}
            key="3"
            icon={<SendOutlined translate="" />}
          >
            Starships
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              translate: "",
              className: masterPageStyle.trigger,
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <span> Did you ever hear the tragedy of Darth Plagueis The Wise</span>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export const MasterPage = withRouter(MasterPageComponent);
