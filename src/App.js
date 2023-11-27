import React from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import './App.css';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';

import MQTTConnect from './MQTTConnect'
import Homepage from './Homepage'

function App(props) {

  const [startDate, setStartDate] = useState(new Date())

  return (
    <div className='App'>
      <div className='container'>
        <div className='flex-container'>
          <Homepage date={startDate}/>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            on
          />
        </div>
        <MQTTConnect />
      </div>
    </div>
  );

}

export default withAuthenticator(App, true);
