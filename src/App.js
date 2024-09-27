import "./App.css";
import { useState } from "react";
import Button from "./Button";

const buttons = [
  "AC",
  "+/-",
  "%",
  "÷",
  "7",
  "8",
  "9",
  "x",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "0",
  ".",
  "=",
];

const operators = ["+", "-", "÷", "x"];

function App() {
  const [calcBuffer, setCalcBuffer] = useState([]);
  const [displayValue, setDisplayValue] = useState("0");

  const handleClick = (e) => {
    const value = e.target.innerText;
    if (value === "AC") {
      resetCalculator();
    } else if (value === "=") {
      calculateResult();
    } else if (value === "%") {
      divideHundred();
    } else if (value === "+/-") {
      toggleSign();
    } else if (value === ".") {
      addDecimal();
    } else if (isOperator(value)) {
      addOperator(value);
    } else {
      addDigit(value);
    }
  };

  // TO reset calculator on click of AC
  const resetCalculator = () => {
    setCalcBuffer([]);
    setDisplayValue("0");
  };

  // TO add number when number button is clicked
  const addDigit = (digit) => {
    if (displayValue === "0" || isOperator(calcBuffer[calcBuffer.length - 1])) {
      setDisplayValue(digit);
    } else {
      setDisplayValue((prev) => prev + digit);
    }
    setCalcBuffer((prev) => [...prev, digit]);
  };

  // To add operatot when any symbol is clicked
  const addOperator = (operator) => {
    if (!isOperator(calcBuffer[calcBuffer.length - 1])) {
      setCalcBuffer((prev) => [...prev, operator]);
      setDisplayValue(operator);
    } else {
      const buffLen = calcBuffer.length;
      setCalcBuffer((prev) => [...prev.slice(0, buffLen - 1), operator]);
      setDisplayValue(operator);
    }
  };

  // Ro do calculations when = button clicked
  const calculateResult = () => {
    try {
      const expression = convertToStandardExpression(calcBuffer);
      const result = eval(expression);
      setDisplayValue(String(result));
      setCalcBuffer([String(result)]);
    } catch (error) {
      setDisplayValue("Error");
      setCalcBuffer([]);
      console.log(error);
    }
  };

  // to handle % button click
  const divideHundred = () => {
    try {
      const expression = convertToStandardExpression([...calcBuffer, "/100"]);
      const result = eval(expression);
      setDisplayValue(String(result));
      setCalcBuffer([String(result)]);
    } catch (error) {
      setDisplayValue("Error");
      setCalcBuffer([]);
    }
  };

  // TO handle +/- button click
  const toggleSign = () => {
    const displaylength = displayValue.length;
    const bufflength = calcBuffer.length;
    const lastInput = calcBuffer[bufflength - 1];
    if (!isNaN(lastInput)) {
      if (displayValue.slice(0, 1) !== "-") {
        // When number is positive
        setCalcBuffer((prev) => {
          const oldValue = [...prev];
          oldValue.splice(bufflength - displaylength, 0, "-");
          const newBuffer = [...oldValue];
          return newBuffer;
        });
        setDisplayValue("-" + displayValue);
      } else {
        // when number is negetive
        setCalcBuffer((prev) => {
          const oldValue = [...prev];
          oldValue.splice(bufflength - displaylength, 1);
          const newBuffer = [...oldValue];
          return newBuffer;
        });
        setDisplayValue(displayValue.slice(1, displaylength));
      }
    }
  };

  // TO handle decimal button click
  const addDecimal = () => {
    const lastInput = calcBuffer[calcBuffer.length - 1];
    if (!lastInput?.includes(".")) {
      const newValue = lastInput ? lastInput + "." : "0.";
      setCalcBuffer((prev) => [...prev.slice(0, -1), newValue]);
      setDisplayValue(newValue);
    }
  };

  // To check if clicked button is any operator or not
  const isOperator = (value) => {
    return operators.includes(value);
  };

  // to cunvert buffer to string with updated symbols
  const convertToStandardExpression = (buffer) => {
    return buffer.map((v) => (v === "x" ? "*" : v === "÷" ? "/" : v)).join("");
  };

  return (
    <div className="App">
      <div>
        <header className="App-header">
          <h1>Calculator</h1>
        </header>
      </div>
      <main className="calculator">
        <div className="display">{displayValue}</div>
        <div className="keypad">
          {buttons.map((button) => (
            <Button key={button} label={button} onClick={handleClick} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
