import React, { Component } from 'react';
import { connect } from "react-redux";
import Auth from "./components/auth";
import Header from "./components/header";
import Form from "./components/form";
import Chart from "./components/chart";


class App extends Component {
  render() {
    let content = null;
    if (this.props.authStatus) {
      content = (
        <div className="container section">
        <div className="row">
          <Form/>
          <Chart/>
        </div>
      </div>

      );
    }
    else {

      content = <Auth />;
    }
    return (
      <div>
      <Header/>
      {content}
      {/*<Auth/>*/}
      
      {/*<div className="container section">
        <div className="row">
          <Form/>
          <Chart/>
        </div>
      </div>*/}
      
      </div>


    );
  }
}

const mapStateToProps = state => {
  return {
    authStatus: state.auth.authStatus

  };
};

export default connect(mapStateToProps)(App);
