import React, { useState, useEffect } from "react";
import { List, Avatar, Divider, Button, Select } from "antd";
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
import { FormattedMessage, useIntl } from "react-intl";
// import { FormattedMessage } from "react-intl";

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
  const intl = useIntl();
  const [filterVisible, setFilterVisibility] = useState(false);
  const [removeFilterBtnVisible, setRemoveBtnVisibility] = useState(
    !!props.location.search
  );

  useEffect(() => {
    props.fetchPeople(props.location.search);
    const parsed = parseQuery(props.location.search);
    currentPage = Number(parsed["page"]);
    if (!!props.location.search !== removeFilterBtnVisible) {
      setRemoveBtnVisibility(!removeFilterBtnVisible);
    }
  }, [props.location.search]);
  const data = props.userList ? props.userList.results : [];
  return (
    <>
      <Search />
      <Divider />
      <div>
        {!props.listFetching && !props.userList ? null : (
          <>
            <Select
              placeholder={intl.formatMessage({
                id: "people.sort_placeholder",
              })}
              className={responsiveGroupBtn(false)}
              size="large"
              onChange={(value) => {
                props.history.push({
                  search: updateQuery(props.location.search, "sort", value),
                });
              }}
            >
              {props.userList?.filters
                .find((filter) => filter.name === "sort")
                ?.value.map((value, index) => (
                  <Select.Option key={`sort-option-${index}`} value={value}>
                    {value}
                  </Select.Option>
                ))}
            </Select>
            <Button
              className={responsiveGroupBtn(
                removeFilterBtnVisible ? false : true
              )}
              icon={<FilterOutlined translate="" />}
              size="large"
              onClick={() => setFilterVisibility(true)}
            >
              <FormattedMessage id="people.filters" />
            </Button>
          </>
        )}
        {removeFilterBtnVisible ? (
          <Button
            className={responsiveGroupBtn(true)}
            danger
            type="primary"
            size="large"
            onClick={() => {
              window.location.href = props.location.pathname;
            }}
          >
            <FormattedMessage id="people.remove_filters" />
          </Button>
        ) : null}
      </div>
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
