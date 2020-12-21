import React, { useEffect } from "react";
import * as d3 from "d3";

function IndiaMap() {
  useEffect(() => {
    createChart();
  }, []);

  function showData(data) {
    let mapInfo = data[0];
    let dropOutData = data[1];
    let container = d3.select("#container");
    let bodyHeight = 1000;
    let bodyWidth = 1000;
    let projection = d3
      .geoMercator()
      .center(d3.geoCentroid(mapInfo))
      .translate([bodyWidth / 2, bodyHeight / 2])
      .scale(1000);
    let states = {};
    let statesName = [];
    for (let { State_UT, year, Avg } of dropOutData) {
      //   console.log({ State_UT, year, All_Schools });
      if (State_UT in states) {
        states[State_UT][year] = +Avg;
      } else {
        states[State_UT] = { [year]: +Avg };
      }
    }

    mapInfo.features = mapInfo.features.map((d) => {
      let state = d.properties.NAME_1;
      statesName.push(state);
      let dropOutRate = states[state];
      d.properties.dropOutRate = dropOutRate["2014-15"];
      return d;
    });

    let cScale = d3.scaleOrdinal().domain(statesName).range(d3.schemePaired);
    let div = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
    let path = d3.geoPath().projection(projection);
    container
      .selectAll("path")
      .data(mapInfo.features)
      .enter()
      .append("path")
      .attr("d", (d) => path(d))
      .attr("stroke", "black")
      .attr("fill", (d) => cScale(d.properties.NAME_1))
      .on("mouseover", function (d, i) {
        d3.select(this).transition().duration(300).style("opacity", 0.5);
        console.log("Here");
        div.transition().duration(300).style("opacity", 0);
        div.text(d.properties.NAME_1 + ": " + d.properties.dropOutRate);
      })
      .on("mouseout", function (d, i) {
        console.log("there");
        d3.select(this).transition().duration(300).style("opacity", 0.5);
        div.transition().duration(300).style("opacity", 0);
      });
  }

  const createChart = () => {
    Promise.all([
      d3.json("./data/india_state.json"),
      d3.csv("./data/drop_out_rate.csv"),
    ]).then(showData);
  };

  return (
    <div>
      <svg id="container" height="1000" width="1000"></svg>
    </div>
  );
}
export default IndiaMap;
