import React from "react";
import { Input } from "antd";
import { parse as parseQuery } from "query-string";
import { withRouter, RouteComponentProps } from "react-router";
import { updateQuery } from "src/utils/QueryUtils";

type Props = RouteComponentProps;

const Search = (props: Props) => {
  const parsed = parseQuery(props.location.search);
  const value = parsed["search"];
  return (
    <Input.Search
      size="large"
      placeholder="input search text"
      defaultValue={value ?? undefined}
      onSearch={(value) =>
        props.history.push({
          search: updateQuery(
            props.location.search,
            "search",
            value || undefined
          ),
        })
      }
      enterButton
    />
  );
};

export default withRouter(Search);
