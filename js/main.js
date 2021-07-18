import { utilCreateAndDisplayItem } from "./utilities.js";

/* Get HTML Elements */
let formAddItem = document.getElementById("formAddItem");
let inputTextItemName = document.getElementById("inputTextItemName");
let inputTextSearchByName = document.getElementById("inputTextSearchByName");
let inputNumberItemPrice = document.getElementById("inputNumberItemPrice");
let btnSubmit = document.getElementById("btnSubmit");

let outputItemList = document.getElementById("outputItemList");
let outputNoOfItems = document.getElementById("outputNoOfItems");
let outputTotalPriceAll = document.getElementById("outputTotalPriceAll");

/* Get items array (if any) from localStorage and display on front-end */
let arrItems;
let arrItemsJSON = localStorage.getItem("arrItems");
if (arrItemsJSON && arrItemsJSON.length) {
  arrItems = JSON.parse(arrItemsJSON);
} else {
  arrItems = [];
}

/* Add events */
formAddItem.addEventListener("submit", addItem);
outputItemList.addEventListener("click", deleteOrEditItem);
inputTextSearchByName.addEventListener("keyup", searchFilterItems);
window.onload = displayItemsOnLoad;

/* Define events functions */
function displayItemsOnLoad() {
  arrItems.forEach((item) => {
    utilCreateAndDisplayItem(item.id, item.name, item.price);
  });
  outputNoOfItems.innerHTML = arrItems.length;
  outputTotalPriceAll.innerHTML = arrItems.reduce((total, item) => {
    return (total += parseFloat(item.price));
  }, 0);
  console.log(arrItems);
}

function addItem(event) {
  event.preventDefault();
  if (inputTextItemName.value === "" || inputNumberItemPrice.value === "") {
    return;
  }
  /* Generate ID for element */
  let itemID = Math.random().toString(16).slice(2);

  /* Display item in front-end */
  utilCreateAndDisplayItem(
    itemID,
    inputTextItemName.value.trim(),
    inputNumberItemPrice.value
  );

  /* Save item to js array, clear form input */
  arrItems.push({
    id: itemID,
    name: inputTextItemName.value.trim(),
    price: inputNumberItemPrice.value,
  });
  inputTextItemName.value = "";
  inputNumberItemPrice.value = "";
  outputNoOfItems.innerHTML = arrItems.length;
  outputTotalPriceAll.innerHTML = arrItems.reduce((total, item) => {
    return (total += parseFloat(item.price));
  }, 0);
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
    outputTotalPriceAll.innerHTML = arrItems.reduce((total, item) => {
      return (total += parseFloat(item.price));
    }, 0);

    // Save items array to localStorage
    localStorage.setItem("arrItems", JSON.stringify(arrItems));
  }

  if (event.target.classList.contains("js-edit-name")) {
    // let pNewPrice = prompt("Edit your entry", event.target.innerText); // deprecated
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

  if (event.target.classList.contains("js-edit-price")) {
    let itemIDToEdit = event.target.parentElement.getAttribute("data-key");
    let itemFoundIndex = arrItems.findIndex((item) => item.id === itemIDToEdit);
    let pOldPrice = arrItems[itemFoundIndex].price;

    event.target.addEventListener("blur", function () {
      let pNewPrice = event.target.value;
      if (pNewPrice !== null && pNewPrice !== pOldPrice) {
        event.target.value = pNewPrice;
        arrItems[itemFoundIndex].price = pNewPrice;

        outputTotalPriceAll.innerHTML = arrItems.reduce((total, item) => {
          return (total += parseFloat(item.price));
        }, 0);

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
    let itemName = item.firstChild.value;
    if (itemName.toLowerCase().indexOf(searchedText) !== -1) {
      item.style.display = "flex";
      cntSearchedItems += 1;
    } else {
      item.style.display = "none";
    }
  });

  outputNoOfItems.innerHTML = cntSearchedItems;
}
