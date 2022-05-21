"use strict";
console.log("hola");

const container = document.querySelector(".container");

const divs = document.createElement("div");
divs.classList.add("divs");

for (let i = 0; i < 16 * 16; i++) {
  console.log(i);
  container.appendChild(divs.cloneNode(true));
}
