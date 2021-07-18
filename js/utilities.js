function utilCreateAndDisplayItem(itemID, itemName, itemPrice, itemChecked) {
  let li = document.createElement("li");
  li.className = "list-container__item";

  // Create item input text to display and edit item name
  let inputDisplayItemName = document.createElement("input");
  inputDisplayItemName.value = itemName;
  inputDisplayItemName.className = "js-edit-name";

  // Create item input number to display and edit item price
  let inputDisplayItemPrice = document.createElement("input");
  inputDisplayItemPrice.value = itemPrice;
  inputDisplayItemPrice.className = "js-edit-price";

  // Create delete button
  let btnDelete = document.createElement("button");
  btnDelete.className = "js-delete";
  btnDelete.innerHTML = "X";

  // Create checkbox for checked item
  let inputDisplayItemChecked = document.createElement("input");
  inputDisplayItemChecked.type = "checkbox";
  inputDisplayItemChecked.className = "js-check-item";
  if (itemChecked) {
    inputDisplayItemChecked.checked = true;
  }

  li.setAttribute("data-key", itemID);
  li.appendChild(inputDisplayItemChecked);
  li.appendChild(inputDisplayItemName);
  li.appendChild(inputDisplayItemPrice);
  li.appendChild(btnDelete);

  // Display item in list
  outputItemList.appendChild(li);
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

export { utilCreateAndDisplayItem, utilUpdateAndDisplayTotalItemsAndPrice };
