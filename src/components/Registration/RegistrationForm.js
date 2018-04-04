import React from "react";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  DatePicker,
  Select,
  Row,
  Col,
  Checkbox,
  Button
} from "antd";
import { ajaxGet, ajaxPost } from "../../utils/request";

const FormItem = Form.Item;
const Option = Select.Option;

class Registration extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      const birthYear = values.birthDate.format("YYYY");
      const formData = { ...values, birthYear };
      ajaxPost("https://rails-test-199116.appspot.com/signup", formData)
        .then(responseObject => {
          console.log(responseObject);
        })
        .catch(err => {
          console.log("error: ", err);
        });
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    const prefixSelector = getFieldDecorator("country", {
      initialValue: "1"
    })(
      <Select style={{ width: 70 }}>
        <Option value="1">+1</Option>
      </Select>
    );

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="First Name">
          {getFieldDecorator("firstName", {
            rules: [
              {
                required: true,
                message: "Please input your first name!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Last Name">
          {getFieldDecorator("lastName", {
            rules: [
              {
                required: true,
                message: "Please input your last name!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={
            <span>
              User Name&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("userName", {
            rules: [
              {
                required: true,
                message: "Please input your preferred user name!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="E-mail">
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
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Password">
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Please input your password!"
              },
              {
                validator: this.validateToNextPassword
              }
            ]
          })(<Input type="password" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Confirm Password">
          {getFieldDecorator("confirm", {
            rules: [
              {
                required: true,
                message: "Please confirm your password!"
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Phone Number">
          {getFieldDecorator("phone", {
            rules: [
              { required: true, message: "Please input your phone number!" }
            ]
          })(<Input addonBefore={prefixSelector} style={{ width: "100%" }} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Zip Code">
          {getFieldDecorator("zip")(<Input style={{ width: "100%" }} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Location">
          {getFieldDecorator("location")(<Input style={{ width: "100%" }} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Skill Level">
          {getFieldDecorator("skill", {
            rules: [
              { required: true, message: "Please input your skill level" }
            ]
          })(
            <Select style={{ width: "100%" }}>
              <Option value="1">USDA 1</Option>
              <Option value="1.5">USDA 1.5</Option>
              <Option value="2">USDA 2</Option>
              <Option value="2.5">USDA 2.5</Option>
              <Option value="3">USDA 3</Option>
              <Option value="3.5">USDA 3.5</Option>
              <Option value="4">USDA 4</Option>
              <Option value="4.5">USDA 4.5</Option>
              <Option value="5">USDA 5</Option>
              <Option value="6">USDA 5 and up</Option>
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Gender">
          {getFieldDecorator("gender", {
            rules: [{ required: true, message: "Please input your gender" }]
          })(
            <Select style={{ width: "100%" }}>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Others</Option>
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Birth Date">
          {getFieldDecorator("birthDate", {
            rules: [
              {
                type: "object",
                required: true,
                message: "Please select your birth date!"
              }
            ]
          })(<DatePicker />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Home Court">
          {getFieldDecorator("homeCourt")(<Input style={{ width: "100%" }} />)}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          {getFieldDecorator("agreement", {
            valuePropName: "checkedAgreement",
            rules: [
              {
                required: true,
                message: "Please agree to agreement!"
              }
            ]
          })(
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const RegistrationForm = Form.create()(Registration);

export default RegistrationForm;
