
const imgBossbots = ["","flunky","pencilpusher","yesman","micromanager","downsizer","headhunter","corporateraider","thebigcheese"];
const imgLawbots = ["","bottomfeeder","bloodsucker","doubletalker","ambulancechaser","backstabber","spindoctor","legaleagle","bigwig"];

document.addEventListener("DOMContentLoaded", () => {
    console.log("loaded tablecreator.js");
    
    const toggleBtn = document.getElementById("toggle-btn");
    toggleBtn.addEventListener("click", toggle);

    // https://stackoverflow.com/questions/14643617/create-table-using-javascript
    const cogTable = document.getElementById("cog-table");
    for (let i = 0; i < 2; i++) {
        tr = cogTable.insertRow();
        for (let j = 0; j < 4; j++) {
            const tier = i*4 + j + 1;
            const td = tr.insertCell();
            td.classList.add("cog-item");
            td.classList.add("grad");
            td.classList.add("tier-"+tier);
            td.appendChild(createTableCell(tier));
            // 1 2 3 4
            // 5 6 7 8
        }
    }

    // pre-populate the 8 party slots
    const partyTableRow = document.getElementById("party-table-row");
    for (let i = 0; i < 8; i++) {
        const td = partyTableRow.insertCell();
        td.classList.add("cog-item");
        td.classList.add("grad");
        // td.classList.add("hide");
    }


});

function createTableCell(tier) {
    cell = document.createElement("div");
    const img = document.createElement("img");
    cell.appendChild(img);
    img.classList.add("tier-"+tier);
    // img.src = "../images/Cog-bossbot-"+imgBossbots[tier]+".webp";
    img.src = "../images/Cog-lawbot-"+imgLawbots[tier]+".webp";
    const selectList = document.createElement("select");
    cell.appendChild(selectList);
    selectList.classList.add("inner-flex");
    let levelCap = tier + 4;
    if (tier === 8) {
        levelCap = 50;
    }
    for (let level = tier; level <= levelCap; level++) {
        const option = document.createElement("option");
        // 1 2 3 4 5 6 7
        // 1 2 3 4 5
        //   6 7 8 9 a
        //     b c d e f
        option.dataset.tier = tier;
        option.dataset.level = level;
        option.value = (tier-1)*5+level-(tier-1);
        option.text = String(level);
        selectList.appendChild(option);
    }
    
    cell.appendChild(document.createElement("br"));

    const addButton = document.createElement("button");
    cell.appendChild(addButton);
    addButton.innerHTML = "Add";
    addButton.addEventListener("click", (e) => {
        if (partySize < 8) {
            addPartyCell(e.target.parentElement);
            calculateAverage();
            console.log("partySize : " + partySize);
        }
    });

    return cell;
}

let partySize = 0;
function addPartyCell(cogCell) {
    const partyTableRow = document.getElementById("party-table-row");
    // const td = partyTableRow.insertCell();
    const td = partyTableRow.getElementsByTagName("td")[partySize];
    partySize += 1;

    cell = document.createElement("div");
    td.appendChild(cell);
    const img = document.createElement("img");
    cell.appendChild(img);
    img.src = cogCell.getElementsByTagName("img")[0].src;
    // img.src = "../images/Cog-bossbot-flunky.webp";

    // TODO: add a div above the label so the trasparency doesnt carry horizontally the row
    const levelLabel = document.createElement("label");
    cell.appendChild(levelLabel);
    levelLabel.classList.add("inner-flex");
    const select = cogCell.getElementsByTagName("select")[0];
    const selectedOption = select.options[select.selectedIndex];
    const tier = selectedOption.dataset.tier;
    const level = selectedOption.dataset.level;
    const value = selectedOption.value;

    td.dataset.value = value;
    levelLabel.innerHTML = "Lv. " + level;

    // TODO: add a div above the label so the trasparency doesnt carry horizontally the row
    const valueLabel = document.createElement("label");
    cell.appendChild(valueLabel);
    valueLabel.classList.add("inner-flex");
    valueLabel.innerHTML = "Value: " + value;

    
    const removeButton = document.createElement("button");
    cell.appendChild(removeButton);
    removeButton.innerHTML = "Remove";
    removeButton.addEventListener("click", (e) => {
        // const div = e.target.closest("div");
        const td = e.target.closest("td");
        const td2 = td.parentElement.insertCell();
        td2.classList.add("cog-item");
        td2.classList.add("grad");
        td.parentElement.removeChild(td);
        partySize -= 1;
        console.log("partySize : " + partySize);
        calculateAverage();
    });
    // const cogCellCopy = cogCell.cloneNode(true);
    // const tr = partyTable.insertRow();
    // td.appendChild(cogCellCopy);
    console.log(cogCell.getElementsByTagName("select")[0].value);
}

function calculateAverage() {
    const suitAverageDisplay = document.getElementById("suit-average-value");
    const partyTableRow = document.getElementById("party-table-row");
    // let partySize = 0;
    let partyValue = 0;
    const tds = partyTableRow.getElementsByTagName("td")
    for (let i = 0; i < partySize; i++) {
        let td = tds[i]
        console.log(td.dataset.value);
        // partySize += 1;
        partyValue += parseInt(td.dataset.value);
    }
    console.log(partyValue, partySize);
    if (partySize > 0) {
        suitAverageDisplay.innerHTML = Math.ceil(partyValue / partySize);
    }
    else {
        suitAverageDisplay.innerHTML = 0;
    }
}

function toggle(e) {
    let cogType = e.target.textContent;
    let images = document.getElementsByTagName("img");

    if (cogType === "bossbot") {
        cogType = "lawbot";
        for (const image of images) {
            image.src = image.src.replace(/bossbot/, cogType);
            for (let i = 1; i < imgLawbots.length; i++) {
                image.src = image.src.replace(imgBossbots[i], imgLawbots[i]);
            }
        }
        for (const elem of document.getElementsByClassName("grad")) {
            elem.style.background = "linear-gradient(to bottom right, #364557, #afbacc)"
        }
    }
    else {
        cogType = "bossbot";
        for (const image of images) {
            image.src = image.src.replace(/lawbot/, cogType);
            for (let i = 1; i < imgBossbots.length; i++) {
                image.src = image.src.replace(imgLawbots[i], imgBossbots[i]);
            }
        }
        for (const elem of document.getElementsByClassName("grad")) {
            elem.style.background = "linear-gradient(to bottom right, #57342b, #aa9d9b)"
        }
    }
    
    e.target.textContent = cogType;
    console.log(cogType);
}

