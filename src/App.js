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

const operators = ["+", "-", "%", "÷", "x"];

function App() {
  const [displayValue, setDisplayValue] = useState("0");

  const handleClick = (e) => {
    const value = e.target.innerText;
    if (displayValue === "0" && operators.includes(value)) {
      return;
    }
    const lastCharacter = displayValue.slice(
      displayValue.length - 1,
      displayValue.length
    );
    if (operators.includes(lastCharacter) && operators.includes(value)) {
      setDisplayValue(displayValue.slice(0, displayValue.length - 1) + value);
      return;
    }

    if (value === "AC") {
      setDisplayValue("0");
    } else if (value === "+/-") {
      setDisplayValue((prev) =>
        prev.startsWith("-") ? prev.slice(1) : "-" + prev
      );
    } else if (value === "=" || value === "%") {
      try {
        const fullExpression = displayValue
          .replaceAll("x", "*")
          .replaceAll("÷", "/");

        const result =
          value === "%" ? eval(fullExpression + "/100") : eval(fullExpression);
        setDisplayValue(result.toString());
      } catch (error) {
        setDisplayValue("Error");
      }
    } else if (value === ["÷", "x", "-", "+"].includes(value)) {
      if (displayValue !== "0" && displayValue !== "Error") {
        setDisplayValue("0");
      }
    } else {
      setDisplayValue((prev) => (prev === "0" ? value : prev + value));
    }
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
