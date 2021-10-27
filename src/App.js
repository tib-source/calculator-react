import "./styles/style.css";
import { useState, useRef } from "react";
import Header from "./components/Header";
import Result from "./components/Result";
import Calculator from "./components/Calculator";
import { useEffect } from "react";
function App() {
  // const result = document.querySelector(".result");
  // styling
  // useEffect(() => {
  //   const buttons = document.querySelectorAll("button");
  //   const resultHTML = document.querySelector(".result");
  //   let weird = document.querySelectorAll(".weird");
  //   let special = document.querySelector("#equal");
  //   let calculator = document.querySelector("#calc");
  //   let slider = document.querySelector(".slider");
  //   let body = document.querySelector("body");
  //   let numbers = document.querySelector(".numbers");
  //   console.log(resultHTML, calculator, weird, body);
  //   let previousTheme = "";

  //   let radio = document.querySelectorAll("input[type=radio]");
  //   updateTheme("theme1", true);
  //   radio.forEach((toggle) => {
  //     toggle.addEventListener("click", () => {
  //       if (toggle.checked) {
  //         let theme = "theme";
  //         theme += toggle.value;
  //         updateTheme(theme);
  //       }
  //     });
  //   });

  //   function cleanClasses() {
  //     resultHTML.className = "result";
  //     buttons.forEach((button) => {
  //       let arr = button.classList;
  //       if (arr.contains("opeator")) {
  //         return (button.classList = ["operator"]);
  //       } else if (arr.contains("two")) {
  //         button.classList.remove(...short(previousTheme, "equals"));
  //         return button.classList.remove(...short(previousTheme, "worded"));
  //       } else if (arr.contains("weird")) {
  //         return (button.classList = ["weird"]);
  //       } else {
  //         return (button.classList = []);
  //       }
  //     });
  //     calculator.className = "calculator";
  //     slider.className = "slider";
  //     body.className = "";
  //     numbers.className = "numbers";
  //   }

  //   function short(theme, text = "none") {
  //     if (text == "none") {
  //       return [`${theme}`];
  //     } else {
  //       return [`${theme}`, `${theme}-${text}`];
  //     }
  //   }

  //   function updateTheme(curr, first = false) {
  //     if (!first) {
  //       cleanClasses();
  //     }
  //     body.classList.add(...short(curr, "main"));
  //     calculator.classList.add(...short(curr, "text"));
  //     numbers.classList.add(...short(curr, "toggle"));
  //     slider.classList.add(...short(curr, "toggle"));
  //     resultHTML.classList.add(...short(curr, "screen"));
  //     special.classList.add(...short(curr, "equals"));
  //     buttons.forEach((button) => {
  //       if (button.value == "") {
  //         button.classList.add(...short(curr, "key"));
  //       } else {
  //         console.log(button.classList.contains("hello"), "meow");
  //       }
  //     });
  //     weird.forEach((elem) => elem.classList.add(...short(curr, "worded")));
  //     previousTheme = curr;
  //   }
  // }, []);
  const result = useRef(null);
  const handleResult = (value) => {
    result.current.textContent = value;
  };

  const getResult = () => {
    try {
      return result.current.textContent;
    } catch (e) {
      return "0";
    }
  };
  return (
    <div className="App">
      <section className="calculator" id="calc">
        <Header />
        <Result result={result} getResult={getResult} />
        <Calculator setResult={handleResult} result={getResult} />
      </section>
    </div>
  );
}

export default App;
