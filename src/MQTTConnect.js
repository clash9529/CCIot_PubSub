import React, { useState, useEffect } from 'react';
import Amplify, { Auth } from 'aws-amplify';
import awsmobile from './aws-exports';
import AWSIoTData from 'aws-iot-device-sdk';
import AWSConfiguration from './aws-iot-configuration.js';
Amplify.configure(awsmobile);

//######################################################################################
function MQTTConnect() {

  const [isConnected, setIsConnected] = useState(false);
  const [mqttClient, setMqttClient]   = useState();
  const [messages, setMessages]       = useState([]);

  useEffect(() => {

    connectToAwsIot();

    return () => {
      // this gets called when component is destroyed...
      //https://github.com/mqttjs/MQTT.js/blob/master/README.md#end    
    //   console.log(`Ended subscription to '${props.topic}'...`);
    };

  },[]); // the "[]" causes this to execute just once

  async function connectToAwsIot() {

    // mqtt clients require a unique clientId; we generate one below
    var clientId = 'mqtt-explorer-' + (Math.floor((Math.random() * 100000) + 1));

    // get credentials and, from them, extract key, secret key, and session token
    // Amplify's auth functionality makes this easy for us...
    var currentCredentials = await Auth.currentCredentials();
    var essentialCredentials = Auth.essentialCredentials(currentCredentials);
    
    // Create an MQTT client
    var newMqttClient = AWSIoTData.device({
      region: AWSConfiguration.region,
      host:AWSConfiguration.host,
      clientId: clientId,
      protocol: 'wss',
      maximumReconnectTimeMs: 8000,
      debug: true,
      accessKeyId:  essentialCredentials.accessKeyId,
      secretKey:    essentialCredentials.secretAccessKey,
      sessionToken: essentialCredentials.sessionToken
     });
    console.log('Subscriber trying to connect to AWS IoT for clientId:', clientId);
    // On connect, update status
    newMqttClient.on('connect', function() {
      setIsConnected(true);
      newMqttClient.subscribe(`iotproject/${clientId}`);
      console.log('Connected to AWS IoT for clientId:', clientId);
      console.log(`Subscribed to iotproject/${clientId}`);
    
    });

    // add event handler for received messages
    newMqttClient.on('message', function(topic, payload) {
      var myDate =      new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
      var newMessage =  `${myDate} - topic '${topic}' - \n ${payload.toString()}`;
      setMessages(prevMessages => [...prevMessages, newMessage]);
      console.log(newMessage);
    });

    // update state to track mqtt client
    setMqttClient(newMqttClient);

  }

  return (
    // <div className="MQTTSubscription">
    //   Topic Filter: "iotproject" ({isConnected ? "connected" : "not connected"})
    //   <br/><br/>

    //   {messages.map((message,index) => {
    //     return (
    //       <li key={index} className="markdown">
    //         {message}
    //       </li>
    //     );
    //   })}
    // </div>
    <div>
        
    </div>
  );

}

export default MQTTConnect;