import React, { useState } from "react";
import { withRouter, RouteComponentProps, Link, Route } from "react-router-dom";
import { Layout, Menu } from "antd";
import logo from "assets/images/logo.png";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  SendOutlined,
} from "@ant-design/icons";

import { style, media } from "typestyle";
import { Roots } from "src/constants/Roots";
import { sm } from "src/style/common";
const masterPageStyle = {
  slider: style({
    height: "100vh",
    position: "fixed",
  }),

  header: style({
    padding: 0,
    position: "fixed",
    width: "100%",
    zIndex: 1,
  }),

  headerTitle: style(
    media(
      { maxWidth: sm },
      {
        display: "none",
      }
    )
  ),

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
    margin: "16px",
    maxWidth: "calc(80px - 32px)",
  }),

  contentLayout: (collapsed: boolean) =>
    style({
      marginLeft: collapsed ? 80 : 200,
      minHeight: "calc(100vh - 128px)",
    }),
};

const { Header, Sider, Content } = Layout;
const MasterPageComponent: React.FC<RouteComponentProps<any>> = (props) => {
  const [collapsed, setCollapsed] = useState(
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  );
  let selectedMenuKey: string[] = [];
  switch (props.location.pathname) {
    case Roots.PersonList:
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
    <Layout>
      <Sider
        className={masterPageStyle.slider}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <Link to={Roots.Home}>
          <img className={masterPageStyle.logo} src={logo} />
        </Link>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedMenuKey}
          defaultSelectedKeys={selectedMenuKey}
        >
          <Menu.Item
            onClick={() => props.history.push(Roots.PersonList)}
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
      <Layout
        style={{ transition: "margin 0.2s ease" }}
        className={masterPageStyle.contentLayout(collapsed)}
      >
        <Header className={masterPageStyle.header}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              translate: "",
              className: masterPageStyle.trigger,
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <span className={masterPageStyle.headerTitle}>
            {" "}
            Did you ever hear the tragedy of Darth Plagueis The Wise
          </span>
        </Header>
        <Content
          style={{
            margin: "56px 16px 24px 16px",
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
