import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps, Link, Route } from "react-router-dom";
import { Layout, Menu } from "antd";
import logo from "assets/images/logo.png";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { style, media } from "typestyle";
import { Roots } from "src/constants/Roots";
import { sm } from "src/style/common";
import { connect } from "react-redux";
import { State } from "./redux/States";
import { Languages, englishLanguage, wookieeLanguage } from "src/types/Common";
import { Dispatch } from "redux";
import { Actions, ActionTypes } from "./redux/ActionTypes";

const masterPageStyle = {
  slider: style({
    height: "100vh",
    position: "fixed",
  }),

  header: (collapsed: boolean) =>
    style({
      transition: "all 0.2s",
      padding: 0,
      position: "fixed",
      width: `calc(100% - ${collapsed ? "80px" : "200px"})`,
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

  language: style({
    float: "right",
    cursor: "pointer",
    paddingRight: 24,
  }),

  contentLayout: (collapsed: boolean) =>
    style({
      marginLeft: collapsed ? 80 : 200,
      minHeight: "calc(100vh - 128px)",
    }),
};

type StateProps = {
  isMobile: boolean;
  language: Languages;
};
type DispatchProps = {
  changeLanguage: (language: Languages) => void;
};

type Props = StateProps & DispatchProps & RouteComponentProps;
const { Header, Sider, Content } = Layout;
const MasterPageComponent: React.FC<Props> = (props) => {
  const [collapsed, setCollapsed] = useState(props.isMobile);

  if (props.isMobile) {
    useEffect(() => {
      setCollapsed(true);
    }, [props.location.pathname]);
  }

  let selectedMenuKey: string[] = [];
  switch (props.location.pathname) {
    case Roots.Home:
      selectedMenuKey = ["1"];
      break;
    case Roots.PersonList:
      selectedMenuKey = ["2"];
      break;
    case Roots.Home:
    default:
      break;
  }
  return (
    <Layout>
      <Sider
        className={masterPageStyle.slider}
        collapsible
        trigger={null}
        collapsed={collapsed}
      >
        <Link to={Roots.Home} onClick={() => {}}>
          <img className={masterPageStyle.logo} src={logo} />
        </Link>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedMenuKey}
          defaultSelectedKeys={selectedMenuKey}
        >
          <Menu.Item
            onClick={() => props.history.push(Roots.Home)}
            key="1"
            icon={<SendOutlined translate="" />}
          >
            Home
          </Menu.Item>
          <Menu.Item
            onClick={() => props.history.push(Roots.PersonList)}
            key="2"
            icon={<UserOutlined translate="" />}
          >
            people
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout
        style={{ transition: "margin 0.2s ease" }}
        className={masterPageStyle.contentLayout(collapsed)}
      >
        <Header className={masterPageStyle.header(collapsed)}>
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
          <a
            onClick={() => {
              props.changeLanguage(
                props.language === englishLanguage
                  ? wookieeLanguage
                  : englishLanguage
              );
            }}
            className={masterPageStyle.language}
          >
            {props.language === englishLanguage ? "ughurrag" : "english"}
          </a>
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

const mapStateToProps = (state: State): StateProps => ({
  isMobile: state.app.isMobile,
  language: state.app.language,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => ({
  changeLanguage: (language: Languages) => {
    dispatch({ type: ActionTypes.CHANGE_LANGUAGE, payload: language });
  },
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MasterPageComponent)
);
