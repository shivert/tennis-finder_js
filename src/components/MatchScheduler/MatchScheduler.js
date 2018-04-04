import React from "react";
import moment from "moment";
import PageLayout from "../containers/PageLayout";

import {
  Row,
  Col,
  Modal,
  Table,
  Card,
  Input,
  Button,
  DatePicker,
  List
} from "antd";
import { AvailabilityCard } from "./AvailabilityCard";
import { ajaxGet } from "../../utils/request";
import EditAvailabilityForm from "./EditAvailabilityForm";
const SearchBar = Input.Search;
const { RangePicker } = DatePicker;

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
    start_time: "2018-04-04T04:40:48.276Z",
    end_time: "2018-04-04T05:40:48.276Z"
  },
  {
    start_time: "2018-03-04T04:40:48.276Z",
    end_time: "2018-03-04T05:40:48.276Z"
  }
];

export default class MatchScheduler extends React.Component {
  state = {
    filteredInfo: {},
    userAvailabilities: [],
    isEditingAvailability: false,
    hasError: false
  };

  onChange = (pagination, filters) => {
    //console.log("Various parameters", pagination, filters, sorter);
    this.setState({
      filteredInfo: filters
    });
  };
  clearFilters = () => {
    this.setState({ filteredInfo: {} });
  };

  componentDidMount() {
    this.getUserAvailability();
  }

  getUserAvailability = () => {
    ajaxGet(
      "https://rails-test-199116.appspot.com/availability",
      responseObject => {
        if (responseObject.ok) {
          const processedArray = responseObject.availability.map(
            availability => {
              return {
                ...availability,
                start_time: moment(availability.start_time),
                end_time: moment(availability.end_time)
              };
            }
          );
          this.setState({
            userAvailabilities: processedArray,
            hasError: false
          });
        } else {
          this.setState({ hasError: true });
        }
      },
      err => {
        console.log(err);
        this.setState({ hasError: true });
      }
    );
  };

  onEdit = () => {
    this.setState({ isEditingAvailability: true });
  };

  onModalCancel = () => {
    this.setState({ isEditingAvailability: false });
  };

  onFormSubmit = formData => {
    console.log(formData);
  };

  render() {
    const { filteredInfo } = this.state;
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
        //filteredValue: filteredInfo.gender || null,
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

    return (
      <PageLayout pageTitle="Match Scheduler">
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Scheduled Matches">here</Card>
          </Col>
          <Col span={16}>
            <AvailabilityCard
              availabilities={this.state.userAvailabilities}
              onEdit={this.onEdit}
            />
            <Card>
              <Row style={{ marginBottom: "20px" }} gutter={16}>
                <Col span={6}>
                  <SearchBar placeholder="Search by name" />
                </Col>
                <Col span={12}>
                  <RangePicker
                    showTime={{ format: "HH:mm" }}
                    format="YYYY-MM-DD HH:mm"
                    placeholder={["Start Time", "End Time"]}
                  />
                </Col>
                <Col span={6}>
                  <Button onClick={this.clearFilters}>Clear filters</Button>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  this should include time and place
                  <Table columns={columns} dataSource={dataSource} />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Modal
          title={<h3>Edit Availability</h3>}
          visible={this.state.isEditingAvailability}
          onOk={this.onModalOk}
          onCancel={this.onModalCancel}
        >
          <EditAvailabilityForm onFormSubmit={this.onFormSubmit} />
        </Modal>
      </PageLayout>
    );
  }
}
