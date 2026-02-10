console.log("JavaScript File is linked");

// variables
const dropZone = document.querySelectorAll("#diagram > div");
const label = document.querySelectorAll(".label-title");
const labelZone = document.querySelector("#labels");
const button = document.querySelector("#reset-btn");
let dragItem = null;

console.log(dropZone);
console.log(label);

// functions
function dragStart() {
   dragItem = this;
   setTimeout(visibleDrag, 0);
}

function visibleDrag() {
    dragItem.classList.toggle("no-display");
}

function dragOver(e) {
    e.preventDefault();
}

function appendDrag() {
    this.appendChild(dragItem);
}

// Event Listener
label.forEach((elem) => {
    elem.addEventListener("dragstart", dragStart);
    elem.addEventListener("dragend", visibleDrag);    
});

dropZone.forEach((elem) => {
    elem.addEventListener("dragover", dragOver);
    elem.addEventListener("drop", appendDrag); 
});