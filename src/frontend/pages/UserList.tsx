import React, { useState } from "react";
import { List, Pagination, Avatar, Divider } from "antd";
import { connect } from "react-redux";
import { State } from "../redux/States";
import { Dispatch } from "redux";
import { Actions, ActionTypes } from "../redux/ActionTypes";
import { dispatcher } from "../redux/Dispatcher";
import avatar from "assets/images/rebel-imperium-logo.png";
import { Link } from "react-router-dom";
import { Roots } from "src/constants/Roots";
import { getLastParameterFromUrl } from "src/utils/StringUtils";

type StateProps = {
  listFetching: boolean;
  userList: State["user"]["list"];
};

type DispatchProps = {
  fetchPeople: (page: string) => void;
};

type Props = StateProps & DispatchProps;
const userList = (props: Props) => {
  const [constructorHasRun, setConstructorHasRun] = useState(false);
  const constructor = () => {
    if (constructorHasRun) return;
    props.fetchPeople("1"); // TODO: get page from url
    setConstructorHasRun(true);
  };

  constructor();
  const data = props.userList ? props.userList.results : [];
  return (
    <>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 2,
          xl: 2,
          xxl: 2,
        }}
        loading={props.listFetching}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar size={50} src={avatar} />}
              title={
                <Link
                  to={`${Roots.UserDetail}/${getLastParameterFromUrl(
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
      <Pagination
        showSizeChanger={false}
        defaultCurrent={1}
        total={props.userList?.count}
        onChange={(page) => {
          props.fetchPeople(page.toString());
        }}
      />
    </>
  );
};

const mapStateToProps = (state: State): StateProps => {
  return {
    userList: state.user.list,
    listFetching: state.user.peopleListFetching,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => ({
  fetchPeople: (page: string) =>
    dispatcher.fetchPeople(dispatch, {
      type: ActionTypes.FETCH_PEOPLE,
      payload: {
        filter: {
          page,
        },
      },
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(userList);
