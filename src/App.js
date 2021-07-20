import React from "react";
import "./App.css";
import ColorThief from "colorthief";

function App() {
  const [source, setSource] = React.useState("");

  const [hexString, setHexString] = React.useState("");
  const [palette, setPalette] = React.useState([])

  const handleCapture = target => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        setSource(newUrl);
      }
    }
  };

  const colorThing = hex => {
    return (
      <div className="color-cont">
        <div>Dominant HexColor: {hex}</div>
        <div className="color-sq" style={{ backgroundColor: hex }}></div>
      </div>
    );
  };

  const rgbToHex = ahh =>
    "#" +
    ahh
      .map(x => {
        return (+x).toString(16);
      })
      .join("");

  React.useEffect(() => {
    if (source && source !== "") {
      const img = document.querySelector("img");
      const colorThief = new ColorThief();

      if (img.complete) {
        setHexString(rgbToHex(colorThief.getColor(img)));
        setPalette(colorThief.getPalette(img,5).map(x => rgbToHex(x)))
      } else {
        img.addEventListener("load", function() {
          setHexString(rgbToHex(colorThief.getColor(img)));
          setPalette(colorThief.getPalette(img,5).map(x => rgbToHex(x)))
        });
      }
    }
  }, [source]);

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
      {colorThing(hexString)}
      {palette.map(x => colorThing(x))}
    </div>
  );
}

export default App;
