let inputTextItemName = document.getElementById("inputTextItemName");
let inputTextSearchByName = document.getElementById("inputTextSearchByName");

let btnSubmit = document.getElementById("btnSubmit");

let outputItemList = document.getElementById("outputItemList");
let outputNoOfItems = document.getElementById("outputNoOfItems");

// Get items array (if any) from localStorage and display on front-end
let arrItems;
let arrItemsJSON = localStorage.getItem("arrItems");
if (arrItemsJSON && arrItemsJSON.length) {
  arrItems = JSON.parse(arrItemsJSON);
} else {
  arrItems = [];
}

btnSubmit.addEventListener("click", addItem);
outputItemList.addEventListener("click", deleteOrEditItem);
inputTextSearchByName.addEventListener("keyup", searchFilterItems);

window.onload = displayItems;

function displayItems() {
  arrItems.forEach((item) => {
    let li = document.createElement("li");
    li.className = "list-container__item";

    // Create item text paragraph
    let pName = document.createElement("p");
    pName.innerText = item.name;
    pName.className = "js-edit";

    // Create delete button
    let btnDelete = document.createElement("button");
    btnDelete.className = "js-delete";
    btnDelete.innerHTML = "X";

    li.appendChild(pName);
    li.appendChild(btnDelete);

    // Display item in list and clear input
    outputItemList.appendChild(li);
    outputNoOfItems.innerHTML = arrItems.length;
  });
}

function addItem(event) {
  event.preventDefault();

  // Check if input string is empty
  if (inputTextItemName.value === "") {
    return;
  }

  let li = document.createElement("li");
  li.className = "list-container__item";

  // Create item text paragraph
  let pName = document.createElement("p");
  pName.innerText = inputTextItemName.value.trim();
  pName.className = "js-edit";

  // Create delete button
  let btnDelete = document.createElement("button");
  btnDelete.className = "js-delete";
  btnDelete.innerHTML = "X";

  li.appendChild(pName);
  li.appendChild(btnDelete);

  // Display item in list and clear input
  outputItemList.appendChild(li);

  /* Save item to js array */
  arrItems.push({ name: inputTextItemName.value.trim() });
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
    let itemNameToDelete = event.target.parentElement.innerText.slice(0, -1);
    arrItems = arrItems.filter((item) => item.name !== itemNameToDelete);
    outputNoOfItems.innerHTML = arrItems.length;

    // Save items array to localStorage
    localStorage.setItem("arrItems", JSON.stringify(arrItems));
  }

  if (event.target.classList.contains("js-edit")) {
    let pNewName = prompt("Edit your entry", event.target.innerText);
    if (pNewName !== null && pNewName !== event.target.innerText) {
      let itemFoundIndex = arrItems.findIndex(
        (item) => item.name === event.target.innerText
      );
      arrItems[itemFoundIndex].name = pNewName;

      event.target.innerText = pNewName;

      // Save items array to localStorage
      localStorage.setItem("arrItems", JSON.stringify(arrItems));
    }
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
