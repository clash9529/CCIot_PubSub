import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});

const S3_BUCKET = process.env.REACT_APP_AWS_S3_BUCKET_NAME + "-bucket";
const URL_EXPIRATION_TIME = 3600; // in seconds

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: process.env.REACT_APP_AWS_REGION,
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
  var listofDays = [];

  var options = [{ day: "numeric" }, { month: "numeric" }, { year: "numeric" }];
  var joined = join(new Date(), options, "-");

  var tdy = new Date();

  console.log(S3_BUCKET);

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
        Key: joined + ".json",
        Expires: URL_EXPIRATION_TIME,
      },
      (err, url) => {
        console.log(url);
        console.log(err);
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
        Key: event.target.value + ".json",
        Expires: URL_EXPIRATION_TIME,
      },
      (err, url) => {
        console.log(url);
        console.log(err);
        fetch(url)
          .then((response) => response.json())
          .then((data) => setPlot(data))
          .catch((err) => {
            console.error("Error fetching json file:", err);
            setPlot("");
          });
        return url; // API Response Here
      }
    );
  }

  return (
    <div style={{width:"100%", alignItems:"center"}}>
      <div>
        <Plot
          style={{ width: "50%", height: "500px" }}
          data={plot.data}
          layout={plot.layout}
        />
      </div>
      <div style={{textAlign: 'center'}}>
        Select Date:
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
    </div>
  );
}
