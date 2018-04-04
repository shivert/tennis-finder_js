import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col, Layout, Card, Alert } from "antd";
import { Redirect } from "react-router-dom";

import * as actions from "../../actions/registrationActions";
import RegistrationForm from "../Registration/RegistrationForm";

const { Header, Content } = Layout;
class RegistrationPage extends React.Component {
  state = { isRegistrationComplete: false, hasRegistrationError: false };

  onRegistrationComplete = () => {
    this.setState({
      isRegistrationComplete: true,
      hasRegistrationError: false
    });
  };

  onRegistrationError = () => {
    this.setState({ hasRegistrationError: true });
  };

  render() {
    if (this.state.isRegistrationComplete) {
      return (
        <Redirect
          to={{
            pathname: "/dashboard"
          }}
        />
      );
    }
    return (
      <div>
        <Layout style={{ minHeight: "100vh" }}>
          <Header style={{ background: "rgba(0,0,0,0)" }} />
          <Content style={{ margin: "0 16px" }}>
            <Row type="flex" justify="center">
              <Col span={6}>
                <h1>Register for Tennis Finder</h1>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span={12}>
                <Card>
                  {this.state.hasRegistrationError && (
                    <Alert
                      message="  There was an error when completing the registration.
                      Please try again later"
                      type="error"
                    />
                  )}
                  <RegistrationForm
                    onRegistrationComplete={this.onRegistrationComplete}
                    onRegistrationError={this.onRegistrationError}
                  />
                </Card>
              </Col>
            </Row>
          </Content>
        </Layout>
      </div>
    );
  }
}

RegistrationPage.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    fuelSavings: state.fuelSavings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
