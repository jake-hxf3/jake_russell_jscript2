console.log("JavaScript File is linked");

// variables
const dropZone = document.querySelectorAll(".target-zone");
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
   console.log(`dragging ${dragItem}`);
   setTimeout(visibleDrag, 0);
}

// hide the element in the starting zone when it is dragged
function visibleDrag() {
    dragItem.classList.toggle("no-display");
}

// makes element drop possible
function dragOver(e) {
    console.log("dragover called, they want their drop behavior back");
    e.preventDefault();
}

// attaches the dragged element into a drop zone and removes highlight
function dropFunc(e) {
    e.preventDefault();

    //prevents double drops if there is already a label
    if(this.firstElementChild) {
        return;
    }

    this.appendChild(dragItem);
    this.classList.remove("bg-drag");
    console.log("dropped");


    // show submit button when all labels are dropped into the diagram
    if(labelZone.firstElementChild) return;
    
    reset.classList.remove("small-btn"); 
    submit.classList.remove("hidden");
}

// adds highlight to an empty drop zone on dragenter
// removes it on dragleave
function changeColor(e) {
    let itemNumber = this.childElementCount;
    if((itemNumber == 0) || (e == "dragleave")){
        this.classList.toggle("bg-drag");
    } 
}

// resets game: puts the elements back to start
// reverts all style changes
function resetGame() {
    console.log("reset button clicked");
    this.classList.add("small-btn");
    submit.classList.add("hidden");

    score = 0;
    title.textContent = titleText;
    title.classList.remove("win-text");
    inst.textContent = instText; 

    dropZone.forEach((elem) => {
        let zoneLabel = elem.firstElementChild;
        if (zoneLabel) {
            zoneLabel.classList.remove("label-inc");
            labelZone.appendChild(zoneLabel);            
        }

    })
}



// submit button: change texts to notify player and hides itself once it's clicked
function gameFunc(){
    scoringFunc();
    submit.classList.add("hidden"); 

    inst.textContent = `You got ${score}/${label.length} labels correct.`;

    if(score >= label.length){
        title.textContent = "You Won!";
        title.classList.add("win-text");
    }

    if(score < label.length){
        title.textContent = "Puzzle Over";
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
    elem.addEventListener("drop", dropFunc);
    elem.addEventListener("dragenter", changeColor);
    elem.addEventListener("dragleave", changeColor);
});

reset.addEventListener("click", resetGame);
submit.addEventListener("click", gameFunc);
