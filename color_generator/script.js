const body = document.querySelector("body");
const bgHexCodeSpanElement = document.querySelector("#bg-hex-code");

const getHex = () => Math.floor(Math.random() * 16).toString(16); // toString(16) makes it a hexadecimal

function changeBackgroundColor() {
  const color = "#" + Array.from({ length: 6 }).map(getHex).join("");
  bgHexCodeSpanElement.innerText = color;
  body.style.backgroundColor = color;
}

const btn = document.querySelector("#btn");

btn.onclick = changeBackgroundColor;