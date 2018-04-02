import React from "react";
import PageLayout from "../containers/PageLayout";

import { Row, Col, Layout, Table, Card, Input, Button } from "antd";
const SearchBar = Input.Search;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    filters: [
      {
        text: "Joe",
        value: "Joe"
      },
      {
        text: "Jim",
        value: "Jim"
      },
      {
        text: "Submenu",
        value: "Submenu",
        children: [
          {
            text: "Green",
            value: "Green"
          },
          {
            text: "Black",
            value: "Black"
          }
        ]
      }
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length
  },
  {
    title: "Age",
    dataIndex: "age",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.age - b.age
  },
  {
    title: "Address",
    dataIndex: "address",
    filters: [
      {
        text: "London",
        value: "London"
      },
      {
        text: "New York",
        value: "New York"
      }
    ],
    filterMultiple: false,
    onFilter: (value, record) => record.address.indexOf(value) === 0,
    sorter: (a, b) => a.address.length - b.address.length
  }
];

const dataSource = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park"
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park"
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park"
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park"
  }
];

export default class PlayerFinder extends React.Component {
  render() {
    return (
      <PageLayout pageTitle="Player Finder">
        <Card>
          <Row style={{ marginBottom: "20px" }} gutter={16}>
            <Col span={4}>
              <SearchBar placeholder="Search by name" />
            </Col>
            <Col span={3}>
              <Button onClick={this.clearFilters}>Clear filters</Button>
            </Col>
            <Col span={4}>
              <Button onClick={this.clearAll}>Clear filters and sorters</Button>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Table
                columns={columns}
                dataSource={dataSource}
                expandedRowRender={record => (
                  <p style={{ margin: 0 }}>{"this is expanded"}</p>
                )}
              />
            </Col>
          </Row>
        </Card>
      </PageLayout>
    );
  }
}
