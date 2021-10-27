import React from "react";

function Result({ result, getResult }) {
  return (
    <div className="result">
      <h1 id="display" ref={result}>
        {getResult() ? getResult() : 0}
      </h1>
    </div>
  );
}

export default Result;
