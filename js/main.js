console.log("JavaScript File is linked");

// variables
const labels = document.querySelectorAll(".label");
const targetZones = document.querySelectorAll(".target-zone");
const labelBox = document.querySelector("#label-box");
let currentDraggedElement = null;

//add variables for the reset button
const reset = document.querySelector("#reset-btn");
const submit = document.querySelector("#submit-btn");

// functions
function dragStart() {
    console.log("started dragging");
    // whatever the user is dragging, store it into currentDraggedElement
    currentDraggedElement = this;
}

function dragOver(e) {
    console.log("dragover called, they want their drop behavior back");

    //check if the zone is empty to allow the drop
    let itemNumber = this.childElementCount;
    if(itemNumber == 0){
        e.preventDefault();
    }
}



function dropped(e) {
    e.preventDefault();

    //prevent double drops here
    //if this dropzone has a child then don't let it drop
    //use a return statement
    if(this.firstElementChild) {
        return;
    }


    //drop the piece
    this.appendChild(currentDraggedElement);
    currentDraggedElement = null;
    console.log("dropped");
}

// function resetGame() {
    //collect all the labels and put them back
    //check all target zones/loop through them
    //see IF the dropzone has a label in it
    //if it does then add the labels back to the pieces
//}
function resetGame() {
    console.log("reset button clicked");
    targetZones.forEach(zone => {
        let zoneLabel = zone.firstElementChild;
        if (zoneLabel) {
            labelBox.appendChild(zoneLabel);
        }
    })
}



// event listeners
labels.forEach(label => {
    label.addEventListener("dragstart", dragStart);
})

targetZones.forEach(zone => {
    zone.addEventListener("dragover", dragOver);
    zone.addEventListener("drop", dropped);
})

//add an eventListener to the reset button
//listen to the click event and call a function to reset
reset.addEventListener("click", resetGame);