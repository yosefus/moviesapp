import React from 'react';

function ItemsSelector({ selectedItem, items, onSelectItems, keyProp = '_id', valueProp = 'name' }) {
  return (
    <>
      <ul className="list-group">
        {items.map((item) => (
          <li
            style={{ cursor: 'pointer' }}
            key={item[keyProp]}
            onClick={() => onSelectItems(item)}
            className={`list-group-item titles ${
              (selectedItem === item || (!selectedItem && item._id === '')) && 'active'
            }`}
          >
            {item[valueProp]}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ItemsSelector;
