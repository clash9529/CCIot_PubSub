import React, { useState } from 'react';
//import downloadfromS3 from '../src/s3downloads/download';
const AWS = require('aws-sdk');
let date = "25-11-2023"
let url = "https://heartmonitoring-bucket.s3.ap-south-1.amazonaws.com/"

export default function Homepage() {

  const handleGetGraph = () => {
    // downloadfromS3();
    // const bucketName = 'heartmonitoring-bucket';
    // const objectKey = 'orange.jpeg'; // The key of the file you want to download
    // const region = 'ap-south-1'; // e.g., 'us-east-1'
    // const s3 = new AWS.S3({region:region});
    // const [imageUrl, setImageUrl] = useState(null);

    //   // Assuming your handleGetGraph function retrieves image data from S3
    //   // Replace this with your actual implementation
    //   const params = { Bucket: bucketName, Key: objectKey};
    //   s3.getObject(params, (err, data) => {
    //     if (err) {
    //       console.error('Error retrieving file:', err);
    //     } else {
    //       const contentType = data.ContentType;
    //       const base64Content = data.Body.toString('base64');
    //       const dataURI = `data:${contentType};base64,${base64Content}`;
          
    //       // Set the image URL in the component state
    //       setImageUrl(dataURI);
    //     }
    // });
  }

  return (
    <div>
        <img
        src={'/VitalWatcher.png'}
        alt="Vital Watcher"
        style={{ width: '80px', height: '80px', position: 'absolute', top: 0, left: 0 }} 
      />
      
      <select style={{ position: 'absolute', top: '300px'}}>

       <option value="Monday">Monday</option>

       <option value="Tuesday">Tuesday</option>

       <option value="Wednesday">Wednesday</option>

       <option value="Thursday">Thursday</option>

       <option value="Friday">Friday</option>

       <option value="Saturday">Saturday</option>

       <option value="Sunday">Sunday</option>

     </select>

    <div>
     
      <a href={url+date+"-"+"graph.html"} target="blank">
      <button type='button' onClick={handleGetGraph}
        >
          <h1>graph</h1>
      </button> 

      </a>
    </div>
        </div>
  );
}