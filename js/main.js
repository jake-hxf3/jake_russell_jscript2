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
}


function dragOver(e) {
    itemNumber = this.childNodes.length;
    if (itemNumber == 0) {
        e.preventDefault();
    }
}

function appendDrag() {
    this.appendChild(dragItem);
}

// Event Listener
label.forEach((elem) => {
    elem.addEventListener("dragstart", dragStart); 
});

dropZone.forEach((elem) => {
    elem.addEventListener("dragover", dragOver);
    elem.addEventListener("drop", appendDrag); 
});
