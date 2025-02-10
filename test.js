while (true) {
  const prompt = require("prompt-sync")();
  const text = prompt("Input word you want to check: ").replaceAll(" ", "");
  if (text === "exit") break;

  //   let newText = [...text];
  let newText = text.split("").reverse();
  console.log(newText);

  newText = newText.join("");
  console.log(newText);

  //   let newWord = "";
  //   newText.map((letters) => {
  //     newWord += letters;
  //   });

  text === newText
    ? console.log("This is a palindrome")
    : console.log("This is NOT a palindrome");
}
