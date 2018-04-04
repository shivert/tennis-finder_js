import React from "react";
import PageLayout from "../containers/PageLayout";

import { Row, Col, Table, Card, Input, Button, Alert, Modal } from "antd";
import { ajaxGet } from "../../utils/request";
const SearchBar = Input.Search;
const { TextArea } = Input;

export default class PlayerFinder extends React.Component {
  state = {
    hasError: false,
    playerList: [],
    filteredInfo: {},
    selectedPlayer: { first_name: "" },
    isModalVisible: false
  };

  onTableChange = (pagination, filters) => {
    //console.log("Various parameters", pagination, filters, sorter);
    this.setState({
      filteredInfo: filters
    });
  };
  clearFilters = () => {
    this.setState({ filteredInfo: {} });
  };

  onPlayerSelect = selectedPlayer => {
    this.setState({ selectedPlayer }, () => {
      this.setState({ isModalVisible: true });
    });
  };

  onModalCancel = () => {
    this.setState({ isModalVisible: false });
  };
  onModalOk = () => {
    this.setState({ isModalVisible: false });
  };

  componentDidMount() {
    ajaxGet(
      "https://rails-test-199116.appspot.com/players",
      responseObject => {
        if (responseObject.ok) {
          const processedArray = responseObject.players.map(item => {
            return { ...item, key: item.id };
          });
          this.setState({
            playerList: processedArray,
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
  }

  render() {
    const { filteredInfo } = this.state;
    const columns = [
      {
        title: "First Name",
        dataIndex: "first_name"
      },
      {
        title: "Last Name",
        dataIndex: "last_name"
      },
      {
        title: "Age",
        dataIndex: "age",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.age - b.age
      },
      {
        title: "Gender",
        dataIndex: "gender",
        filters: [
          {
            text: "Male",
            value: "male"
          },
          {
            text: "Female",
            value: "female"
          },
          {
            text: "Others",
            value: "others"
          }
        ],
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value, record) => record.gender === value,
        filteredValue: filteredInfo.gender || null
      },
      {
        title: "Skill Level (USTA)",
        dataIndex: "skill",
        filters: [
          {
            text: "1.0",
            value: "1"
          },
          {
            text: "1.5",
            value: "1.5"
          },
          {
            text: "2.0",
            value: "2"
          },
          {
            text: "2.5",
            value: "2.5"
          },
          {
            text: "3.0",
            value: "3"
          },
          {
            text: "3.5",
            value: "3.5"
          },
          {
            text: "4.0",
            value: "4"
          },
          {
            text: "4.5",
            value: "4.5"
          },
          {
            text: "5.0",
            value: "5"
          },
          {
            text: "5.0+",
            value: "6"
          }
        ],
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value, record) => record.skill === value,
        filteredValue: filteredInfo.skill || null,
        sorter: (a, b) => Number(a.skill) - Number(b.skill)
      },
      {
        title: "Message",
        key: "message",
        render: (text, record) => (
          <span>
            <Button
              onClick={() => {
                this.onPlayerSelect(record);
              }}
            >
              Message
            </Button>
          </span>
        )
      }
    ];
    return (
      <PageLayout pageTitle="Player Finder">
        <Card>
          {this.state.hasError && (
            <Alert message="Failed to fetch players" type="error" />
          )}
          <Row style={{ marginBottom: "20px" }} gutter={16}>
            <Col span={4}>
              <SearchBar placeholder="Search by name" />
            </Col>
            <Col span={3}>
              <Button onClick={this.clearFilters}>Clear filters</Button>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Table
                columns={columns}
                dataSource={this.state.playerList}
                onChange={this.onTableChange}
              />
            </Col>
          </Row>
        </Card>
        <Modal
          title={<h3>Message {this.state.selectedPlayer.first_name}</h3>}
          visible={this.state.isModalVisible}
          onOk={this.onModalOk}
          onCancel={this.onModalCancel}
        >
          <h4>Write your message here:</h4>
          <TextArea rows={4} />
        </Modal>
      </PageLayout>
    );
  }
}
