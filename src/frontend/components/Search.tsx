import React from "react";
import { Input } from "antd";
import { parse as parseQuery } from "query-string";
import { withRouter, RouteComponentProps } from "react-router";
import { updateQuery, removeFromQuery } from "src/utils/QueryUtils";

type Props = RouteComponentProps;

const Search = (props: Props) => {
  const parsed = parseQuery(props.location.search);
  const value = parsed["search"];
  return (
    <Input.Search
      size="large"
      placeholder="Search name"
      defaultValue={value ?? undefined}
      onSearch={(value) =>
        props.history.push({
          search: removeFromQuery(
            updateQuery(props.location.search, "search", value || undefined),
            "page"
          ),
        })
      }
      enterButton
    />
  );
};

export default withRouter(Search);
