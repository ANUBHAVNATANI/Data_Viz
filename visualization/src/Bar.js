import React, { useEffect } from "react";
import * as d3 from "d3";

const bodyHeight = 400;
const bodyWidth = 400;

function App() {
  useEffect(() => {
    createChart();
  }, []);

  function showData(mapInfo) {
    let projection = d3.geoMercator();
    let;
  }

  const createChart = () => {
    let container = d3.select("#select");
    d3.json("/data/india.topo.json").then(showData);
  };

  return (
    <div>
      <svg id="container" height="400" width="400"></svg>
    </div>
  );
}

export default App;
