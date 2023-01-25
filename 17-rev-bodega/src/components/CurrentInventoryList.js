import React from 'react'
import InventoryItemCard from './InventoryItemCard'

function CurrentInventoryList({ inventory, onAddItem, onDelete }) {

    const inventoryCards = inventory.map(item => (
        <InventoryItemCard 
          key={item.id} 
          item={item} 
          onCardClick={onAddItem} 
          onDelete={onDelete}
        />
    ))

    return(
        <div id="current-inventory">
            <h2>Current Inventory</h2>
            <div>
                {inventoryCards}
            </div>
        </div>
    );
}

export default CurrentInventoryList;