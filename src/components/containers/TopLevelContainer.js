import React from "react";
import { Layout, Menu } from "antd";
const { Header, Content } = Layout;
import { Switch, NavLink, Route } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import PlayerFinder from "../PlayerFinder/PlayerFinder";
import MatchScheduler from "../MatchScheduler/MatchScheduler";
import MatchHistory from "../MatchHistory/MatchHistory";
import CourtFinder from "../CourtFinder/CourtFinder";

export default class TopLevelContainer extends React.Component {
  appStructure = [
    {
      route: "/dashboard",
      title: "Dashboard",
      component: Dashboard
    },
    {
      route: "/courtfinder",
      title: "Court Finder",
      component: CourtFinder
    },
    {
      route: "/matchscheduler",
      title: "Match Scheduler",
      component: MatchScheduler
    },
    {
      route: "/messages",
      title: "Messages",
      component: stub
    },
    {
      route: "/playerfinder",
      title: "Player Finder",
      component: PlayerFinder
    },
    {
      route: "/matchhistory",
      title: "Match History",
      component: MatchHistory
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
    console.log(this.routeList);
    return (
      <div>
        <Layout>
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
        <Content style={{ height: "100vh" }}>
          <Switch>
            {this.routeList}
            <Route component={badstub} />
          </Switch>
        </Content>
      </div>
    );
  }
}
const stub = () => {
  return <div>new</div>;
};
const badstub = () => {
  return <div>bad</div>;
};
