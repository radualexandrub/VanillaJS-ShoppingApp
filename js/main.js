import { utilCreateAndDisplayItem } from "./utilities.js";

/* Get HTML Elements */
let inputTextItemName = document.getElementById("inputTextItemName");
let inputTextSearchByName = document.getElementById("inputTextSearchByName");

let btnSubmit = document.getElementById("btnSubmit");

let outputItemList = document.getElementById("outputItemList");
let outputNoOfItems = document.getElementById("outputNoOfItems");

/* Get items array (if any) from localStorage and display on front-end */
let arrItems;
let arrItemsJSON = localStorage.getItem("arrItems");
if (arrItemsJSON && arrItemsJSON.length) {
  arrItems = JSON.parse(arrItemsJSON);
} else {
  arrItems = [];
}

/* Add events */
btnSubmit.addEventListener("click", addItem);
outputItemList.addEventListener("click", deleteOrEditItem);
inputTextSearchByName.addEventListener("keyup", searchFilterItems);

window.onload = displayItemsOnLoad;

/* Define events functions */
function displayItemsOnLoad() {
  arrItems.forEach((item) => {
    utilCreateAndDisplayItem(item.name, item.id);
    outputNoOfItems.innerHTML = arrItems.length;
  });
  console.log(arrItems);
}

function addItem(event) {
  event.preventDefault();
  if (inputTextItemName.value === "") {
    return;
  }

  /* Generate ID for element */
  let itemID = Math.random().toString(16).slice(2);

  /* Display item in front-end */
  utilCreateAndDisplayItem(inputTextItemName.value.trim(), itemID);

  /* Save item to js array, clear form input */
  arrItems.push({ id: itemID, name: inputTextItemName.value.trim() });
  inputTextItemName.value = "";
  outputNoOfItems.innerHTML = arrItems.length;

  // Save items array to localStorage
  localStorage.setItem("arrItems", JSON.stringify(arrItems));
}

function deleteOrEditItem(event) {
  if (event.target.classList.contains("js-delete")) {
    let li = event.target.parentElement;
    outputItemList.removeChild(li);

    // Delete item from local array
    let itemIDToDelete = event.target.parentElement.getAttribute("data-key");
    arrItems = arrItems.filter((item) => item.id !== itemIDToDelete);
    outputNoOfItems.innerHTML = arrItems.length;

    // Save items array to localStorage
    localStorage.setItem("arrItems", JSON.stringify(arrItems));
  }

  if (event.target.classList.contains("js-edit")) {
    // let pNewName = prompt("Edit your entry", event.target.innerText); // deprecated

    let itemIDToEdit = event.target.parentElement.getAttribute("data-key");
    let itemFoundIndex = arrItems.findIndex((item) => item.id === itemIDToEdit);
    let pOldName = arrItems[itemFoundIndex].name;

    event.target.addEventListener("blur", function () {
      let pNewName = event.target.value;
      if (pNewName !== null && pNewName !== pOldName) {
        event.target.value = pNewName;
        arrItems[itemFoundIndex].name = pNewName;

        // Save items array to localStorage
        localStorage.setItem("arrItems", JSON.stringify(arrItems));
      }
    });
  }
}

function searchFilterItems(event) {
  event.preventDefault();
  let searchedText = event.target.value.toLowerCase().trim();
  let allItems = outputItemList.getElementsByTagName("li");
  let cntSearchedItems = 0;

  Array.from(allItems).forEach((item) => {
    let itemName = item.firstChild.textContent;
    if (itemName.toLowerCase().indexOf(searchedText) !== -1) {
      item.style.display = "flex";
      cntSearchedItems += 1;
    } else {
      item.style.display = "none";
    }
  });

  outputNoOfItems.innerHTML = cntSearchedItems;
}
