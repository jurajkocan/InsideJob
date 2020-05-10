import React from "react";
import { Drawer, Radio, Checkbox, Row, Col, Divider } from "antd";
import { Filters } from "src/api/types/Filters";
import { withRouter, RouteComponentProps } from "react-router";
import { parse as parseQuery } from "query-string";
import { updateQuery, removeFromQuery } from "src/utils/QueryUtils";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  filters: Filters;
};

const Filters = (props: Props & RouteComponentProps) => {
  const searchDefaultValue = (filter: Filters[number]): any => {
    const parsed = parseQuery(props.location.search);
    const value = parsed[filter.name];
    console.log(filter.name, " value: ", value);
    if (value) {
      return value;
    }
    return [];
  };

  const initialValue: [Filters[number][], Filters[number][]] = [[], []];
  const [checkBoxFilters, radioFilters] = props.filters.reduce(
    (acc, filter) => {
      const [checkBoXFilters, radioFilters] = acc;
      if (filter.type === "checkbox") {
        checkBoXFilters.push(filter);
      } else if (filter.type === "radio") {
        radioFilters.push(filter);
      }
      return acc;
    },
    initialValue
  );
  return (
    <Drawer
      title="Filters"
      placement="right"
      closable={false}
      onClose={props.onClose}
      visible={props.isVisible}
    >
      {radioFilters.map((radioFilter, index) => {
        return (
          <div key={`radioGroup-${radioFilter.name}-${index}`}>
            <h5>{radioFilter.translate}</h5>
            <Radio.Group
              onChange={(e) => {
                props.history.push({
                  search: updateQuery(
                    removeFromQuery(props.location.search, "page"),
                    radioFilter.name,
                    e.target.value
                  ),
                });
              }}
              defaultValue={searchDefaultValue(radioFilter)}
              size="large"
            >
              {radioFilter.value.map((value, index) => (
                <Radio key={`radioValue-${index}`} value={value}>
                  {value}
                </Radio>
              ))}
            </Radio.Group>
            <Divider />
          </div>
        );
      })}
      {checkBoxFilters.map((checkBoxFilter, index) => (
        <div key={`checkBoxGroup-${checkBoxFilter.name}-${index}`}>
          <h5>{checkBoxFilter.translate}</h5>
          <Checkbox.Group
            onChange={(checkedValue) => {
              props.history.push({
                search: updateQuery(
                  removeFromQuery(props.location.search, "page"),
                  checkBoxFilter.name,
                  checkedValue
                ),
              });
            }}
            defaultValue={Array.from(searchDefaultValue(checkBoxFilter))}
          >
            <Row>
              {checkBoxFilter.value.map((value, index) => (
                <Col key={`checkBoxValue-${index}`} span={12}>
                  <Checkbox value={value}>{value}</Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
          <Divider />
        </div>
      ))}
    </Drawer>
  );
};

export default withRouter(Filters);
