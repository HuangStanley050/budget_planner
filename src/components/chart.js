import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { legendColor } from 'd3-svg-legend';
import * as actions from "../store/actions/expenses.js";
import * as d3 from "d3";
import d3tip from "d3-tip";





class Chart extends Component {



    componentDidMount() {

        this.createPie();

    }

    componentDidUpdate() {
        this.createPie();

    }

    createPie = () => {
        //Pie(this.props.data);
        //================Set up=====================//
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
        //===================End Setup===================================//

        /*=============Custom Tween functions=====================*/
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

        function arcTweenUpdate(d) {
            //console.log(this._current, d);
            let i = d3.interpolate(this._current, d);
            this._current = i(1);
            return function(t) {
                return arcPath(i(t));
            };
        }
        //=========================End Tween Functions==================//

        //=====================D3 Event functions===========================//
        const handleMouseOver = (d, i, n) => {
            //console.log(n[i]);
            d3.select(n[i])
                .transition('changeSliceFill').duration(300)
                .attr('fill', 'white');
        };

        const handleMouseOut = (d, i, n) => {
            //console.log(n);
            d3.select(n[i])
                .transition('changeSliceFill').duration(300)
                .attr('fill', color(d.data.name));
        };

        const handleClick = (d) => {
            this.props.deleteExpense(d);
        };

        //=============================End D3 event===================//

        //=================D3 legend chart set up======================//
        const legendGroup = svg.select('#legend')
            .attr('transform', `translate(${dims.width+40},10)`);

        const legend = legendColor()
            .shape('circle')
            .shapePadding(10)
            .scale(color);
        //=======================End set up=============================//


        //=======================D3 tool tip set up=============================//
        const tip = d3tip()
            .attr('class', 'tip card')
            .html(d => {
                //console.log(d.data.cost);
                let content = `<div class="name">${d.data.name}</div>`;
                content += `<div class="cost">${d.data.cost}</div>`;
                content += `<div class="delete">Click to Delete</div>`;
                return content;
            });

        graph.call(tip);

        //========================End=================================//

        const data = this.props.data ? this.props.data : null;
        //console.log(data);

        if (data) { //if the data is available from reducer
            //d3 mouseEvent


            color.domain(data.map(d => d.name));
            //update and call legend
            legendGroup.call(legend);
            legendGroup.selectAll('text').attr('fill', 'white');



            const paths = graph.selectAll('path')
                .data(pie(data));

            //console.log(pie(data));
            //console.log(paths.enter());
            paths.exit()
                .transition().duration(750)
                .attrTween("d", arcTweenExit)
                .remove(); //remove an element in database

            paths.attr('d', arcPath)
                .transition().duration(750)
                .attrTween("d", arcTweenUpdate) //update an element database

            paths.enter()
                .append('path')
                .attr("class", 'arc')
                //.attr('d', arcPath)
                .attr('stroke', '#fff')
                .attr('stroke-width', '3px')
                .attr('fill', d => color(d.data.name))
                .each(function(d) { this._current = d })
                .transition().duration(750)
                .attrTween("d", arcTweenEnter);

            graph.selectAll('path')
                .on('mouseover', (d, i, n) => {
                    tip.show(d, n[i]);
                    handleMouseOver(d, i, n);
                })
                .on("mouseout", (d, i, n) => {
                    tip.hide();
                    handleMouseOut(d, i, n);
                })
                .on("click", (d, i, n) => {
                    tip.hide();
                    handleClick(d, i, n)
                });

        }


    }

    render() {

        return (
            <div className="col s12 m5 push-m1">
                <div className="canvas" >
                 <svg ref={el=>this.myREF=el}>
                 <g></g>
                 <g id="legend"></g>
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

const mapDispatchToProps = dispatch => {
    return {
        deleteExpense: (d) => dispatch(actions.deleteExpense(d))
    };
};

export default compose(firestoreConnect([{ collection: "expenses" }]), connect(mapStateToProps, mapDispatchToProps))(Chart);
