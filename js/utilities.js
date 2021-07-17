function utilCreateAndDisplayItem(innerText, itemID) {
  let li = document.createElement("li");
  li.className = "list-container__item";

  // Create item text paragraph
  let pName = document.createElement("input");
  pName.value = innerText;
  pName.className = "js-edit";

  // Create delete button
  let btnDelete = document.createElement("button");
  btnDelete.className = "js-delete";
  btnDelete.innerHTML = "X";

  li.setAttribute("data-key", itemID);
  li.appendChild(pName);
  li.appendChild(btnDelete);

  // Display item in list
  outputItemList.appendChild(li);
}

export { utilCreateAndDisplayItem };
