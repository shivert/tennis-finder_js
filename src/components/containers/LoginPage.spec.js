import React from "react";
import { mount, shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { create, renderer } from "react-test-renderer";
import initialState from "../../reducers/initialState";
import LoginPage from "./LoginPage";
import { Button } from "antd";

describe("<LoginPage />", () => {
  it("renders correctly", () => {
    const tree = create(
      <Button type="primary" htmlType="submit" className="login-form-button">
        Login
      </Button>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
