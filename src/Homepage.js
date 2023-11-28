import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: "AKIAY6F47JITDY6YNKJ7",
  secretAccessKey: "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",
});

const S3_BUCKET = "heartmonitoring-bucket";
const REGION = "ap-south-1";
const URL_EXPIRATION_TIME = 3600; // in seconds

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

function getPreviousDay(date = new Date()) {
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - 1);

  return previous;
}

function join(date, options, separator) {
  function format(option) {
    let formatter = new Intl.DateTimeFormat("en", option);
    return formatter.format(date);
  }
  return options.map(format).join(separator);
}

export default function Homepage() {
  const [plot, setPlot] = useState(0);
  const [urll, setUrll] = useState("");
  var listofDays = [];

  var options = [{ day: "numeric" }, { month: "numeric" }, { year: "numeric" }];
  var joined = join(new Date(), options, "-");

  var tdy = new Date();

  
  listofDays.push(joined);
  for (var i = 0; i < 6; i++) {
    joined = join(getPreviousDay(tdy), options, "-");
    tdy = getPreviousDay(tdy);

    listofDays.push(joined);
  }
  console.log(listofDays);

  useEffect(() => {
    myBucket.getSignedUrl(
      "getObject",
      {
        Key: joined+".json",
        Expires: URL_EXPIRATION_TIME,
      },
      (err, url) => {
        console.log(url);
        console.log(err);
        setUrll(url);
        fetch(url)
          .then((response) => response.json())
          .then((data) => setPlot(data))
          .catch((err) => console.error("Error fetching json file:", err));
        return url; // API Response Here
      }
    );
  }, []);

  function handleChange(event) {
    console.log(event.target.value);
    myBucket.getSignedUrl(
      "getObject",
      {
        Key: event.target.value+".json",
        Expires: URL_EXPIRATION_TIME,
      },
      (err, url) => {
        console.log(url);
        console.log(err);
        fetch(url)
          .then((response) => response.json())
          .then((data) => setPlot(data))
          .catch((err) => {
            console.error("Error fetching json file:", err)
            setPlot("");
          });
        return url; // API Response Here
      }
    );
  }

  return (
    <div>
      <img
        src={"/VitalWatcher.png"}
        alt="Vital Watcher"
        style={{
          width: "80px",
          height: "80px",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
      <Plot
        // style={{ width: "300px", height: "200px" }}
        data={plot.data}
        layout={plot.layout}
      />
      <select onChange={handleChange}>
        {listofDays.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}
