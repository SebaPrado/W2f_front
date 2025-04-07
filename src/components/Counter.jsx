import React from "react";
import { notify4 } from "../notify";

function Counter({ localCounter, setLocalCounter }) {
  const subirCounter = () => {
    if (localCounter < 5) {
      setLocalCounter(localCounter + 1);
    } else {
      notify4("We apologize, selection is limited to 5 units per product.");
    }
  };

  const bajarCounter = () => {
    if (localCounter > 1) {
      setLocalCounter(localCounter - 1);
    }
  };

  const handleChange = (event) => {
    setLocalCounter(event.target.value);
  };
  return (
    <>
      <div className="p-count">
        <p className="my-3">Q U A N T I T Y</p>
        <div className=" input-group  titulo-conter">
          <span
            type="button"
            onClick={bajarCounter}
            className="material-symbols-outlined btn-outline-secondary button-counter"
          >
            remove
          </span>

          <input
            value={localCounter}
            className=" inputCounter "
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={subirCounter}
            className="material-symbols-outlined btn-outline-secondary  button-counter"
          >
            add
          </button>
        </div>
      </div>
    </>
  );
}

export default Counter;
