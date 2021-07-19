import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [source, setSource] = useState(initialState);

  const sendData = () => {
    console.log("aaaaa");
  };

  const handleCapture = target => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        setSource(newUrl);
      }
    }
  };

  return (
    <div className="container">
      <img src={source} alt={"snap"} className={classes.img}></img>
      <div onClick={sendData} className="button">
        click mee!
      </div>
      <input
        accept="image/*"
        id="icon-button-file"
        type="file"
        capture="environment"
        onChange={e => handleCapture(e.target)}
      />
    </div>
  );
}

export default App;
