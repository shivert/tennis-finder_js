import React from "react";
import { Layout, Row, Col } from "antd";

const { Content, Header, Footer } = Layout;

export default class PageLayout extends React.Component {
  render() {
    return (
      <Layout style={{ minHeight: "100%" }}>
        <Header style={{ background: "#fff" }}>
          <h1>{this.props.pageTitle}</h1>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Layout style={{ padding: "24px 0" }}>
            <Content style={{ padding: "0 24px", minHeight: "100%" }}>
              {this.props.children}
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Rishi Goel Spencer Hivert Peter Zhang ©2018
        </Footer>
      </Layout>
    );
  }
}
