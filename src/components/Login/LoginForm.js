import React from "react";
import { Form, Icon, Input, Button, Checkbox, Row, Col, Alert } from "antd";
import { Redirect } from "react-router-dom";
import { ajaxPost } from "../../utils/request";

const FormItem = Form.Item;

class Login extends React.Component {
  state = { isAuthenticated: false, hasAuthenticationError: false };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log(values);
      ajaxPost(
        "https://rails-test-199116.appspot.com/auth/login",
        values,
        responseObject => {
          if (responseObject.status === 200) {
            document.cookie = responseObject.auth_token;
            this.setState({
              isAuthenticated: true,
              hasAuthenticationError: false
            });
          }
          this.setState({ hasAuthenticationError: true });
        },
        err => {
          this.setState({ hasAuthenticationError: true });
          console.log("error: ", err);
        }
      );
    });
  };
  render() {
    if (this.state.isAuthenticated) {
      return <Redirect to="/dashboard" />;
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        {this.state.hasAuthenticationError && (
          <Alert
            message="Authentication failed. Please check your credentials"
            type="error"
          />
        )}
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "The input is not valid E-mail!"
                },
                {
                  required: true,
                  message: "Please input your E-mail!"
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="email"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </FormItem>
          <FormItem>
            <Row>
              <Col span={24}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
                <a href="/register" style={{ marginLeft: "5px" }}>
                  register now!
                </a>
              </Col>
            </Row>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const LoginForm = Form.create()(Login);

export default LoginForm;
