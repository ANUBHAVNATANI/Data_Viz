d3.csv("./Data/drop_out_rate.csv").then(showData);
function showData(data) {
  let container = d3.select("#divergingBarChart");
  let states = {};
  for (let { State_UT, year, Avg } of data) {
    if (State_UT in states) {
      states[State_UT][year] = +Avg;
    } else {
      states[State_UT] = { [year]: +Avg };
    }
  }

  for (let state in states) {
    stateObj = states[state];
    absoluteChange = stateObj["2014-15"] - stateObj["2012-13"];
    percentChange =
      ((stateObj["2014-15"] - stateObj["2012-13"]) / stateObj["2012-13"]) * 100;
    absoluteChange = +absoluteChange.toFixed(2);
    percentChange = +percentChange.toFixed(2);
    states[state] = { ...stateObj, absoluteChange, percentChange };
  }

  //diverging bar chart code
  container
    .append("g")
    .selectAll("rect")
    .data(states)
    .join("rect")
    .attr("fill", d => d3.schemeSet1[d.value > 0 ? 1 : 0])
    .attr("x", d => x(Math.min(d.value, 0)))
    .attr("y", (d, i) => y(i))
    .attr("width", d => Math.abs(x(d.value) - x(0)))
    .attr("height", y.bandwidth());

  container
    .append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .selectAll("text")
    .data(states)
    .join("text")
    .attr("text-anchor", d => (d.value < 0 ? "end" : "start"))
    .attr("x", d => x(d.value) + Math.sign(d.value - 0) * 4)
    .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
    .attr("dy", "0.35em")
    .text(d => format(d.value));

  container.append("g").call(xAxis);

  container.append("g").call(yAxis);

  return container.node();
  ///new code
  x = d3
    .scaleLinear()
    .domain(d3.extent(data, d => d.value))
    .rangeRound([margin.left, width - margin.right]);

  y = d3
    .scaleBand()
    .domain(d3.range(data.length))
    .rangeRound([margin.top, height - margin.bottom])
    .padding(0.1);

  xAxis = g =>
    g
      .attr("transform", `translate(0,${margin.top})`)
      .call(
        d3
          .axisTop(x)
          .ticks(width / 80)
          .tickFormat(tickFormat)
      )
      .call(g => g.select(".domain").remove());

  yAxis = g =>
    g
      .attr("transform", `translate(${x(0)},0)`)
      .call(
        d3
          .axisLeft(y)
          .tickFormat(i => data[i].name)
          .tickSize(0)
          .tickPadding(6)
      )
      .call(g =>
        g
          .selectAll(".tick text")
          .filter(i => data[i].value < 0)
          .attr("text-anchor", "start")
          .attr("x", 6)
      );

  format = d3.format(metric === "absolute" ? "+,d" : "+,.0%");

  tickFormat = metric === "absolute" ? d3.formatPrefix("+.1", 1e6) : format;

  barHeight = 25;

  height =
    Math.ceil((data.length + 0.1) * barHeight) + margin.top + margin.bottom;
}
