import * as d3 from "d3";

export const handleMouseOver = (d, i, n) => {
    //console.log(n[i]);
    d3.select(n[i])
        .transition().duration(300)
        .attr('fill', 'white');
};

export const handleMouseOut = (d, i, n) => {

};
