import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js'
import AWS from "aws-sdk";

export default function Homepage({ date, refresh }) {

  AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  });

  const S3_BUCKET = process.env.REACT_APP_AWS_S3_BUCKET_NAME + "-bucket";
  const URL_EXPIRATION_TIME = 3600; 
  
  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: process.env.REACT_APP_AWS_REGION,
  });

  const [ plot, setPlot ] = useState(0)

  useEffect(() => {
    console.log(`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`);
    let currentDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    myBucket.getSignedUrl(
      "getObject",
      {
        Key: `${currentDate}.json`,
        Expires: URL_EXPIRATION_TIME,
      },
      (err, url) => {
        fetch(url)
          .then((response) => response.json())
          .then((data) => setPlot(data))
          .catch((err) => {
            console.error("Error fetching json file:", err)
            setPlot("")
          });
      }
    );
  }, [date, refresh])

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

