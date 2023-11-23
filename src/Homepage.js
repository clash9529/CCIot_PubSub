import React from 'react';

function Homepage() {
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
        </div>
  );
}

export default Homepage;