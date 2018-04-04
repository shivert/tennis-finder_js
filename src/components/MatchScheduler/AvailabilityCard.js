import React from "react";
import PageLayout from "../containers/PageLayout";

import {
  Row,
  Col,
  Layout,
  Table,
  Card,
  Input,
  Button,
  DatePicker,
  Alert,
  List
} from "antd";

export const AvailabilityCard = props => {
  const emptyAvailabilityMessage = (
    <Alert
      message="You have not indicated your availabilities yet"
      type="success"
    />
  );
  const shouldDisplayEmptyMessage =
    props.availabilities == null || props.availabilities.length === 0;
  return (
    <Card style={{ marginBottom: "20px" }} title="Your Availability">
      {(shouldDisplayEmptyMessage && emptyAvailabilityMessage) || (
        <List
          itemLayout="horizontal"
          dataSource={props.availabilities}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={`${item.start_time.format(
                  "dddd, MMMM Do YYYY, h:mm a"
                )} To ${item.end_time.format("dddd, MMMM Do YYYY, h:mm a")}`}
              />
            </List.Item>
          )}
        />
      )}
      <div style={{ marginTop: "20px" }}>
        <Button onClick={props.onEdit}>Edit Availability</Button>
      </div>
    </Card>
  );
};
