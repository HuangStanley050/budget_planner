import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import * as d3 from "d3";



class Chart extends Component {



    componentDidMount() {

        this.createPie();
        console.log("Mounted");
    }

    componentDidUpdate() {
        this.createPie();
        console.log("updated!!");
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


        const color = d3.scaleOrdinal(d3['schemeSet3']);

        const graph = svg.select('g')
            .attr('transform', `translate(${cent.x},${cent.y})`);

        const pie = d3.pie()
            .sort(null)
            .value(d => d.cost);



        const arcPath = d3.arc()
            .outerRadius(dims.radius)
            .innerRadius(dims.radius / 2);

        const arcTweenEnter = (d) => {
            let i = d3.interpolate(d.endAngle, d.startAngle);
            return t => {
                d.startAngle = i(t);
                return arcPath(d);
            };
        };

        const arcTweenExit = (d) => {
            let i = d3.interpolate(d.startAngle, d.endAngle);
            return t => {
                d.startAngle = i(t);
                return arcPath(d);
            };
        };

        const data = this.props.data ? this.props.data : null;
        //console.log(data);

        if (data) { //if the data is available from reducer
            color.domain(data.map(d => d.name));
            const paths = graph.selectAll('path')
                .data(pie(data));

            //console.log(pie(data));
            //console.log(paths.enter());
            paths.exit()
                .transition().duration(750)
                .attrTween("d", arcTweenExit)
                .remove(); //remove an element in database

            paths.attr('d', arcPath); //update an element database

            paths.enter()
                .append('path')
                .attr("class", 'arc')
                //.attr('d', arcPath)
                .attr('stroke', '#fff')
                .attr('stroke-width', '3px')
                .attr('fill', d => color(d.data.name))
                .transition().duration(750)
                .attrTween("d", arcTweenEnter);


        }

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
    //console.log(state.firestore);

    return {
        data: state.firestore.ordered.expenses
    };
};

export default compose(firestoreConnect([{ collection: "expenses" }]), connect(mapStateToProps))(Chart);
