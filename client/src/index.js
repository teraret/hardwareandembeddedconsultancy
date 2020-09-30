import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import AppNav from "./AppNav";
import App from "./App";
import Customer from "./page/customer/Customer";
import "bootstrap/dist/css/bootstrap.css";
import "./css/App.css";
import "./css/grails.css";
import "./css/main.css";
import { Route, Redirect, BrowserRouter, Switch } from "react-router-dom";
import Footer from "./Footer";
import { CLIENT_VERSION, REACT_VERSION, SERVER_URL } from "./config";
import Axios from "axios";

function Index() {
  const [serverInfo, setServerInfo] = useState("");
  const [clientInfo, setClientInfo] = useState("");
  const [collapse, setCollapse] = useState(false);

  const toggle = () => {
    setCollapse(!collapse);
  };

  useEffect(() => {
    Axios.get(SERVER_URL + "/application")
      .then((r) => r.json())
      .then((json) => setServerInfo(json))
      .catch((error) => console.error("Error connecting to server: " + error));
  });

  return (
    <BrowserRouter>
      <AppNav
        serverInfo={serverInfo}
        clientInfo={clientInfo}
        collapse={collapse}
        toggle={toggle}
        key={0}
      />
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route exact path="/customer">
          <Customer />
        </Route>
      </Switch>
      <Footer key={3} />
    </BrowserRouter>
  );
}

ReactDOM.render(<Index />, document.getElementById("root"));
