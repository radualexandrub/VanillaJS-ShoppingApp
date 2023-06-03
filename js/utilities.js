function utilCreateAndDisplayItem(
  itemID,
  itemName,
  itemPrice,
  itemChecked,
  itemURL
) {
  let li = document.createElement("li");
  li.className = "list-container__item";

  // Create item input text to display and edit item name
  let inputDisplayItemName = document.createElement("input");
  inputDisplayItemName.value = itemName;
  inputDisplayItemName.type = "text";
  inputDisplayItemName.className = "js-edit-name";
  inputDisplayItemName.title =
    "Edit item name. Hold CTRL+Click to open item http(s) URL";
  {
    /*
      Utility Listeners to show a CSS Pointer Cursor when hovering
      over input element while holding down the CTRL key
    */
    function updateCursor(event) {
      if (event.ctrlKey || event.metaKey) {
        inputDisplayItemName.classList.add("pointer-cursor");
      } else {
        inputDisplayItemName.classList.remove("pointer-cursor");
      }
    }
    inputDisplayItemName.addEventListener("mouseover", updateCursor);
    inputDisplayItemName.addEventListener("mouseout", updateCursor);
    document.addEventListener("keydown", updateCursor);
    document.addEventListener("keyup", updateCursor);
  }

  // Create item input number to display and edit item price
  let inputDisplayItemPrice = document.createElement("input");
  // inputDisplayItemPrice.type = "number"; // TODO: Format to number input and then hide arrows
  inputDisplayItemPrice.value = itemPrice;
  inputDisplayItemPrice.className = "js-edit-price";
  inputDisplayItemPrice.title = "Edit item price";

  // Create additional edit modal for item's URL edit
  let btnEditModal = document.createElement("button");
  btnEditModal.className = "js-edit-modal";
  /* btnEditModal.setAttribute("data-modal", "edit-item-modal"); */
  /* ^ code not needed as we manually open the modal by Id instead of using VanillaJSModals */
  btnEditModal.title = "Open edit modal";

  // Create delete button
  let btnDelete = document.createElement("button");
  btnDelete.className = "js-delete";
  btnDelete.title = "Delete item from list";

  // Create checkbox for checked item
  let inputDisplayItemChecked = document.createElement("input");
  inputDisplayItemChecked.type = "checkbox";
  inputDisplayItemChecked.className = "js-check-item";
  inputDisplayItemChecked.title = "Check/Uncheck item";
  if (itemChecked) {
    inputDisplayItemChecked.checked = true;
  }

  let spanCheckbox = document.createElement("span");
  spanCheckbox.className = "checkbox";

  li.setAttribute("data-key", itemID);
  li.appendChild(inputDisplayItemChecked);
  li.appendChild(spanCheckbox);
  li.appendChild(inputDisplayItemName);
  li.appendChild(inputDisplayItemPrice);
  li.appendChild(btnEditModal);
  li.appendChild(btnDelete);

  // Display item in list
  outputItemList.appendChild(li);

  console.debug(
    "Calling utilCreateAndDisplayItem with " +
      JSON.stringify({
        id: itemID,
        name: itemName,
        price: itemPrice,
        checked: itemChecked,
        URL: itemURL,
      })
  );
}

function utilUpdateAndDisplayTotalItemsAndPrice(
  arrItems,
  outputTotalPriceAll,
  outputTotalPriceChecked,
  outputTotalPriceUnchecked
) {
  outputNoOfItems.innerHTML = arrItems.length;
  outputTotalPriceAll.innerHTML = arrItems.reduce((total, item) => {
    return (total += parseFloat(item.price));
  }, 0);
  outputTotalPriceChecked.innerHTML = arrItems.reduce((total, item) => {
    if (item.checked) {
      total += parseFloat(item.price);
    }
    return total;
  }, 0);
  outputTotalPriceUnchecked.innerHTML = arrItems.reduce((total, item) => {
    if (item.checked === false) {
      total += parseFloat(item.price);
    }
    return total;
  }, 0);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getTodayDateFormatted() {
  /* https://stackoverflow.com/questions/12409299/how-to-get-current-formatted-date-dd-mm-yyyy-in-javascript-and-append-it-to-an-i */
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dateObj = new Date();
  const dayOfWeek = dayNames[dateObj.getDay()];
  const month = monthNames[dateObj.getMonth()];
  const day = String(dateObj.getDate()).padStart(2, "0");
  const year = dateObj.getFullYear();
  return dayOfWeek + ", " + month + " " + day + ", " + year;
}

function getGreetingByTimeOfDay() {
  const time = new Date().getHours();
  if (time >= 5 && time < 12) {
    return "Good morning";
  } else if (time < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

export {
  utilCreateAndDisplayItem,
  utilUpdateAndDisplayTotalItemsAndPrice,
  capitalizeFirstLetter,
  getTodayDateFormatted,
  getGreetingByTimeOfDay,
};
