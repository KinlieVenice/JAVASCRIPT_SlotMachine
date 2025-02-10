const checkBtn = document.getElementById("check-btn");
let result;
let textInput;

function getTextValue() {
  textInput = document.getElementById("text-input").value;
  checkPalindrome();
}

function checkPalindrome() {
  let textLower = textInput.toLowerCase().replace(/[^\w\s]|[_]|\s/g, "");
  const textReverse = textLower.split("").reverse().join("");

  console.log(textLower);

  if (textInput === "") {
    alert("Please input a value");
  } else if (textLower === textReverse) {
    result = document.getElementById(
      "result"
    ).innerHTML = `${textInput} is a palindrome`;
  } else if (textLower !== textReverse) {
    result = document.getElementById(
      "result"
    ).innerHTML = `${textInput} is NOT a palindrome`;
  }
}

checkBtn.addEventListener("click", getTextValue);
