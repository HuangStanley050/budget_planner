import React, { Component } from "react";

class Auth extends Component {
    state = {
        username: "",
        password: ""
    }
    render() {
        return (

            <div className="valign-wrapper row login-box">
                <div className="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
                    <form>
                        <div className="card-content">
                            <span className="card-title">Enter credentials</span>
                            <div className="row">
                                <div className="input-field col s12">
            <label htmlFor="email">Email address</label>
            <input type="email" className="validate" name="username" id="username" />
          </div>
          <div className="input-field col s12">
            <label htmlFor="password">Password </label>
            <input type="password" className="validate" name="password" id="password" />
          </div>
        </div>
      </div>
      <div className="card-action right-align">
        <input type="reset" id="reset" className="btn-flat grey-text waves-effect"/>
        <input type="submit" className="btn green waves-effect waves-light" value="Login"/>
      </div>
    </form>
  </div>
</div>
        );


    }
}

export default Auth;
