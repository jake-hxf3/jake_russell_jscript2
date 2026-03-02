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

function appendDrag(e) {
    e.preventDefault();

    //prevents double drops if there is already a label
    if(this.firstElementChild) {
        return;
    }
   
    this.appendChild(dragItem);
    this.classList.remove("bg-drag");
    console.log("dropped");
}

// adds highlight to an empty drop zone on dragenter
// removes it on dragleave
function changeColor(e) {
    let itemNumber = this.childElementCount;
    if((itemNumber == 0) || (e == "dragleave")){
        this.classList.toggle("bg-drag");
    } 
}

function resetLabels() {
    const diagLabel = document.querySelectorAll("#diagram .label-title");
    console.log(labelZone);
    diagLabel.forEach((elem) => {
        labelZone.appendChild(elem);
    })
}

// Event Listener
label.forEach((elem) => {
    elem.addEventListener("dragstart", dragStart);
    elem.addEventListener("dragend", visibleDrag);    
});

dropZone.forEach((elem) => {
    elem.addEventListener("dragover", dragOver);
    elem.addEventListener("drop", appendDrag); 
    elem.addEventListener("dragenter", changeColor);
    elem.addEventListener("dragleave", changeColor);
});

button.addEventListener("click", resetLabels);
