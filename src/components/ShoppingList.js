import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  useEffect(() => {
    fetch('http://localhost:4000/items')
    .then(res => res.json())
    .then(items => setItems(items))
  },[])

  const handleAddItem = (newItem) => {
    setItems([...items, newItem])
  }

  const handleUpdateItem = (updatedItem) => {
    setItems(items.map(item => {
      if(item.id === updatedItem.id){
        return updatedItem
      } else {
        return item
      }
    }))
  }

  const handleDeletedItem = (deletedItem) => {
    console.log(deletedItem)
    setItems(items.filter(item => item.id !== deletedItem.id))
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={handleUpdateItem} onDeleteItem={handleDeletedItem} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
