import React from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import logo from './logo.svg';
import './App.css';

import MQTTConnect from './MQTTConnect'
import Homepage from './Homepage'

function App(props) {

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </header>
      <Homepage/>
      <br/>
      <MQTTConnect />
      {/* <MQTTDisplay {...props} /> */}
      <br/>
    </div>
  );

}

export default withAuthenticator(App, true);
