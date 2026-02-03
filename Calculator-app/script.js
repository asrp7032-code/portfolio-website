const display = document.getElementById("display");
const history = document.getElementById("history");

let lastInputWasOperator = false;

function appendNumber(num) {
  display.value += num;
  lastInputWasOperator = false;
}

function appendOperator(op) {
  if (display.value === "" || lastInputWasOperator) return;
  display.value += op;
  lastInputWasOperator = true;
}

function appendDot() {
  const parts = display.value.split(/[\+\-\*\/]/);
  const lastPart = parts[parts.length - 1];
  if (lastPart.includes(".")) return;
  display.value += ".";
}

function appendPercent() {
  if (display.value === "" || lastInputWasOperator) return;
  display.value += "/100";
  lastInputWasOperator = false;
}

function clearDisplay() {
  display.value = "";
  history.textContent = "";
  lastInputWasOperator = false;
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    history.textContent = display.value + " =";
    const result = Function('"use strict";return (' + display.value + ")")();
    display.value = result;
    lastInputWasOperator = false;
  } catch {
    display.value = "Error";
  }
}

/* Keyboard Support */
document.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") appendNumber(e.key);
  if (["+", "-", "*", "/"].includes(e.key)) appendOperator(e.key);
  if (e.key === ".") appendDot();
  if (e.key === "Enter") calculate();
  if (e.key === "Backspace") deleteLast();
  if (e.key === "Escape") clearDisplay();
});
