import React, { Component } from "react";
import { login } from "../store/actions/auth";
import { connect } from 'react-redux';

class Auth extends Component {
    state = {
        username: "",
        password: ""
    }
    inputHandler = (e) => {

        this.setState({
            [e.target.id]: e.target.value
        });

    }
    handleSubmit = (e) => {
        e.preventDefault();
        //console.log(this.state);
        this.props.login(this.state.username, this.state.password);
    }
    render() {
        return (

            <div className="valign-wrapper row login-box">
                <div className="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
                    <form onSubmit={this.handleSubmit}>
                        <div className="card-content">
                            <span className="card-title">Enter credentials</span>
                            <div className="row">
                                <div className="input-field col s12">
                                    <label htmlFor="email">Email address</label>
                                    <input onChange={this.inputHandler}type="email" className="validate" name="username" id="username" />
                                </div>
                                <div className="input-field col s12">
                                    <label htmlFor="password">Password </label>
                                    <input onChange={this.inputHandler}type="password" className="validate" name="password" id="password" />
                                </div>
                            </div>
                        </div>
                <div className="card-action right-align">
                    
                    <input type="reset" id="reset" className="btn-flat grey-text waves-effect"/>
                    <input type="submit" className="btn green waves-effect waves-light" placeholder="Login"/>
                    <div>
                      <span className="red-text">{this.props.error}</span>
                    </div>
                </div>
                    </form>
                </div>
            </div>
        );


    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (username, password) => dispatch(login(username, password))
    };
};

const mapStateToProps = state => {
    return {
        error: state.auth.errorMessage
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
