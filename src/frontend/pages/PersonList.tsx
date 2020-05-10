import React, { useState, useEffect } from "react";
import { List, Avatar, Divider, Button } from "antd";
import { connect } from "react-redux";
import { State } from "../redux/States";
import { Dispatch } from "redux";
import { Actions, ActionTypes } from "../redux/ActionTypes";
import { dispatcher } from "../redux/Dispatcher";
import avatar from "assets/images/rebel-imperium-logo.png";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { Roots } from "src/constants/Roots";
import { style } from "typestyle";
import Filters from "../components/Filters";
import Search from "../components/Search";
import { updateQuery, getLastParameterFromUrl } from "src/utils/QueryUtils";
import { FilterOutlined } from "@ant-design/icons";
import { responsiveGroupBtn } from "src/style/common";
import { parse as parseQuery } from "query-string";

const userListStyle = {
  pagination: style({
    textAlign: "left",
  }),
};

type StateProps = {
  listFetching: boolean;
  userList: State["person"]["list"];
  isMobile: boolean;
};

type DispatchProps = {
  fetchPeople: (page: string) => void;
};

type Props = StateProps & DispatchProps & RouteComponentProps;
let currentPage = 1;
const PersonList = (props: Props) => {
  const [filterVisible, setFilterVisibility] = useState(false);

  useEffect(() => {
    props.fetchPeople(props.location.search);
    const parsed = parseQuery(props.location.search);
    currentPage = Number(parsed["page"]);
  }, [props.location.search]);
  const data = props.userList ? props.userList.results : [];
  return (
    <>
      {!props.listFetching && !props.userList ? null : (
        <Button
          className={responsiveGroupBtn(false)}
          icon={<FilterOutlined translate="" />}
          size="large"
          onClick={() => setFilterVisibility(true)}
        >
          Filters
        </Button>
      )}
      <Button
        className={responsiveGroupBtn(true)}
        danger
        type="primary"
        size="large"
        onClick={() => {
          props.history.push(props.location.pathname);
        }}
      >
        Remove all filters
      </Button>
      <Divider />
      <Search />
      <Divider />
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 2,
          xxl: 2,
        }}
        pagination={{
          className: userListStyle.pagination,
          current: currentPage || 1,
          size: props.isMobile ? "small" : "default",
          showSizeChanger: false,
          defaultCurrent: currentPage || 1,
          total: props.userList?.count,
          onChange: (page) => {
            props.history.push({
              search: updateQuery(
                props.location.search,
                "page",
                page || undefined
              ),
            });
          },
        }}
        loading={props.listFetching}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar size={50} src={avatar} />}
              title={
                <Link
                  to={`${Roots.PersonDetail}/${getLastParameterFromUrl(
                    item.url
                  )}`}
                >
                  {item.name}
                </Link>
              }
              description={`gender: ${item.gender}, eye color: ${item.eye_color}`}
            />
          </List.Item>
        )}
      />
      <Divider />
      {props.userList ? (
        <Filters
          filters={props.userList.filters}
          isVisible={filterVisible}
          onClose={() => setFilterVisibility(false)}
        />
      ) : null}
    </>
  );
};

const mapStateToProps = (state: State): StateProps => {
  return {
    userList: state.person.list,
    listFetching: state.person.peopleListFetching,
    isMobile: state.app.isMobile,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => ({
  fetchPeople: (filter?: string) =>
    dispatcher.fetchPeople(dispatch, {
      type: ActionTypes.FETCH_PEOPLE,
      payload: {
        filter,
      },
    }),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PersonList)
);
