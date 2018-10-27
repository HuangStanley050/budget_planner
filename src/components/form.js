import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from "../store/actions/expenses.js";

class Form extends Component {
    state = {
        name: null,
        cost: null
    }

    inputHandler = (e) => {

        this.setState({
            [e.target.id]: e.target.value
        });

    }

    submitHander = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.createExp(this.state);
    }
    render() {
        return (
            <div className="col s12 m6">
            <form onSubmit={this.submitHander} className="card z-depth-0">
               <div className="card-content">
                <span className="card-title indigo-text">Add Item</span>
                
                <div className="input-field">
                 <input onChange={this.inputHandler}type="text" id="name"/>
                 <label forhtml="name">Item Name</label>
                </div>
                
                <div className="input-field">
                 <input onChange={this.inputHandler} type="text" id="cost"/>
                 <label forhtml="name">Cost</label>
                </div>
                
                <div className="input-field center">
                 <button className="btn-large pink white-text">Add Item</button>
                </div>
                
                <div className="input-field center">
                 <p className="red-text" id="error">test</p>
                </div>
                </div>
            </form>
            
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createExp: (expense) => dispatch(actions.createExpense(expense))
    };
};

export default connect(null, mapDispatchToProps)(Form);
