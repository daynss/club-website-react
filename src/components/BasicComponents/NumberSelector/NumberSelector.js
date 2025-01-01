import React from "react";

const NumberSelector = ({ qty, onQtyChange }) => (
  <div className="number-selector">
    <label htmlFor="quantity">Quantity:</label>
    <input
      type="number"
      min="1"
      max="100"
      id="quantity"
      name="quantity"
      value={qty}
      onChange={(e) => onQtyChange(e)}
    />
  </div>
);

export default NumberSelector;
