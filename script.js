const checkBtn = document.getElementById("check-btn");
let result;
let textInput;

function getTextValue() {
  textInput = document.getElementById("text-input").value;
  checkPalindrome();
}

function checkPalindrome() {
  textLower = textInput.toLowerCase().replace(/[^\w\s]|\s/g, "");
  const textReverse = textLower.split("").reverse().join("");

  if (textLower === textReverse) {
    result = document.getElementById("result").innerHTML = `${textInput} is a palidrome`;
  } else {
    result = document.getElementById("result").innerHTML = `${textInput} is NOT a palidrome`;
    
  }
}

checkBtn.addEventListener("click", getTextValue);
