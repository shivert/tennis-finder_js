import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col, Layout, Card } from "antd";
import * as actions from "../../actions/registrationActions";
import RegistrationForm from "../Registration/RegistrationForm";

const { Header, Content } = Layout;
class RegistrationPage extends React.Component {
  render() {
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
                <Card title="Register">
                  <RegistrationForm />
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
