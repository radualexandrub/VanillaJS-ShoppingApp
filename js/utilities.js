function utilCreateAndDisplayItem(itemID, itemName, itemPrice) {
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

  li.setAttribute("data-key", itemID);
  li.appendChild(inputDisplayItemName);
  li.appendChild(inputDisplayItemPrice);
  li.appendChild(btnDelete);

  // Display item in list
  outputItemList.appendChild(li);
}

export { utilCreateAndDisplayItem };
