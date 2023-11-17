console.log("hello world");

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function buttonMakerFunction(elem) {
    newButton = document.createElement("button");
    newButton.textContent = "Make Button";
    newButton.addEventListener("click", (e) => { buttonMakerFunction(newButton) });
    // elem.appendChild(newButton);
    insertAfter(elem, newButton);
}

const maker = document.getElementById("button-maker");
maker.addEventListener("click", (e) => {
    console.log("hi mum");
    buttonMakerFunction(maker);
});
