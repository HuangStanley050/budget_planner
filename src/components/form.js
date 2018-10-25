import React, { Component } from "react";

class Form extends Component {
    render() {
        return (
            <div className="col s12 m6">
            <form className="card z-depth-0">
               <div className="card-content">
                <span className="card-title indigo-text">Add Item</span>
                
                <div className="input-field">
                 <input type="text" id="name"/>
                 <label forHtml="name">Item Name</label>
                </div>
                
                <div className="input-field">
                 <input type="text" id="cost"/>
                 <label forHtml="name">Cost</label>
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

export default Form;
