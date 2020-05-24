import React from "react";
import ReactPlayer from "react-player";
import { FormattedMessage } from "react-intl";
export default () => {
  return (
    <>
      <h1>
        <FormattedMessage id="home.title" />
      </h1>
      <div>
        <ReactPlayer
          width="100%"
          url="https://www.youtube.com/watch?v=cEPazLTGceI&t=10s"
        />
      </div>
    </>
  );
};
