import React, { useEffect, useState } from "react";

function Calculator({ result, setResult }) {
  let operators = { add: "+", minus: "-", divide: "/", multiply: "*" };

  const [operatorUsed, setOperatorUsed] = useState(false);
  const [firstNumber, setFirstNumber] = useState("");
  const [operator, setOperator] = useState("");
  const [secondNumber, setSecondNumber] = useState("");

  function checkOperator(element) {
    return Object.keys(operators).includes(element.id);
  }

  function checkDot(element) {
    return element.id == "dot";
  }

  function updateResult() {
    console.log(
      `firstNumber: ${firstNumber}, operator: ${operator}, secondNumber: ${secondNumber}`
    );
    setResult(firstNumber + " " + operator + " " + secondNumber);
    if (result.split("").length > 11) {
      // result.style.font_size = "1rem";
    }
  }

  function checkSpecial(element) {
    let className = ["weird", "two"];
    let count = 0;
    className.forEach((name) => {
      if (element.classList.contains(name)) {
        count += 1;
      }
    });
    return !count == 0;
  }

  function reset() {
    setOperatorUsed(false);
    setFirstNumber("");
    setOperator("");
    setSecondNumber("");
  }

  function evaluateSpecial(element) {
    let special = element.textContent;
    switch (special) {
      case "=":
        let final = eval(result.textContent);
        setResult(final);
        reset();
        setFirstNumber(final);
        updateResult();
        break;
      case "RESET":
        reset();
        setResult("");
        updateResult();

        break;
      case "DEL":
        let text = result.textContent.split(" ").filter(Boolean);
        let deleted;

        if (text.length == 1) {
          if (typeof parseInt(text[0]) == "number") {
            deleted = text[0].split("");
            deleted.pop();
            setFirstNumber(deleted.join(""));
          } else {
            setFirstNumber("");
          }
          updateResult();
        } else if (text.length == 3) {
          if (typeof parseInt(text[2]) == "number") {
            deleted = text[2].split("");
            deleted.pop();
            setSecondNumber(deleted.join(""));
          } else {
            setSecondNumber("");
          }
          updateResult();
        } else if (text.length == 2) {
          deleted = text[1].split("");
          let done = deleted.pop();
          if (Object.values(operators).includes(done)) {
            setFirstNumber(firstNumber.trim());
            setOperator("");
            setSecondNumber("");
            updateResult();
          }
        }
        break;
    }
  }
  useEffect(() => {
    const buttons = document.querySelectorAll("button");
    buttons.forEach((element, index) => {
      element.addEventListener("click", () => {
        if (checkSpecial(element)) {
          return evaluateSpecial(element);
        } else if (checkOperator(element)) {
          if (operatorUsed) {
            setOperator("");
          }
          const op = operators[element.id];
          setOperator(op);
          setOperatorUsed(true);
          console.log(operator, operatorUsed);
          if (firstNumber == "") {
            setFirstNumber("0");
          }
          return updateResult();
        }
        if (operatorUsed) {
          setSecondNumber(element.innerText);
          return updateResult();
        } else {
          setFirstNumber(element.innerText);
          return updateResult();
        }
      });
    });
  }, []);

  return (
    <>
      <div className="numbers">
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button className="weird" value="special">
          DEL
        </button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button className="operator" id="add">
          +
        </button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button className="operator" id="minus">
          -
        </button>
        <button className="operator" id="dot">
          .
        </button>
        <button>0</button>
        <button className="operator" id="divide">
          /
        </button>
        <button className="operator" id="multiply">
          x
        </button>
        <button className="two weird" value="special">
          RESET
        </button>
        <button className="two extra" id="equal" value="special">
          =
        </button>
      </div>

      <div className="attribution">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
        . Coded by <a href="http://www.github.com/tib-source">tib-source</a>.
      </div>
    </>
  );
}

export default Calculator;
