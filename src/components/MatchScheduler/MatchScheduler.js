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
import { ajaxGet, ajaxPost } from "../../utils/request";
import EditAvailabilityForm from "./EditAvailabilityForm";
import UpcomingMatchesPanel from "../Dashboard/UpcomingMatchesPanel";
const SearchBar = Input.Search;
const { RangePicker } = DatePicker;

export default class MatchScheduler extends React.Component {
  state = {
    filteredInfo: {},
    userAvailabilities: [],
    availableMatches: [],
    isEditingAvailability: false,
    shouldShowRequestConfirmation: false,
    requestedMatch: {},
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
    this.getAvailableMatches();
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

  getAvailableMatches = () => {
    ajaxGet(
      "https://rails-test-199116.appspot.com/similar-availability",
      responseObject => {
        if (responseObject.ok) {
          const flattenedArray = responseObject.matches.reduce(
            (acc, val) => acc.concat(val),
            []
          );
          this.setState({
            availableMatches: flattenedArray,
            hasError: false
          });
          console.log(flattenedArray);
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

  onMatchRequest = record => {
    this.setState({
      requestedMatch: record,
      shouldShowRequestConfirmation: true
    });
  };

  onRequestSubmit = () => {
    ajaxPost(
      "https://rails-test-199116.appspot.com/matches",
      {
        player_2_id: this.state.requestedMatch.user_profile.user_id,
        status: "REQUESTED",
        start_time: this.state.requestedMatch.start_time,
        end_time: this.state.requestedMatch.end_time
      },
      responseObject => {
        if (responseObject.ok) {
          this.onMatchRequestCancel();
        } else {
          this.onMatchRequestCancel();
        }
      },
      err => {
        console.log(err);
      }
    );
  };

  onMatchRequestCancel = () => {
    this.setState({ shouldShowRequestConfirmation: false });
  };

  onFormSubmit = formData => {
    const timeSlotList = formData.names;
    const stringifiedAvailability = timeSlotList.map(slot => {
      return {
        start_time: slot[0].toISOString(),
        end_time: slot[1].toISOString()
      };
    });
    ajaxPost(
      "https://rails-test-199116.appspot.com/availability",
      { availability: stringifiedAvailability },
      responseObject => {
        if (responseObject.ok) {
          this.onModalCancel();
          this.getUserAvailability();
        } else {
        }
      },
      err => {
        console.log(err);
      }
    );
  };

  render() {
    const { filteredInfo } = this.state;
    const columns = [
      {
        title: "Name",
        render: (text, record) => {
          console.log(record);
          if (record.user_profile) {
            return `${record.user_profile.first_name} ${
              record.user_profile.last_name
            }`;
          }
          return "";
        }
      },
      {
        title: "Age",
        dataIndex: "user.age",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.age - b.age
      },
      {
        title: "Skill",
        dataIndex: "user.skill",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.skill - b.skill
      },
      {
        title: "Start Time",
        render: (text, record) => {
          return (
            <div>
              <div>{`${moment(record.start_time).format(
                "dddd, MMMM Do YYYY, h:mm a"
              )}`}</div>
              <div>{`To ${moment(record.end_time).format(
                "dddd, MMMM Do YYYY, h:mm a"
              )}`}</div>
            </div>
          );
        }
      },
      {
        title: "Request Match",
        key: "request",
        render: (text, record) => (
          <span>
            <Button
              onClick={() => {
                this.onMatchRequest(record);
              }}
            >
              Request Match
            </Button>
          </span>
        )
      }
    ];

    return (
      <PageLayout pageTitle="Match Scheduler">
        <Row gutter={16}>
          <Col span={8}>
            <UpcomingMatchesPanel />
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
                  <Table
                    columns={columns}
                    dataSource={this.state.availableMatches}
                  />
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
        <Modal
          title={<h3>Comfirmation</h3>}
          visible={this.state.shouldShowRequestConfirmation}
          onOk={this.onRequestSubmit}
          onCancel={this.onMatchRequestCancel}
        >
          Are you sure you want to request this match?
        </Modal>
      </PageLayout>
    );
  }
}
