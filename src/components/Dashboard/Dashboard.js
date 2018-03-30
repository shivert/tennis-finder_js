import React from "react";
import { Layout, Row, Col } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "../../actions/dashboardActions";
import UpcomingMatchesPanel from "./UpcomingMatchesPanel";
import PageLayout from "../containers/PageLayout";
import RecentMatches from "./RecentMatches";

const { Content, Header, Footer } = Layout;

class Dashboard extends React.Component {
  render() {
    return (
      <PageLayout pageTitle="Your Dashboard">
        <Row gutter={32}>
          <Col span={8}>
            <UpcomingMatchesPanel />
          </Col>
          <Col span={8}>
            <RecentMatches />
          </Col>
        </Row>
      </PageLayout>
    );
  }
}

function mapStateToProps(state) {
  return {
    fuelSavings: state.dashboard
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
