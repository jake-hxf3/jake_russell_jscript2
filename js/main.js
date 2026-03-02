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

// resets game: puts the elements back to start
// reverts all style changes
function resetLabels() {
    console.log("reset button clicked");
    this.classList.add("small-btn");

    dropZone.forEach((elem) => {
        let zoneLabel = elem.firstElementChild;
        if (zoneLabel) {
            labelZone.appendChild(zoneLabel);            
        }
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
});

button.addEventListener("click", resetLabels);