Promise.all([
  d3.json("./Data/india_state.json"),
  d3.csv("./Data/drop_out_rate.csv")
]).then(showData);

function showData(data) {
  const bodyHeight = 700;
  const bodyWidth = 700;

  let [mapInfo, dropOutData] = data;

  let container = d3.select("#choroplethMap");

  let projection = d3
    .geoMercator()
    .center(d3.geoCentroid(mapInfo))
    .translate([bodyWidth / 2, bodyHeight / 2])
    .scale(1000);

  let states = {};
  for (let { State_UT, year, Avg } of dropOutData) {
    if (State_UT in states) {
      states[State_UT][year] = +Avg;
    } else {
      states[State_UT] = { [year]: +Avg };
    }
  }

  mapInfo.features = mapInfo.features.map(d => {
    let state = d.properties["NAME_1"];
    d.properties.avgDropOutRate2015 = states[state]["2014-15"];

    return d;
  });

  minDropOutRate = d3.min(
    mapInfo.features,
    d => d.properties.avgDropOutRate2015
  );

  medianDropOutRate = d3.median(
    mapInfo.features,
    d => d.properties.avgDropOutRate2015
  );

  maxDropOutRate = d3.max(
    mapInfo.features,
    d => d.properties.avgDropOutRate2015
  );

  let sequentialScale = d3
    .scaleLinear()
    .domain([minDropOutRate, medianDropOutRate, maxDropOutRate])
    .range(["white", "orange", "red"]);

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
    .attr("d", d => path(d))
    .attr("stroke", "black")
    .attr("fill", d => sequentialScale(d.properties.avgDropOutRate2015))
    .on("mouseenter", function(d) {
      d3.select(this)
        .transition()
        .style("opacity", 0.3);
      div.transition().style("opacity", 1);
      div
        .html(
          `<strong>${d.properties["NAME_1"]}</strong>
           <div>${d.properties.avgDropOutRate2015}</div>
          `
        )
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY - 30 + "px");
    })
    .on("mouseleave", function() {
      d3.select(this)
        .transition()
        .style("opacity", 1);
      div.transition().style("opacity", 0);
    });

  let legend = d3
    .select("#choroplethMap")
    .append("svg:linearGradient")
    .attr("id", "gradient")
    .attr("x1", "100%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "100%")
    .attr("spreadMethod", "pad");

  legend
    .append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "red")
    .attr("stop-opacity", 1);

  legend
    .append("stop")
    .attr("offset", "50%")
    .attr("stop-color", "orange")
    .attr("stop-opacity", 1);

  legend
    .append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "white")
    .attr("stop-opacity", 1);

  legend
    .append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#084081")
    .attr("stop-opacity", 1);

  container
    .append("rect")
    .attr("width", 20)
    .attr("height", 300)
    .style("fill", "url(#gradient)")
    .attr("transform", "translate(140,450)");
  var y = d3
    .scaleLinear()
    .range([300, 0])
    .domain([minDropOutRate, maxDropOutRate]);

  var yAxis = d3
    .axisLeft()
    .scale(y)
    .ticks(10);

  container
    .append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(140,450)")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("axis title");
}
