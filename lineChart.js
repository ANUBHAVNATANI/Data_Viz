Promise.all([d3.csv("./data/school_boys_toilet.csv")]).then(showData);

const bodyHeight = 300;
const bodyWidth = 300;

function createLineChart(curState, states, container) {
  container.selectAll("*").remove();

  // for  each state: draw line graph
  let maxVal = d3.max(states[curState], (d) => d.value);
  let minVal = d3.min(states[curState], (d) => d.value);

  let yScale = d3.scaleLinear().domain([minVal, maxVal]).range([bodyHeight, 0]);

  let xScale = d3
    .scaleTime()
    .domain(d3.extent(states[curState], (d) => d.year))
    .range([0, bodyWidth]);

  container
    .append("g")
    .attr("transform", "translate(40, 0)")
    .attr("opacity", 0.7)
    .call(d3.axisLeft(yScale).tickSize(-bodyWidth));

  container
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - 10)
    .attr("x", 0 - bodyHeight / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("PlaceHolder"); /// change dynamically

  container
    .append("g")
    .attr("transform", `translate(40, ${bodyHeight})`)
    .attr("opacity", 0.7)
    .call(
      d3
        .axisBottom(xScale)
        .ticks(3)
        .tickSize(-bodyHeight)
        .tickFormat(d3.timeFormat("%Y"))
    );

  container
    .append("text")
    .attr("transform", `translate(${30 + bodyWidth / 2}, ${bodyHeight + 30})`)
    .style("text-anchor", "middle")
    .text("Year");

  let valueLine = d3
    .line()
    .x((d) => xScale(d.year))
    .y((d) => yScale(d.value));

  container
    .append("path")
    .datum(states[curState])
    .attr("d", valueLine)
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("transform", "translate(40, 0)");
}

// main function
function showData(dataSources) {
  let container = d3.select("#lineChart");

  let [boysToilet] = dataSources;

  let states = {};
  let formatYear = d3.timeParse("%Y");

  for (let { State_UT, year, Avg } of boysToilet) {
    year = formatYear(year.split("-")[0]);

    if (State_UT in states) {
      states[State_UT].push({ year: year, value: +Avg });
    } else {
      states[State_UT] = [{ year: year, value: +Avg }];
    }
  }

  curState = document.querySelector("select").value;

  createLineChart(curState, states, container);

  document.querySelector("select").addEventListener("change", (event) => {
    curState = event.target.value;
    createLineChart(curState, states, container);
  });
}
