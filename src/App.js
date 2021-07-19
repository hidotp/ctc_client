import React from "react";
import "./App.css";

function App() {
  const [source, setSource] = React.useState("");

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
      <img src={source} className="snap-img" alt={"snap"}></img>
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
