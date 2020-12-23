Promise.all([
  d3.json("./Data/india_state.json"),
  d3.csv("./Data/drop_out_rate.csv"),
  d3.csv("./Data/literacy_rate.csv"),
  d3.csv("./Data/school_boys_toilet.csv"),
  d3.csv("./Data/school_computer.csv"),
  d3.csv("./Data/school_drinking_water.csv"),
  d3.csv("./Data/school_electricity.csv"),
  d3.csv("./Data/school_girls_toilet.csv"),
  d3.csv("./Data/state_wise_budget.csv"),
  d3.csv("./Data/trained_teacher_school.csv"),
  d3.csv("./Data/gross_enrollment_school.csv")
]).then(showData);

function displayItems(data) {
  let htmlToReturn = "";
  for (let [key, value] of Object.entries(data)) {
    htmlToReturn += `<div><strong>${key}</strong> : ${+value.toFixed(2)}</div>`;
  }
  return htmlToReturn;
}

function showValueMap(mapInfo, category, categoryData, container) {
  container.selectAll("*").remove();
  const bodyHeight = 500;
  const bodyWidth = 500;
  let projection = d3
    .geoMercator()
    .center(d3.geoCentroid(mapInfo))
    .translate([bodyWidth / 2, bodyHeight / 2])
    .scale(1000);

  let states = {};
  for (let { State_UT, year = "2014-15", Avg } of categoryData) {
    if (State_UT in states) {
      states[State_UT][year] = +Avg;
    } else {
      states[State_UT] = { [year]: +Avg };
    }
  }

  mapInfo.features = mapInfo.features.map((d) => {
    let state = d.properties["NAME_1"];
    d.properties[category] = states[state];
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
              ${displayItems(d.properties[category])}    
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

function showChoroplethMap(mapInfo, category, categoryData, container) {
  container.selectAll("*").remove();
  const bodyHeight = 500;
  const bodyWidth = 500;

  let projection = d3
    .geoMercator()
    .center(d3.geoCentroid(mapInfo))
    .translate([bodyWidth / 2, bodyHeight / 2])
    .scale(1000);

  let states = {};
  for (let { State_UT, year = "2014-15", Avg } of categoryData) {
    if (State_UT in states) {
      states[State_UT][year] = +Avg;
    } else {
      states[State_UT] = { [year]: +Avg };
    }
  }
  mapInfo.features = mapInfo.features.map((d) => {
    let state = d.properties["NAME_1"];
    d.properties[category] = states[state]["2014-15"];

    return d;
  });

  minCategoryValue = d3.min(mapInfo.features, (d) => d.properties[category]);

  medianCategoryValue = d3.median(
    mapInfo.features,
    (d) => d.properties[category]
  );

  maxCategoryValue = d3.max(mapInfo.features, (d) => d.properties[category]);

  let sequentialScale = d3
    .scaleLinear()
    .domain([minCategoryValue, medianCategoryValue, maxCategoryValue])
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
    .attr("d", (d) => path(d))
    .attr("stroke", "black")
    .attr("fill", (d) => sequentialScale(d.properties[category]))
    .on("mouseenter", function (d) {
      d3.select(this).transition().style("opacity", 0.3);
      div.transition().style("opacity", 1);
      div
        .html(
          `<strong>${d.properties["NAME_1"]}</strong>
           <div>${+d.properties[category].toFixed(2)}</div>
          `
        )
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY - 30 + "px");
    })
    .on("mouseleave", function () {
      d3.select(this).transition().style("opacity", 1);
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
    .domain([minCategoryValue, maxCategoryValue]);

  var yAxis = d3.axisLeft().scale(y).ticks(10);

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

function showData(data) {
  const [
    mapInfo,
    dropOutRate,
    literacyRate,
    schoolBoysToilet,
    schoolComputer,
    schoolDrinkingWater,
    schoolElectricity,
    schoolGirlsToilet,
    stateBudget,
    trainedTeachers,
    grossEnrollment
  ] = data;

  dataMap = {
    dropOutRate,
    literacyRate,
    schoolBoysToilet,
    schoolComputer,
    schoolDrinkingWater,
    schoolElectricity,
    schoolGirlsToilet,
    stateBudget,
    trainedTeachers,
    grossEnrollment
  };

  let valueMapContainer = d3.select("#valueMap");
  let choroplethMapContainer = d3.select("#choroplethMap");

  let category = document.querySelector("#category").value;

  showValueMap(mapInfo, category, dataMap[category], valueMapContainer);
  showChoroplethMap(
    mapInfo,
    category,
    dataMap[category],
    choroplethMapContainer
  );

  document.querySelector("#category").addEventListener("change", (event) => {
    category = event.target.value;

    showValueMap(mapInfo, category, dataMap[category], valueMapContainer);
    showChoroplethMap(
      mapInfo,
      category,
      dataMap[category],
      choroplethMapContainer
    );
  });
}
