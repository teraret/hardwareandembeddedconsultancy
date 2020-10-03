import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import AppNav from "./AppNav";
import App from "./App";
import Customer from "./page/customer/Customer";
import CustomerForm from "./page/customer/CustomerForm";
import "bootstrap/dist/css/bootstrap.css";
import "./css/App.css";
import "./css/grails.css";
import "./css/main.css";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Footer from "./Footer";
import Axios from "axios";
import { Provider } from "react-redux";
import store from "./redux/store";

function Index() {
  const [collapse, setCollapse] = useState(false);

  const toggle = () => {
    setCollapse(!collapse);
  };

  // useEffect(() => {
  //   Axios.get(SERVER_URL + "/application")
  //     .then((r) => r.json())
  //     .then((json) => setServerInfo(json))
  //     .catch((error) => console.error("Error connecting to server: " + error));
  // });

  return (
    <BrowserRouter>
      <AppNav collapse={collapse} toggle={toggle} key={0} />
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route exact path="/customer">
          <Customer />
        </Route>
        <Route exact path="/customer/create">
          <CustomerForm />
        </Route>
      </Switch>
      <Footer key={3} />
    </BrowserRouter>
  );
}

ReactDOM.render(
  <Provider store={store}>
    <Index />
  </Provider>,
  document.getElementById("root")
);
