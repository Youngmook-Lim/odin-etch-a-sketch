"use strict";
console.log("hola");

const container = document.querySelector(".container");
const btn = document.querySelector(".btn");
const dim = document.querySelector(".dimensions");
const divs = document.createElement("div");
divs.classList.add("divs");
divs.setAttribute("data-light", 0);

const randomRgbaString = function () {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  return [r, g, b];
};

const RGBToHSL = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};

container.addEventListener("mouseover", function (e) {
  if (e.target.classList.contains("divs")) {
    e.target.classList.add("hover");

    if (e.target.getAttribute("data-light") === "0") {
      const rgb = randomRgbaString();
      const hsl = RGBToHSL(rgb[0], rgb[1], rgb[2]);
      console.log(hsl);
      e.target.setAttribute("data-h", hsl[0]);
      e.target.setAttribute("data-s", hsl[1]);
      e.target.setAttribute("data-l", hsl[2]);
    }
    const h = e.target.getAttribute("data-h");
    const s = e.target.getAttribute("data-s");
    const l = e.target.getAttribute("data-l");
    const light = e.target.getAttribute("data-light");
    e.target.setAttribute(`data-light`, +light + 5);
    e.target.style.backgroundColor = `hsl(${h}, ${s}%, ${
      l - +e.target.dataset.light
    }%)`;
  }
});

const setContainer = function (dimension = 16) {
  container.style.gridTemplateColumns = `repeat(${dimension}, 1fr)`;
  container.innerHTML = "";
  for (let i = 0; i < dimension ** 2; i++) {
    container.appendChild(divs.cloneNode(true));
  }
  dim.textContent = `${dimension} x ${dimension}`;
};

setContainer();

btn.addEventListener("click", function () {
  const dimension = prompt("Enter dimension!");
  if (dimension > 100) {
    return alert("Dimension can't be over 100 :(");
  }
  setContainer(dimension);
});
