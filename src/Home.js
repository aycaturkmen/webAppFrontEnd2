import React from "react";
import { Tabs, Tab, AppBar } from "@material-ui/core";
import Projects from "./Projects";
import Users from "./Users";
import NewUser from "./NewUser";
import NewProject from "./NewProject";

const Home = props => {
  const { match, history } = props;
  const { params } = match;
  const { page } = params;

  const tabNameToIndex = {
    0: "users",
    1: "projects",
    2: "newUser",
    3: "newProject"
  };

  const indexToTabName = {
    users: 0,
    projects: 1,
    newUser: 2,
    newProject: 3
  };

  const [selectedTab, setSelectedTab] = React.useState(indexToTabName[page]);

  const handleChange = (event, newValue) => {
    history.push(`/home/${tabNameToIndex[newValue]}`);
    setSelectedTab(newValue);
  };

  return (
    <>
      <AppBar position="static">
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab label="Users" />
          <Tab label="Projects" />
          <Tab label="New User" />
          <Tab label="New Project" />
        </Tabs>
      </AppBar>
      {selectedTab === 0 && <Users />}
      {selectedTab === 1 && <Projects />}
      {selectedTab === 2 && <NewUser />}
      {selectedTab === 3 && <NewProject />}
    </>
  );
};

export default Home;
