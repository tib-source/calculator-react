function Calculator({ setResult, result }) {
  const operators = { add: "+", subtract: "-", divide: "/", multiply: "*" };

  let operatorUsed = false;
  let firstNumber = "0";
  let operator = "";
  let secondNumber = "";
  let firstDotUsed = false;
  let secondDotUsed = false;
  function checkOperator(element) {
    return Object.keys(operators).includes(element.id);
  }

  function checkDot(element) {
    return element.id === "decimal";
  }

  function updateResult() {
    // console.log(
    //   `firstNumber: ${typeof firstNumber}, operator: ${operator}, secondNumber: ${secondNumber}`
    // );
    // if (result.split("").length > 11) {
    //   result.style.font_size = "1rem";
    // }
    setResult(firstNumber + " " + operator + " " + secondNumber);
  }

  function checkSpecial(element) {
    return element.value === "special";
  }

  function reset() {
    operatorUsed = false;
    firstNumber = "0";
    operator = "";
    secondNumber = "";
    firstDotUsed = false;
    secondDotUsed = false;
  }

  function evaluateSpecial(element) {
    let special = element.textContent;
    switch (special) {
      case "=":
        let final = eval(result());
        console.log(final, result.textContent);
        setResult(final);
        reset();
        firstNumber = final;
        if (!Number.isInteger(firstNumber)) {
          firstDotUsed = true;
        }
        updateResult();
        break;
      case "AC":
        reset();
        setResult("");
        updateResult();

        break;
      // case "AC":
      //   let text = result.textContent.split(" ").filter(Boolean);
      //   let deleted;

      //   if (text.length === 1) {
      //     if (typeof parseInt(text[0]) == "number") {
      //       deleted = text[0].split("");
      //       deleted.pop();
      //       firstNumber = deleted.join("");
      //     } else {
      //       firstNumber = "";
      //     }
      //     updateResult();
      //   } else if (text.length === 3) {
      //     if (typeof parseInt(text[2]) == "number") {
      //       deleted = text[2].split("");
      //       deleted.pop();
      //       secondNumber = deleted.join("");
      //     } else {
      //       secondNumber = "";
      //     }
      //     updateResult();
      //   } else if (text.length === 2) {
      //     deleted = text[1].split("");
      //     let done = deleted.pop();
      //     if (Object.values(operators).includes(done)) {
      //       firstNumber = firstNumber.trim();
      //       operator = "";
      //       secondNumber = "";
      //       updateResult();
      //     }
      //   }
      //break;
      default:
        break;
    }
  }
  const errors = [Infinity, undefined, NaN];
  const handleButton = (element) => {
    element = element.target;
    if (checkSpecial(element)) {
      return evaluateSpecial(element);
    } else if (checkOperator(element)) {
      if (operatorUsed) {
        operator = "";
      }
      const op = operators[element.id];
      operator = op;
      operatorUsed = true;
      console.log(operator, operatorUsed);
      if (firstNumber === "") {
        firstNumber = "0";
      }
      return updateResult();
    }

    if (operatorUsed) {
      if (checkDot(element)) {
        if (secondDotUsed) {
          return null;
        } else {
          secondDotUsed = true;
        }
      }
      if (secondNumber === "0") {
        secondNumber = element.innerText;
        return updateResult();
      }
      secondNumber += element.innerText;
      return updateResult();
    } else {
      if (
        (firstNumber === "0" && !checkDot(element)) ||
        errors.includes(firstNumber)
      ) {
        firstNumber = element.innerText;
        return updateResult();
      }
      if (checkDot(element)) {
        if (firstDotUsed) {
          return null;
        } else {
          firstDotUsed = true;
        }
      }
      firstNumber += element.innerText;
      return updateResult();
    }
  };

  return (
    <>
      <div className="numbers">
        <button onClick={handleButton} id="seven">
          7
        </button>
        <button onClick={handleButton} id="eight">
          8
        </button>
        <button onClick={handleButton} id="nine">
          9
        </button>
        <button
          onClick={handleButton}
          className="weird"
          id="clear"
          value="special"
        >
          AC
        </button>
        <button onClick={handleButton} id="four">
          4
        </button>
        <button onClick={handleButton} id="five">
          5
        </button>
        <button onClick={handleButton} id="six">
          6
        </button>
        <button onClick={handleButton} className="operator" id="add">
          +
        </button>
        <button onClick={handleButton} id="one">
          1
        </button>
        <button onClick={handleButton} id="two">
          2
        </button>
        <button onClick={handleButton} id="three">
          3
        </button>
        <button onClick={handleButton} className="operator" id="subtract">
          -
        </button>
        <button onClick={handleButton} className="operator" id="decimal">
          .
        </button>
        <button onClick={handleButton} id="zero">
          0
        </button>
        <button onClick={handleButton} className="operator" id="divide">
          /
        </button>
        <button onClick={handleButton} className="operator" id="multiply">
          x
        </button>
        <button
          onClick={handleButton}
          className="two extra"
          id="equals"
          value="special"
        >
          =
        </button>
      </div>

      <div className="attribution">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge">
          Frontend Mentor
        </a>
        . Coded by <a href="http://www.github.com/tib-source">tib-source</a>.
      </div>
    </>
  );
}

export default Calculator;
