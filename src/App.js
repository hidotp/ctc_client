import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const sendData = () => {
    console.log("aaaaa")
  }


  return (
    <div className="container">
      <div onClick={sendData} className="button">
        click mee!
      </div>
    </div>
  );
}

export default App;
