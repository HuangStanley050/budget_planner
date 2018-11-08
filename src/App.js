import React, { Component } from 'react';
import Auth from "./components/auth";
import Header from "./components/header";
import Form from "./components/form";
import Chart from "./components/chart";


class App extends Component {
  render() {
    return (
      <div>
      <Header/>
      <Auth/>
      
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

export default App;
