import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import DetailPage from "./components/DetailPage";
import CreatePage from "./components/CreatePage";
import Header from "./components/Header";
import EditPage from "./components/EditPage";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route path="/" exact component={LandingPage} />
          <Route path="/api/v1/employees/:id" component={DetailPage} />
          <Route path="/api/v1/employees" component={CreatePage} />
          <Route path="/api/v1/employees/:id" component={EditPage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;