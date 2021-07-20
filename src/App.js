import React from "react";
import "./App.css";
import ColorThief from "colorthief";
import { gql, useMutation } from "@apollo/client";

const ADD_HEX = gql`
  mutation($input: String!) {
    addHex(input: $input)
  }
`;

function App() {
  const [source, setSource] = React.useState("");

  const [addHex] = useMutation(ADD_HEX);

  const [palette, setPalette] = React.useState([]);
  const [colorView, setColorView] = React.useState(false);

  const handleCapture = target => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        setSource(newUrl);
      }
    }
  };

  const resetAll = () => {
    setColorView(false);
    setSource("");
  };

  const colorThing = hex => {
    return (
      <div className="color-cont" style={{ backgroundColor: hex }}>
        <div
          onClick={_ => {
            console.log(hex);
            addHex({ variables: { input: hex } });
            resetAll();
          }}
        >
          {hex.toUpperCase()}
        </div>
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
        setPalette(colorThief.getPalette(img, 5).map(x => rgbToHex(x)));
        setColorView(true);
      } else {
        img.addEventListener("load", function() {
          setPalette(colorThief.getPalette(img, 5).map(x => rgbToHex(x)));
          setColorView(true);
        });
      }
    }
  }, [source]);

  return (
    <div className="container">
      {!colorView ? (
        <>
          <img src={source} className="snap-img" alt={"snap"}></img>
          <input
            accept="image/*"
            id="icon-button-file"
            type="file"
            capture="environment"
            onChange={e => handleCapture(e.target)}
          />
        </>
      ) : (
        <>
          <div className="color-header">colors</div>
          {palette.map(x => colorThing(x))}
          <div className="color-redo" onClick={resetAll}>
            redo
          </div>
        </>
      )}
    </div>
  );
}

export default App;
