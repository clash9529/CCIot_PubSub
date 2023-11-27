import React from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import './App.css';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';

import MQTTConnect from './MQTTConnect'
import Homepage from './Homepage'

function App(props) {

  const [ startDate, setStartDate ] = useState(new Date())

  return (
    <div className="App">
      <Homepage/>
      <div className='container'>
        <div className='flex-container'>
          <MQTTConnect />
          <DatePicker 
            selected={startDate} 
            onChange={(date) => setStartDate(date)}
          />
        </div>
      </div>
    </div>
  );

}

export default withAuthenticator(App, true);
