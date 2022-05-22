"use strict";
console.log("hola");

const container = document.querySelector(".container");
const divs = document.createElement("div");
divs.classList.add("divs");

const setContainer = function () {
  const dimension = 30;
  container.style.gridTemplateColumns = `repeat(${dimension}, 1fr)`;
  for (let i = 0; i < dimension ** 2; i++) {
    // console.log(i);
    container.appendChild(divs.cloneNode(true));
  }
};

setContainer();

container.addEventListener("mouseover", function (e) {
  console.log(e.target);
  e.target.closest(".divs").classList.add("hover");
  // e.target.style.backgroundColor = "purple";
});
