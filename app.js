let displayScreen = document.getElementById("display");
const buttons = document.querySelectorAll("button");
let showOnDisplay = []; //elements to show on display
let operators = ["+", "-", "*", "/"]; //+, -, x, / keys
let calculate = []; //elements to calculate
let operatorKeysCount = 0; //keeping track of operator keys

//reset the display and the calculate arrays to 0 and the operator keys track so we can start a new equation
let reset = () => {
  showOnDisplay = ["0"];
  calculate = [];
  operatorKeysCount = 0;
};
//clear the display
let clearDisplay = () => {
  displayScreen.innerHTML = "";
};

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    //check if it's operator buttons and replace one another if clicked in a row
    if (button.getAttribute("class") === "btn-operator") {
      if (showOnDisplay.length == 0) {
        showOnDisplay.push("0");
      }
      if (calculate.length == 0) {
        calculate.push("0");
      }
      if (
        button.getAttribute("id") !== "clear" ||
        button.getAttribute("id") !== "result"
      ) {
        operatorKeysCount++;
      }
      if (operatorKeysCount > 1) {
        showOnDisplay.splice(-1, 1);
      }
    } else {
      operatorKeysCount = 0;
      if (showOnDisplay[0] === "0" && showOnDisplay.length == 1) {
        showOnDisplay = [];
        clearDisplay();
      }
    }
    console.log(operatorKeysCount);
    let result;

    //show things on display and add them to the calculate array
    let keyValue = 0;
    let keyID = button.getAttribute("id");
    switch (keyID) {
      case "add":
        keyValue = "+";
        break;
      case "subtract":
        keyValue = "-";
        break;
      case "divide":
        keyValue = "/";
        break;
      case "multiply":
        keyValue = "*";
        break;
      case "dot":
        if (showOnDisplay.length == 0) {
          showOnDisplay.push("0");
        }
        if (calculate.length == 0) {
          calculate.push("0");
        }
        keyValue = ".";
        break;
      case "result":
        result = eval(calculate.join(""));
        break;
      default:
        keyValue = button.innerHTML;
        break;
    }
    if (button.getAttribute("id") !== "result") {
      showOnDisplay.push(button.innerHTML);
      calculate.push(keyValue);
    }

    //what happens when you click =
    if (button.getAttribute("id") === "result") {
      clearDisplay();
      //if the = key is pressed several times on a row it will display 0
      if (calculate.length == 0 || showOnDisplay.length == 0) {
        displayScreen.innerHTML = "0";
      } else {
        //check if the last key pressed is an operator and if so add the number 0 after that
        let lastElement = calculate[calculate.length - 1];
        console.log("calculate array: " + calculate);
        console.log("last element on calculate: " + lastElement);
        for (let i = 0; i < operators.length; i++) {
          if (lastElement === operators[i]) {
            calculate.push("0");
            console.log("calculate + 0 at the end: " + calculate.join(""));
          }
        }
        //turn the calculate array into a math expression and show its result on the display

        displayScreen.innerHTML = result;
        calculate = [result];
        showOnDisplay = [];
        operatorKeysCount--;
      }
    }
    if (result) {
      console.log("the latest result: " + result);
    }
    showOnDisplay.push(result);
    console.log("clicked key: " + keyValue);
    console.log("display: " + showOnDisplay);
    console.log("calculando:" + calculate.join(""));
    displayScreen.innerHTML = showOnDisplay.join("");

    //clear display and calculate array
    if (button.getAttribute("id") === "clear") {
      displayScreen.innerHTML = "0";
      //reset the display and the calculate arrays so we can start a new equation
      reset();
    }
  });
});
