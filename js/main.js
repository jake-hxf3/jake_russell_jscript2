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

let diagCount = 0;
let dragItem = null;
let score = 0;

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
    let itemNumber = this.childElementCount;
    if (itemNumber == 0) {
        e.preventDefault();
    }
}

function appendDrag() {
    this.appendChild(dragItem);
    this.classList.remove("bg-drag");
    diagCount += 1;
}

function changeColor(e) {
    let itemNumber = this.childElementCount;
    if((itemNumber == 0) || (e == "dragleave")){
        this.classList.toggle("bg-drag");
    } 
}

function resetLabels() {
    const diagLabel = document.querySelectorAll("#diagram .label-title");
    this.classList.add("small-btn");
    submit.classList.add("hidden");

    diagCount = 0;
    score = 0;
    title.textContent = titleText;
    inst.textContent = instText;

    diagLabel.forEach((elem) => {
        labelZone.appendChild(elem);
    })
}

function showSubmit() {
    if(diagCount == label.length) {
        reset.classList.remove("small-btn"); 
        submit.classList.remove("hidden");
    }
}

function gameFunc(){
    dropZone.forEach((elem) =>{
        let organName = elem.id;
        let labelName = elem.firstElementChild.textContent.toLowerCase();

        if(organName === labelName) {
            score += 1;
        }        
    })

    submit.classList.add("hidden"); 

    inst.textContent = `You got ${score}/5 labels correct.`;

    if(score >= label.length){
        title.textContent = "You Won!";
    }

    if(score < label.length){
        title.textContent = "Try again.";
    }  
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
