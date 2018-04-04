import React from "react";
import { Card, List, Modal, Button } from "antd";
import { ajaxGet, ajaxPut } from "../../utils/request";
import moment from "moment";

export default class UpcomingMatchesPanel extends React.PureComponent {
  state = {
    hasError: false,
    selectedMatch: {},
    upcomingMatches: [],
    pendingMatches: [],
    shouldShowRejectionConfirmation: false,
    shouldShowApprovalConfirmation: false
  };
  componentDidMount() {
    this.getUpcomingMatches();
  }
  getUpcomingMatches = () => {
    ajaxGet(
      "https://rails-test-199116.appspot.com/matches",
      responseObject => {
        if (responseObject.ok) {
          console.log(responseObject);
          this.setState({
            upcomingMatches: responseObject.matches,
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
    ajaxGet(
      "https://rails-test-199116.appspot.com/matches-pending",
      responseObject => {
        if (responseObject.ok) {
          this.setState({
            pendingMatches: responseObject.matches.filter(item => {
              return item.status === "REQUESTED";
            }),
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

  approveRequest = match => {
    ajaxPut(
      `https://rails-test-199116.appspot.com/matches/${match.id}`,
      { ...match, status: "CONFIRMED" },
      () => {
        this.getUpcomingMatches();
        this.onActionCancel();
      },
      err => {
        console.log(err);
        this.setState({ hasError: true });
      }
    );
  };
  rejectRequest = match => {
    ajaxPut(
      `https://rails-test-199116.appspot.com/matches/${match.id}`,
      { ...match, status: "CANCELLED" },
      () => {
        this.getUpcomingMatches();
        this.onActionCancel();
      },
      err => {
        console.log(err);
        this.setState({ hasError: true });
      }
    );
  };
  onActionCancel = () => {
    this.setState({
      shouldShowRejectionConfirmation: false,
      shouldShowApprovalConfirmation: false
    });
  };
  render() {
    return (
      <Card title="Upcoming Match">
        <List
          itemLayout="horizontal"
          dataSource={this.state.upcomingMatches}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={
                  <div>{`${moment(item.start_time).format(
                    "dddd, MMMM Do YYYY, h:mm a"
                  )} To ${moment(item.end_time).format(
                    "dddd, MMMM Do YYYY, h:mm a"
                  )}`}</div>
                }
                description={
                  this.state.pendingMatches.some(pendingItem => {
                    return pendingItem.id === item.id;
                  }) && (
                    <div>
                      <Button
                        onClick={() => {
                          this.setState({
                            selectedMatch: item,
                            shouldShowApprovalConfirmation: true
                          });
                        }}
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() => {
                          this.setState({
                            selectedMatch: item,
                            shouldShowRejectionConfirmation: true
                          });
                        }}
                      >
                        Reject
                      </Button>
                    </div>
                  )
                }
              />
            </List.Item>
          )}
        />
        <Modal
          title={<h3>Comfirmation</h3>}
          visible={this.state.shouldShowApprovalConfirmation}
          onOk={() => {
            this.approveRequest(this.state.selectedMatch);
          }}
          onCancel={this.onActionCancel}
        >
          Are you sure you want to approve this match?
        </Modal>
        <Modal
          title={<h3>Comfirmation</h3>}
          visible={this.state.shouldShowRejectionConfirmation}
          onOk={() => {
            this.rejectRequest(this.state.selectedMatch);
          }}
          onCancel={this.onActionCancel}
        >
          Are you sure you want to reject this match?
        </Modal>
      </Card>
    );
  }
}
