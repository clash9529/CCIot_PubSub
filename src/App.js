import React from "react";
import { withAuthenticator } from "aws-amplify-react";
import "./App.css";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { useState } from "react";

import MQTTConnect from "./MQTTConnect";
import Homepage from "./Homepage";

import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

function App(props) {
  // const [startDate, setStartDate] = useState(new Date());
  // const [refresh, setRefresh] = useState(false);

  // const handleRefresh = () => {
  //   setRefresh(!refresh);
  // };

  return (
    <div className="App" style={{height: "1000px"}}>
      <div className="container">
        <div className="flex-container">
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
          <Homepage  />
          {/* <div className='date-container'>
            <button onClick={handleRefresh}>Refresh</button>
            <div className='date-picker'>
              Date:
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div> */}
        </div> <br/> <br/>
        <MQTTConnect />
      </div>
    </div>
  );
}

export default withAuthenticator(App, true);
