import React from "react";
import * as Demos from "./demos";
import { Layout, Menu, Typography } from "antd";

import "./App.css";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";

const SideBar = () => {
  const history = useHistory();
  const location = useLocation();
  return (
    <Menu
      defaultSelectedKeys={[location.pathname]}
      style={{ height: "100%" }}
      theme="dark"
      mode="vertical"
    >
      {Object.keys(Demos).map((key) => (
        <Menu.Item onClick={() => history.push(`/${key}`)} key={`/${key}`}>
          {key}
        </Menu.Item>
      ))}
    </Menu>
  );
};

const App = () => {
  return (
    <Router>
      <Layout style={{ height: "100%" }}>
        <Layout.Header
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography style={{ textAlign: "center" }}>
            <Typography.Title level={3} style={{ color: "white" }}>
              图表模板、示例、实验室
            </Typography.Title>
          </Typography>
        </Layout.Header>
        <Layout.Content>
          <Layout style={{ height: "100%" }}>
            <Layout.Sider>
              <SideBar />
            </Layout.Sider>
            <Layout.Content style={{ padding: 20 }}>
              <Switch>
                {Object.entries(Demos).map(([compName, Comp]) => (
                  <Route
                    key={compName}
                    path={`/${compName}`}
                    component={Comp}
                  />
                ))}
              </Switch>
            </Layout.Content>
          </Layout>
        </Layout.Content>
      </Layout>
    </Router>
  );
};

export default App;
