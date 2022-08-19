import {
  utilCreateAndDisplayItem,
  utilUpdateAndDisplayTotalItemsAndPrice,
  capitalizeFirstLetter,
  getTodayDateFormatted,
  getGreetingByTimeOfDay,
} from "./utilities.js";

/* 
  Get HTML Elements
*/
let formAddItem = document.getElementById("formAddItem");
let inputTextItemName = document.getElementById("inputTextItemName");
let inputTextSearchByName = document.getElementById("inputTextSearchByName");
let inputNumberItemPrice = document.getElementById("inputNumberItemPrice");

let outputItemList = document.getElementById("outputItemList");
let outputNoOfItems = document.getElementById("outputNoOfItems");
let outputTotalPriceAll = document.getElementById("outputTotalPriceAll");
let outputTotalPriceChecked = document.getElementById(
  "outputTotalPriceChecked"
);
let outputTotalPriceUnchecked = document.getElementById(
  "outputTotalPriceUnchecked"
);

let outputTodayDateGreeting = document.getElementById("outputTodayDate");
outputTodayDateGreeting.innerHTML = getTodayDateFormatted();

let outputGreetingByTime = document.getElementById("outputGreetingByTime");
outputGreetingByTime.innerHTML = getGreetingByTimeOfDay();

/* 
  Get items array (if any) from localStorage
*/
let arrItems;
let arrItemsJSON = localStorage.getItem("arrItems");
if (arrItemsJSON && arrItemsJSON.length) {
  arrItems = JSON.parse(arrItemsJSON);
} else {
  arrItems = [];
}

/*
  Add events
*/
formAddItem.addEventListener("submit", addItem);
outputItemList.addEventListener("click", deleteOrEditItem);
inputTextSearchByName.addEventListener("keyup", searchFilterItems);
window.onload = displayItemsOnLoad;

/*
  Define events functions
*/
function displayItemsOnLoad() {
  console.debug("Calling displayItemsOnLoad: " + JSON.stringify(arrItems));

  arrItems.forEach((item) => {
    utilCreateAndDisplayItem(item.id, item.name, item.price, item.checked);
  });

  /* Update display of total items and price */
  utilUpdateAndDisplayTotalItemsAndPrice(
    arrItems,
    outputTotalPriceAll,
    outputTotalPriceChecked,
    outputTotalPriceUnchecked
  );
}

/*
  Add Item Event on Submit
*/
inputTextItemName.addEventListener("focus", function () {
  // Clear any red border from validation
  inputTextItemName.style = "";
});
inputNumberItemPrice.addEventListener("focus", function () {
  inputNumberItemPrice.style = "";
});

function addItem(event) {
  console.debug("Calling addItem...");
  event.preventDefault();
  if (inputTextItemName.value === "") {
    inputTextItemName.style = "border-color: red;";
    console.debug("addItem: inputTextItemName cannot be empty!");
    return;
  }
  if (inputNumberItemPrice.value === "") {
    inputNumberItemPrice.style = "border-color: red;";
    console.debug("addItem: inputNumberItemPrice cannot be empty!");
    return;
  }
  /* Generate ID for element */
  let itemID = Math.random().toString(16).slice(2);

  /* Display item in front-end */
  utilCreateAndDisplayItem(
    itemID,
    capitalizeFirstLetter(inputTextItemName.value.trim()),
    inputNumberItemPrice.value
  );

  /* Save item to js array, clear form input */
  arrItems.push({
    id: itemID,
    name: capitalizeFirstLetter(inputTextItemName.value.trim()),
    price: inputNumberItemPrice.value,
    checked: false,
  });
  inputTextItemName.value = "";
  inputNumberItemPrice.value = "";

  /* Update display of total items and price */
  utilUpdateAndDisplayTotalItemsAndPrice(
    arrItems,
    outputTotalPriceAll,
    outputTotalPriceChecked,
    outputTotalPriceUnchecked
  );

  /* Save items array to localStorage */
  console.debug(
    "addItem called successfully! Saving new array to localStorage: " +
      JSON.stringify(arrItems)
  );
  localStorage.setItem("arrItems", JSON.stringify(arrItems));
}

/*
  Delete or Edit Item Event
*/
function deleteOrEditItem(event) {
  console.debug("Calling deleteOrEditItem...");
  if (event.target.classList.contains("js-delete")) {
    let li = event.target.parentElement;
    li.classList.add("js-delete-animation");
    li.addEventListener("animationend", function () {
      li.remove();
      // outputItemList.removeChild(li); // old method
    });

    // Delete item from local array
    let itemIDToDelete = event.target.parentElement.getAttribute("data-key");
    arrItems = arrItems.filter((item) => item.id !== itemIDToDelete);
    console.debug(
      "deleteOrEditItem: item with id " + itemIDToDelete + " deleted"
    );

    /* Update display of total items and price */
    utilUpdateAndDisplayTotalItemsAndPrice(
      arrItems,
      outputTotalPriceAll,
      outputTotalPriceChecked,
      outputTotalPriceUnchecked
    );

    /* Save items array to localStorage */
    console.debug(
      "deleteOrEditItem called successfully! Saving new array to localStorage: " +
        JSON.stringify(arrItems)
    );
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

        /* Save items array to localStorage */
        localStorage.setItem("arrItems", JSON.stringify(arrItems));
        console.debug(
          "deleteOrEditItem called successfully! Saving new array to localStorage: " +
            JSON.stringify(arrItems)
        );
      } else {
        console.debug(
          "deleteOrEditItem: pNewName has the same value as before"
        );
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

        /* Update display of total items and price */
        utilUpdateAndDisplayTotalItemsAndPrice(
          arrItems,
          outputTotalPriceAll,
          outputTotalPriceChecked,
          outputTotalPriceUnchecked
        );

        /* Save items array to localStorage */
        console.debug(
          "deleteOrEditItem called successfully! Saving new array to localStorage: " +
            JSON.stringify(arrItems)
        );
        localStorage.setItem("arrItems", JSON.stringify(arrItems));
      } else {
        console.debug(
          "deleteOrEditItem: pNewPrice has the same value as before"
        );
      }
    });
  }

  if (event.target.classList.contains("js-check-item")) {
    let itemIDToCheck = event.target.parentElement.getAttribute("data-key");
    let itemFoundIndex = arrItems.findIndex(
      (item) => item.id === itemIDToCheck
    );

    if (event.target.checked) {
      arrItems[itemFoundIndex].checked = true;
      console.debug(
        "deleteOrEditItem: item with id " + itemIDToCheck + " checked"
      );
    } else {
      arrItems[itemFoundIndex].checked = false;
      console.debug(
        "deleteOrEditItem: item with id " + itemIDToCheck + " unchecked"
      );
    }

    /* Update display of total items and price */
    utilUpdateAndDisplayTotalItemsAndPrice(
      arrItems,
      outputTotalPriceAll,
      outputTotalPriceChecked,
      outputTotalPriceUnchecked
    );

    /* Save items array to localStorage */
    console.debug(
      "deleteOrEditItem called successfully! Saving new array to localStorage: " +
        JSON.stringify(arrItems)
    );
    localStorage.setItem("arrItems", JSON.stringify(arrItems));
    localStorage.setItem("arrItems", JSON.stringify(arrItems));
  }
}

/*
  Search Item by Name Event
*/
function searchFilterItems(event) {
  event.preventDefault();
  let searchedText = event.target.value.toLowerCase().trim();
  let allItems = outputItemList.getElementsByTagName("li");
  let cntSearchedItems = 0;

  Array.from(allItems).forEach((item) => {
    let itemName = item.children[2].value;
    if (itemName.toLowerCase().indexOf(searchedText) !== -1) {
      item.style.display = "flex";
      cntSearchedItems += 1;
    } else {
      item.style.display = "none";
    }
  });

  outputNoOfItems.innerHTML = cntSearchedItems;
}

/* Dark Mode */
const checkboxDarkTheme = document.getElementById("toggleDarkMode");
const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null;
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  if (currentTheme === "dark") {
    checkboxDarkTheme.checked = true;
  }
}

checkboxDarkTheme.addEventListener("change", toggleDarkTheme);
function toggleDarkTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    console.debug("toggleDarkTheme called: dark theme set");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    console.debug("toggleDarkTheme called: light theme set");
  }
}
