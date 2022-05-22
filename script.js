"use strict";
console.log("hola");

const container = document.querySelector(".container");
const btn = document.querySelector(".btn");
const divs = document.createElement("div");
divs.classList.add("divs");
divs.setAttribute("data-light", 0);

container.addEventListener("mouseover", function (e) {
  if (e.target.classList.contains("divs")) {
    e.target.classList.add("hover");

    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    console.log(randomColor);
    const light = e.target.getAttribute("data-light");
    e.target.setAttribute(`data-light`, +light + 10);
    e.target.style.backgroundColor = `hwb(205 24% ${
      20 + +e.target.dataset.light
    }%)`;
  }
});

const setContainer = function (dimension = 30) {
  container.style.gridTemplateColumns = `repeat(${dimension}, 1fr)`;
  container.innerHTML = "";
  for (let i = 0; i < dimension ** 2; i++) {
    container.appendChild(divs.cloneNode(true));
  }
};

setContainer();

btn.addEventListener("click", function () {
  const dimension = prompt("Enter dimension!");
  if (dimension > 100) {
    return alert("Dimension can't be over 100 :(");
  }
  setContainer(dimension);
});
