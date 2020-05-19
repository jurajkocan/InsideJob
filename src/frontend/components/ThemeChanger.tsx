import React from "react";
import { connect } from "react-redux";
import { Switch } from "antd";
import { State, AppTheme } from "../redux/States";
import { Dispatch } from "redux";
import { Actions, ActionTypes } from "../redux/ActionTypes";
// @ts-ignore
import dark from "antd/dist/dark-theme";
// @ts-ignore
import light from "antd/dist/default-theme";
import { style } from "typestyle";

const ThemChangerStyle = {
  switchChild: (checked: boolean) =>
    style({
      $nest: {
        span: {
          margin: checked ? "0 6px 0 24px" : "0 6px 0 24px",
        },
      },
    }),
};

type StateProps = {
  theme: AppTheme;
};

type DispatchProps = {
  changeTheme: (theme: AppTheme) => void;
};

const ThemeChanger = (props: StateProps & DispatchProps) => {
  const onLight = async () => {
    // @ts-ignore
    await window.less.modifyVars({
      ...light,
    });
    props.changeTheme("light");
  };
  const onDark = async () => {
    // @ts-ignore
    await window.less.modifyVars(dark);
    props.changeTheme("dark");
  };

  return (
    <Switch
      className={ThemChangerStyle.switchChild(props.theme === "dark")}
      checked={props.theme === "dark"}
      onChange={(val) => (val ? onDark() : onLight())}
      checkedChildren="dark side"
      unCheckedChildren="light side"
    />
  );
};

const mapStatToProps = (state: State): StateProps => ({
  theme: state.app.theme,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => ({
  changeTheme: (theme: AppTheme) =>
    dispatch({ type: ActionTypes.CHANGE_THEME, payload: theme }),
});

export default connect(mapStatToProps, mapDispatchToProps)(ThemeChanger);
