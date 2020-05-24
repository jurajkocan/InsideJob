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
import { style, media } from "typestyle";
import { FormattedMessage } from "react-intl";
import { sm } from "src/style/common";

const ThemChangerStyle = {
  switchChild: (checked: boolean) =>
    style({
      $nest: {
        "> span": {
          margin: checked ? "0 6px 0 24px" : "0 6px 0 24px",
        },
      },
    }),

  switchText: style(
    {
      display: "block",
    },
    media(
      { maxWidth: sm },
      {
        display: "none",
      }
    )
  ),
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
      checkedChildren={
        <span className={ThemChangerStyle.switchText}>
          <FormattedMessage id="header.dark_side" />
        </span>
      }
      unCheckedChildren={
        <span className={ThemChangerStyle.switchText}>
          <FormattedMessage id="header.light_side" />{" "}
        </span>
      }
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
