import React from "react";

function Item({ item, onUpdateItem, onDeleteItem }) {
  const handleAddToCartClick = () => {
    fetch(`http://localhost:4000/items/${item.id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({isInCart: !item.isInCart})
    })
      .then(res => res.json())
      .then(updatedItem => onUpdateItem(updatedItem))
  }

  const handleDeleteCLick = () => {
    fetch(`http://localhost:4000/items/${item.id}`, {
    method: "DELETE",
  })
    .then((r) => r.json())
    .then(() => onDeleteItem(item))
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"} onClick={handleAddToCartClick} >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteCLick}>Delete</button>
    </li>
  );
}

export default Item;
