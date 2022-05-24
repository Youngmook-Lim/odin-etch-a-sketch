"use strict";

const container = document.querySelector(".container");
const btnDim = document.querySelector(".btn-dim");
const btnBasic = document.querySelector(".btn-basic");
const btnRandom = document.querySelector(".btn-random");
const btnClear = document.querySelector(".btn-clear");
const colorPicker = document.querySelector(".color");
const DEFAULTCOLOR = { h: 205, s: 58, l: 57 };
let CURRENTCOLOR = DEFAULTCOLOR;
let basic = 1;
let mouseDown = false;
document.body.onmousedown = () => {
  mouseDown = true;
};
document.body.onmouseup = () => {
  mouseDown = false;
};

const dim = document.querySelector(".dimensions");

const randomRgbaString = function () {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  return [r, g, b];
};

const hexToHSL = function (hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  let r = parseInt(result[1], 16);
  let g = parseInt(result[2], 16);
  let b = parseInt(result[3], 16);
  (r /= 255), (g /= 255), (b /= 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;
  if (max == min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  s = s * 100;
  s = Math.round(s);
  l = l * 100;
  l = Math.round(l);
  h = Math.round(360 * h);

  const HSL = new Object();
  HSL["h"] = h;
  HSL["s"] = s;
  HSL["l"] = l;
  return HSL;
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

const setCurrentColor = function (e) {
  const color = e.target.value;
  const newColor = hexToHSL(color);
  CURRENTCOLOR = newColor;
};

colorPicker.addEventListener("change", setCurrentColor);

const changeColor = function (e) {
  if (e.type === "mouseover" && !mouseDown) return;
  // console.log(e.type);
  if (e.target.classList.contains("divs")) {
    // e.target.classList.add("hover");
    const light = e.target.getAttribute("data-light");
    let h;
    let s;
    let l;

    if (basic === 0) {
      if (e.target.getAttribute("data-light") === "0") {
        const rgb = randomRgbaString();
        const hsl = RGBToHSL(rgb[0], rgb[1], rgb[2]);
        e.target.setAttribute("data-h", hsl[0]);
        e.target.setAttribute("data-s", hsl[1]);
        e.target.setAttribute("data-l", hsl[2]);
      }
      h = e.target.getAttribute("data-h");
      s = e.target.getAttribute("data-s");
      l = e.target.getAttribute("data-l");
    }

    e.target.setAttribute(`data-light`, +light + 5);
    e.target.style.backgroundColor =
      basic === 0
        ? `hsl(${h}, ${s}%, ${l - +e.target.dataset.light}%)`
        : `hsl(${CURRENTCOLOR.h}, ${CURRENTCOLOR.s}%, ${
            CURRENTCOLOR.l - +e.target.dataset.light
          }%)`;
  }
};

const setContainer = function (dimension = 16) {
  container.style.gridTemplateColumns = `repeat(${dimension}, 1fr)`;
  container.innerHTML = "";
  for (let i = 0; i < dimension ** 2; i++) {
    const divs = document.createElement("div");
    divs.classList.add("divs");
    container.addEventListener("mouseover", changeColor);
    container.addEventListener("mousedown", changeColor);
    divs.setAttribute("data-light", 0);
    container.appendChild(divs);
  }
  dim.textContent = `${dimension} x ${dimension}`;
};

btnDim.addEventListener("click", function () {
  const dimension = prompt("Enter dimension!");
  if (!dimension) return;
  if (isNaN(+dimension)) return alert("Dimension can only be a number!");
  if (dimension > 100) {
    return alert("Dimension can't be over 100 :(");
  }
  setContainer(dimension);
});

btnBasic.addEventListener("click", function () {
  [...document.getElementsByClassName("divs")].forEach((div) => {
    div.setAttribute("data-light", 0);
    div.classList.remove("hover");
    div.removeAttribute("data-h");
    div.removeAttribute("data-s");
    div.removeAttribute("data-l");
    div.style = "";
  });
  basic = 1;
  btnRandom.classList.remove("active-btn");
  btnBasic.classList.add("active-btn");
});

btnRandom.addEventListener("click", function () {
  [...document.getElementsByClassName("divs")].forEach((div) => {
    div.setAttribute("data-light", 0);
    div.classList.remove("hover");
    div.removeAttribute("data-h");
    div.removeAttribute("data-s");
    div.removeAttribute("data-l");
    div.style = "";
  });
  basic = 0;
  btnBasic.classList.remove("active-btn");
  btnRandom.classList.add("active-btn");
});

btnClear.addEventListener("click", function () {
  setContainer();
});

window.onload = () => {
  setContainer();
};
