import React from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import './App.css';

import MQTTConnect from './MQTTConnect'
import Homepage from './Homepage';

function App(props) {

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </header>
      <br/>
      <MQTTConnect />
      <Homepage />
      {/* <MQTTDisplay {...props} /> */}
      <br/>
    </div>
  );

}

export default withAuthenticator(App, true);
