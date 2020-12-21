Promise.all([
  d3.json("./Data/india_state.json"),
  d3.csv("./Data/drop_out_rate.csv"),
]).then(showData);

function displayItems(data) {
  let htmlToReturn = "";
  for (let [key, value] of Object.entries(data)) {
    htmlToReturn += `<div><strong>${key}</strong> : ${value}</div>`;
  }
  return htmlToReturn;
}

function showData(data) {
  const bodyHeight = 1000;
  const bodyWidth = 1000;

  let [mapInfo, dropOutData] = data;

  let container = d3.select("#valueMap");

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

  mapInfo.features = mapInfo.features.map((d) => {
    let state = d.properties["NAME_1"];
    d.properties.dropOutRates = states[state];

    return d;
  });

  let cScale = d3
    .scaleOrdinal()
    .domain(mapInfo.features.map((d) => d.properties["NAME_1"]))
    .range(d3.schemePaired);

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
    .attr("fill", (d) => cScale(d.properties["NAME_1"]))
    .on("mouseenter", function (d) {
      d3.select(this).transition().style("opacity", 0.5);
      div.transition().style("opacity", 1);
      div
        .html(
          `<strong><i>${d.properties["NAME_1"]}</i></strong>
           <div>
                ${displayItems(d.properties.dropOutRates)}    
            </div>
          `
        )
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY - 30 + "px");
    })
    .on("mouseleave", function () {
      d3.select(this).transition().style("opacity", 1);
      div.transition().style("opacity", 0);
    });
}
