import React, { useState } from "react";
import { connect } from "react-redux";
import { dispatcher } from "../redux/Dispatcher";
import { Dispatch } from "redux";
import { Actions, ActionTypes } from "../redux/ActionTypes";
import { withRouter, RouteComponentProps } from "react-router";
import { getLastParameterFromUrl } from "src/utils/QueryUtils";
import { State, AppTheme } from "../redux/States";
import { Descriptions, Skeleton, Button } from "antd";
import { style } from "typestyle";
import { Link } from "react-router-dom";
import { Roots } from "src/constants/Roots";
import { FormattedMessage } from "react-intl";

const personDetailStyle = {
  description: style({
    $nest: {
      th: {
        backgroundColor: "#1f1f1f !important",
      },
    },
  }),
};

type StateProps = {
  person: State["person"]["detail"];
  fetching: State["person"]["personFetching"];
  theme: AppTheme;
};
type DispatchProps = {
  fetchUser: (id: number) => void;
};

type Props = DispatchProps & StateProps & RouteComponentProps;

const PersonDetail = (props: Props) => {
  const [constructorHasRun, setConstructorHasRun] = useState(false);
  const constructor = () => {
    if (constructorHasRun) return;
    const id = Number(getLastParameterFromUrl(props.location.pathname));
    props.fetchUser(id);
    setConstructorHasRun(true);
  };

  constructor();
  const person = props.person;

  if (props.fetching) {
    return (
      <Skeleton
        active
        title={{
          width: "30%",
        }}
        paragraph={{ rows: 10 }}
      />
    );
  }

  return (
    <div>
      {!person ? (
        <>
          <div>"404 This is not a robot you are looking for"</div>
          <Link to={Roots.PersonList}>
            <Button type="primary">Back to list</Button>
          </Link>
        </>
      ) : (
        <Descriptions
          className={
            props.theme === "dark" ? personDetailStyle.description : ""
          }
          title={<FormattedMessage id="person.title" />}
          bordered
          layout="vertical"
          column={{ xxl: 4, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}
        >
          {(Object.keys(person) as Array<keyof typeof person>).map(
            (key, index) => {
              return Array.isArray(person[key]) ? null : (
                <Descriptions.Item
                  key={`description-item-${index}`}
                  label={key}
                >
                  {person[key]}
                </Descriptions.Item>
              );
            }
          )}
        </Descriptions>
      )}
    </div>
  );
};

const mapStateToProps = (state: State): StateProps => ({
  person: state.person.detail,
  fetching: state.person.personFetching,
  theme: state.app.theme,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => ({
  fetchUser: (id: number) =>
    dispatcher.fetchPerson(dispatch, {
      type: ActionTypes.FETCH_PERSON,
      payload: {
        id,
      },
    }),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PersonDetail)
);
