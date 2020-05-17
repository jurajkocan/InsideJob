import React from "react";
import ReactPlayer from "react-player";
// @ts-ignore
import dark from "antd/dist/dark-theme";
// @ts-ignore
import light from "antd/dist/compact-theme";
export default () => {
  const onLight = async () => {
    // @ts-ignore
    await window.less.modifyVars(light);
  };
  const onDark = async () => {
    // @ts-ignore
    await window.less.modifyVars(dark);
  };
  return (
    <>
      <div>Was the destruction of dead star an inside job?</div>
      <button key="3" onClick={onLight}>
        light
      </button>

      <button key="2" onClick={onDark}>
        dark
      </button>

      <div>
        <ReactPlayer
          width="100%"
          url="https://www.youtube.com/watch?v=cEPazLTGceI&t=10s"
        />
      </div>
    </>
  );
};
