import React from "react";
import "./PriceModal.css";

export default function PriceModal({ price, onClose }) {
  if (price === null) return null;

  const priceInLakhs = (price / 100000).toFixed(2);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2>Predicted Price</h2>
        <p className="price">₹ {priceInLakhs} Lakhs</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
