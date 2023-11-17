
const imgBossbots = ["","flunky","pencilpusher","yesman","micromanager","downsizer","headhunter","corporateraider","thebigcheese"];

document.addEventListener("DOMContentLoaded", () => {
    console.log("hello world 2");
    
    // https://stackoverflow.com/questions/14643617/create-table-using-javascript
    const cogTable = document.getElementById("cog-table");
    for (let i = 0; i < 2; i++) {
        tr = cogTable.insertRow();
        for (let j = 0; j < 4; j++) {
            const tier = i*4 + j + 1;
            const td = tr.insertCell();
            td.classList.add("cog-item");
            td.classList.add("tier-"+tier);
            td.appendChild(createTableCell(tier));
            // 1 2 3 4
            // 5 6 7 8
        }
    }
});

function createTableCell(tier) {
    cell = document.createElement("div");
    const img = document.createElement("img");
    cell.appendChild(img);
    img.src = "../images/Cog-bossbot-"+imgBossbots[tier]+".webp";
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
    
    const addButton = document.createElement("button");
    cell.appendChild(addButton);
    addButton.innerHTML = "Add";
    addButton.addEventListener("click", (e) => {
        addPartyCell(e.target.parentElement);
        calculateAverage();
    });

    return cell;
}

function addPartyCell(cogCell) {
    const partyTableRow = document.getElementById("party-table-row");
    const td = partyTableRow.insertCell();
    td.classList.add("cog-item");

    cell = document.createElement("div");
    td.appendChild(cell);
    const img = document.createElement("img");
    cell.appendChild(img);
    img.src = cogCell.getElementsByTagName("img")[0].src;
    // img.src = "../images/Cog-bossbot-flunky.webp";
    const label = document.createElement("label");
    cell.appendChild(label);
    label.classList.add("inner-flex");
    const select = cogCell.getElementsByTagName("select")[0];
    const selectedOption = select.options[select.selectedIndex];
    const tier = selectedOption.dataset.tier;
    const level = selectedOption.dataset.level;
    const value = selectedOption.value;

    td.dataset.value = value;
    label.innerHTML = tier+":"+level+"("+value+")";
    
    const removeButton = document.createElement("button");
    cell.appendChild(removeButton);
    removeButton.innerHTML = "Remove";
    removeButton.addEventListener("click", (e) => {
        const td = e.target.closest("td");
        td.parentElement.removeChild(td);
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
    let partySize = 0;
    let partyValue = 0;
    const tds = partyTableRow.getElementsByTagName("td")
    for (const td of tds) {
        console.log(td.dataset.value);
        partySize += 1;
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
