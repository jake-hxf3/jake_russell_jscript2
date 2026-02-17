console.log("JavaScript File is linked");

// variables
const dropZone = document.querySelectorAll("#diagram > div");
const label = document.querySelectorAll(".label-title");
const labelZone = document.querySelector("#labels");

const reset = document.querySelector("#reset-btn");
const submit = document.querySelector("#submit-btn");

const title = document.querySelector("#title");
const inst = document.querySelector("#inst");
const titleText = title.textContent;
const instText = inst.textContent;

let dragItem = null;
let score = 0;

console.log(dropZone);
console.log(label);

// functions

// assigns element to global var once drag event starts
function dragStart() {
   dragItem = this;
   setTimeout(visibleDrag, 0);
}

// hide the element in the starting zone when it is dragged
function visibleDrag() {
    dragItem.classList.toggle("no-display");
}

// makes element drop possible but only when the drop zone is empty
function dragOver(e) {
    let itemNumber = this.childElementCount;
    if (itemNumber == 0) {
        e.preventDefault();
    }
}

// attaches the dragged element into a drop zone and removes highlight
function appendDrag() {
    this.appendChild(dragItem);
    this.classList.remove("bg-drag");
}

// adds highlight to a drop zone when a draggable element enters it
function changeColor(e) {
    let itemNumber = this.childElementCount;
    if((itemNumber == 0) || (e == "dragleave")){
        this.classList.toggle("bg-drag");
    } 
}

// resets game: puts the elements back to start & reverts all style changes
function resetLabels() {
    const diagLabel = document.querySelectorAll("#diagram .label-title");
    this.classList.add("small-btn");
    submit.classList.add("hidden");

    score = 0;
    title.textContent = titleText;
    inst.textContent = instText;

    diagLabel.forEach((elem) => {
        elem.classList.remove("label-inc");
        labelZone.appendChild(elem);
    })
}

// show submit button when all labels are dropped into the diagram
function showSubmit() {
    remLabel = labelZone.firstElementChild;
    if(remLabel == null) {
        reset.classList.remove("small-btn"); 
        submit.classList.remove("hidden");
    }
}

// submit button: change texts to notify player and hides itself once it's clicked
function gameFunc(){
    scoringFunc();
    submit.classList.add("hidden"); 

    inst.textContent = `You got ${score}/5 labels correct.`;

    if(score >= label.length){
        title.textContent = "You Won!";
    }

    if(score < label.length){
        title.textContent = "Try again.";
    }  
}

// determines correct labels and calculates player's score
function scoringFunc() {
    dropZone.forEach((elem) =>{
        let organName = elem.id;
        let organLabel = elem.firstElementChild;
        let labelName = organLabel.textContent.toLowerCase();

        if(organName === labelName) {
            score += 1;
        } else {
            organLabel.classList.add("label-inc");
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
    elem.addEventListener("drop", showSubmit);
    elem.addEventListener("dragenter", changeColor);
    elem.addEventListener("dragleave", changeColor);
});

reset.addEventListener("click", resetLabels);
submit.addEventListener("click", gameFunc);
