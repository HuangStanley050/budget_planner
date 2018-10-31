import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import * as d3 from "d3";

class Chart extends Component {
    myRef = React.createRef();

    componentDidMount() {

        this.createPie();
        console.log("Mounted");
    }

    componentDidUpdate() {
        this.createPie();
        console.log(this.props.data);
    }

    createPie = () => {
        const dims = {
            height: 300,
            width: 300,
            radius: 150
        };


        const cent = {
            x: (dims.width / 2 + 5),
            y: (dims.height / 2 + 5)
        };

        const svg = d3.select(this.myREF)
            //.append('svg')
            .attr('width', dims.width + 150)
            .attr('height', dims.height + 150);

        //console.log(svg);

        const graph = svg.select('g')
            .attr('transform', `translate(${cent.x},${cent.y})`);

        const pie = d3.pie()
            .sort(null)
            .value(d => d.cost);

        const angles = pie([{ name: 'rent', cost: 500 }, { name: 'bills', cost: 300 }, { name: 'gaming', cost: 200 }]);
        //console.log(angles);

        const arcPath = d3.arc()
            .outerRadius(dims.radius)
            .innerRadius(dims.radius / 2);

    }

    render() {

        return (
            <div className="col s12 m5 push-m1">
                <div className="canvas" >
                 <svg ref={el=>this.myREF=el}>
                 <g></g>
                 </svg>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    //console.log(state);

    return {
        data: state.firestore.ordered.expenses
    };
};

export default compose(firestoreConnect([{ collection: "expenses" }]), connect(mapStateToProps))(Chart);
