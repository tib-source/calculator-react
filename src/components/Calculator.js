import { findByPlaceholderText } from "@testing-library/react";

function Calculator({ setResult, result }) {
  const operators = { add: "+", subtract: "-", divide: "/", multiply: "*" };

  // let operatorUsed = false;
  // let firstNumber = "0";
  // let operator = "";
  // let secondNumber = "";
  // let firstDotUsed = false;
  // let secondDotUsed = false;

  let current = "0";
  let dotUsed = false;
  let operator = "";
  let formula = [];

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
    // setResult(firstNumber + " " + operator + " " + secondNumber);
    setResult(formula.join(" "));
  }
  function checkSpecial(element) {
    return element.value === "special";
  }

  function reset(all = false) {
    // operatorUsed = false;
    // firstNumber = "0";
    // operator = "";
    // secondNumber = "";
    // firstDotUsed = false;
    // secondDotUsed = false;
    current = "0";
    dotUsed = false;
    operator = "";
    if (all) {
      formula = [];
    }
  }

  function evaluateSpecial(element) {
    let special = element.textContent;
    switch (special) {
      case "=":
        let final = eval(result());
        setResult(final);
        reset(true); // resets everything
        current = final;
        if (!Number.isInteger(current)) {
          dotUsed = true;
        }
        formula.push(current);
        updateResult();
        break;
      case "AC":
        reset(true);
        setResult("");
        formula.push(current);
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
  // tried to implement recussion but failed LOL
  // const getPreviousOperators = () => {
  //   let copy = [...formula];
  //   let ops = [];
  //   function popper(list) {
  //     let cur = list.pop();
  //     if (typeof cur === "number") {
  //       return null;
  //     } else {
  //       ops.push(cur);
  //       popper(list);
  //     }
  //   }
  //   try {
  //     popper(copy);
  //   } catch (e) {}
  //   return ops;
  // };
  const checkLastButton = () => {
    const meow = [...formula].pop();
    console.log("RUNNING");
    return parseInt(meow);
  };
  const handleButton = (element) => {
    console.log(formula);
    element = element.target;
    // Check if the button pressed is a special butotn
    if (checkSpecial(element)) {
      return evaluateSpecial(element);
    }
    // Check if the button pressed is an operator
    else if (checkOperator(element)) {
      // check if the current number is an empty string
      if (current === "") {
        current = "0";
      }
      operator = element.innerText;
      // Check if the previous input is an operator
      const prev = [...formula];
      const prevOp = [...formula].pop();
      if (Object.values(operators).includes(prevOp)) {
        if (prevOp === "-") {
          formula.pop();
          const before = formula.pop();
          if (!Object.values(operators).includes(before)) {
            formula.push(before);
          }
          formula.push(operator);
          reset(false); // resets everything except for the formula
          return updateResult();
        }
        if (operator === "-") {
          formula.push(operator);
          reset(false); // resets everything except for the formula
          return updateResult();
        }
        formula.pop();
        formula.push(operator);
        reset(false); // resets everything except for the formula
        return updateResult();
      }
      // append the numbers prior to the operator to the formula list
      formula.push(operator);
      reset(false); // resets everything except for the formula
      return updateResult();
    }
    // if the button is a number
    else {
      // remove the default set 0
      let cur = [...formula].pop();
      if (cur === "0") {
        formula.pop();
      }
      // check if current is 0 and overwrite
      if (current === "0") {
        current = element.innerText;
        formula.push(current);
        return updateResult();
      } else {
        //Check if previous input was also a number and if so append current input to that
        // Check if the button is a dot
        if (checkDot(element)) {
          console.log(element, "its a dot");
          // Check if the demial has already been used
          if (dotUsed) {
            return null; // do nothing
          } else {
            if (checkLastButton()) formula.pop();
            current += element.innerText;
            dotUsed = true; // self explanatory
            formula.push(current);
            return updateResult();
          }
        }
        if (checkLastButton()) {
          let cur = formula.pop();
          current += element.innerText;
          formula.push(current);
          updateResult();
        } else {
          current += element.innerText;
          formula.push(current);
          return updateResult();
        }
      }
    }
    //   if (checkSpecial(element)) {
    //     return evaluateSpecial(element);
    //   } else if (checkOperator(element)) {
    //     if (operatorUsed) {
    //       operator = "";
    //     }
    //     const op = operators[element.id];
    //     operator = op;
    //     operatorUsed = true;
    //     console.log(operator, operatorUsed);
    //     if (firstNumber === "") {
    //       firstNumber = "0";
    //     }
    //     return updateResult();
    //   }

    //   if (operatorUsed) {
    //     if (checkDot(element)) {
    //       if (secondDotUsed) {
    //         return null;
    //       } else {
    //         secondDotUsed = true;
    //       }
    //     }
    //     if (secondNumber === "0") {
    //       secondNumber = element.innerText;
    //       return updateResult();
    //     }
    //     secondNumber += element.innerText;
    //     return updateResult();
    //   } else {
    //     if (
    //       (firstNumber === "0" && !checkDot(element)) ||
    //       errors.includes(firstNumber)
    //     ) {
    //       firstNumber = element.innerText;
    //       return updateResult();
    //     }
    //     if (checkDot(element)) {
    //       if (firstDotUsed) {
    //         return null;
    //       } else {
    //         firstDotUsed = true;
    //       }
    //     }
    //     firstNumber += element.innerText;
    //     return updateResult();
    //   }
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
          *
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
