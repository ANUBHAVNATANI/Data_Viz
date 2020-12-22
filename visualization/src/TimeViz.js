import React, { useEffect } from "react";
import * as d3 from "d3";

function TimeViz() {
  useEffect(() => {
    createChart();
  }, []);

  const showData = dataSources => {
    let container = d3.select("#timeContainer");
    let bodyWidth = 400;
    let bodyHeight = 400;

    let boys_toilet = dataSources[0];

    let states = {};

    console.log(boys_toilet);
    for (let { State_UT, year, All_Schools } of boys_toilet) {
      //   console.log({ State_UT, year, All_Schools });
      if (State_UT in states) {
        states[State_UT][year] = All_Schools;
      } else {
        states[State_UT] = { [year]: All_Schools };
      }
    }
    //console.log(states);

    boys_toilet = boys_toilet.map(d => ({
      All_Schools: +d.All_Schools,
      year: d.year
    }));

    let max_toilet = d3.max(boys_toilet, d => d.All_Schools);

    let yScale = d3
      .scaleLinear()
      .domain([0, max_toilet])
      .range([bodyHeight, 0]);

    let xScale = d3
      .scaleTime()
      .domain(d3.extent(boys_toilet, d => d.All_Schools))
      .range([0, bodyWidth]);

    container.append("g").call(d3.axisLeft(yScale));
    container
      .append("g")
      .attr("transform", "translate(0," + bodyHeight + ")")
      .call(d3.axisBottom(xScale));

    let valueLine = d3
      .line()
      .x(d => xScale(d.All_Schools))
      .y(d => yScale(d.year));

    container
      .append("path")
      .datum(boys_toilet)
      .attr("d", valueLine)
      .attr("class", "line");
  };

  const createChart = () => {
    Promise.all([d3.csv("./data/school boys toilet.csv")]).then(showData);
  };

  return (
    <svg id="timeContainer" height="400" width="400">
      hello
    </svg>
  );
}

export default TimeViz;
