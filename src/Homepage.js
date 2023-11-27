import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js'

export default function Homepage() {

  const [ plot, setPlot ] = useState(0)

  useEffect(() => {
    fetch("https://heartmonitoring-bucket.s3.ap-south-1.amazonaws.com/27-11-2023.json")
      .then(response => response.json())
      .then(data => setPlot(data))
      .catch(err => console.error("Error fetching json file:", err))
  }, [])


  return (
    <div>
      <img
        src={'/VitalWatcher.png'}
        alt="Vital Watcher"
        style={{ width: '80px', height: '80px', position: 'absolute', top: 0, left: 0 }}
      />
      <Plot data={plot.data} layout={plot.layout}/>
    </div>
  );
}

