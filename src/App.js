import React from "react";
import { withAuthenticator } from "aws-amplify-react";
import "./App.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

import MQTTConnect from "./MQTTConnect";
import Homepage from "./Homepage";

import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

function App(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="flex-container">
          <Homepage date={startDate} refresh={refresh}/>
          <div className='date-container'>
            <button onClick={handleRefresh}>Refresh</button>
            <div className='date-picker'>
              Date:
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                maxDate={new Date()}
              />
            </div>
          </div>
        </div> 
        <MQTTConnect />
      </div>
    </div>
  );
}

export default withAuthenticator(App, true);
