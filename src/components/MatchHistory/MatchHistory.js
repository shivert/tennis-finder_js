import React from "react";
import PageLayout from "../containers/PageLayout";
import { Row, Col, Form, Card, Input, Button, Timeline } from "antd";

const FormItem = Form.Item;

export default class MatchHistory extends React.Component {
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
      }
    };
    return (
      <PageLayout pageTitle="Match Scheduler">
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Match Detail">
              Some Details here. It will update as different matches are clicked
              <Form onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label="Date">
                  <Input />
                </FormItem>
                <FormItem {...formItemLayout} label="Score">
                  <Input />
                </FormItem>
                <FormItem {...formItemLayout} label="Location">
                  <Input />
                </FormItem>
              </Form>
            </Card>
          </Col>
          <Col span={16}>
            <Card>
              <Timeline>
                <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                <Timeline.Item>
                  Solve initial network problems 2015-09-01
                </Timeline.Item>
                <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                <Timeline.Item>
                  Network problems being solved 2015-09-01
                  <Button>View/Edit Details</Button>
                </Timeline.Item>
              </Timeline>
            </Card>
          </Col>
        </Row>
      </PageLayout>
    );
  }
}
