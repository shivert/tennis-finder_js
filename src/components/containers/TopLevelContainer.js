import React from "react";
import { Layout, Menu } from "antd";
const { Header } = Layout;
import { Switch, NavLink, Route } from "react-router-dom";

export default class TopLevelContainer extends React.Component {
  appStructure = [
    {
      route: "/dashboard",
      title: "Dashboard",
      component: stub
    },
    {
      route: "/courtfinder",
      title: "Court Finder",
      component: stub
    },
    {
      route: "/matchscheduler",
      title: "Match Scheduler",
      component: stub
    },
    {
      route: "/messages",
      title: "Messages",
      component: stub
    },
    {
      route: "/playerfinder",
      title: "Player Finder",
      component: stub
    },
    {
      route: "/matchhistory",
      title: "Match History",
      component: stub
    },
    {
      route: "/profile",
      title: "Your Profile",
      component: stub
    }
  ];

  state = { selectedKeys: ["1"] };

  constructor() {
    super();
    this.menuItems = this.appStructure.map((routeDefn, index) => {
      return (
        <Menu.Item key={`${index}`}>
          <NavLink to={routeDefn.route}>{routeDefn.title}</NavLink>
        </Menu.Item>
      );
    });
    this.routeList = this.appStructure.map((routeDefn, index) => {
      return (
        <Route
          key={index}
          path={routeDefn.route}
          component={routeDefn.component}
        />
      );
    });
  }

  componentDidMount() {
    // match url with activated path
    const currentPath = this.props.location.pathname;
    const currentMenuItem = this.appStructure.findIndex(item => {
      return item.route === currentPath;
    });
    this.setState({ selectedKeys: [`${currentMenuItem}`] });
  }

  onMenuClick = ({ key }) => {
    this.setState({ selectedKeys: [key] });
  };

  render() {
    return (
      <div>
        <Layout key="menu">
          <Header className="header">
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={this.state.selectedKeys}
              defaultSelectedKeys={["1"]}
              style={{ lineHeight: "64px" }}
              onClick={this.onMenuClick}
            >
              {this.menuItems}
            </Menu>
          </Header>
        </Layout>
        <div key="pageContent">
          <Switch>
            {this.routelist}
            <Route component={stub} />
          </Switch>
        </div>
      </div>
    );
  }
}
const stub = () => {
  return <div>stub</div>;
};