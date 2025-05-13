"use client";
import { useState } from "react";
import "./page.css";
import PriceModal from "./components/PriceModal/PriceModal";

export default function Home() {
  const [formData, setFormData] = useState({
    area: "",
    bedrooms: "",
    bathrooms: "",
    stories: "",
    mainroad: "1",
    guestroom: "0",
    basement: "0",
    hotwaterheating: "0",
    airconditioning: "0",
    parking: "",
    prefarea: "1",
    furnishingstatus_furnished: 0,
    furnishingstatus_semifurnished: 0,
    furnishingstatus_unfurnished: 1,
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (name === "furnishingstatus") {
      setFormData((prev) => ({
        ...prev,
        furnishingstatus_furnished: value === "fullyfurnished" ? 1 : 0,
        furnishingstatus_semifurnished: value === "semifurnished" ? 1 : 0,
        furnishingstatus_unfurnished: value === "unfurnished" ? 1 : 0,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "number" ? Number(value) : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://house-price-predictor-backend.onrender.com/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    setPrediction(data.prediction);
  };

  return (
    <div>
      <h1>House Price Predictor</h1>

      <form onSubmit={handleSubmit}>
        {/* all your input fields */}
        <label>Area (sqft):</label>
        <input type="number" name="area" onChange={handleChange} required />

        <label>Bedrooms:</label>
        <input type="number" name="bedrooms" onChange={handleChange} required />

        <label>Bathrooms:</label>
        <input type="number" name="bathrooms" onChange={handleChange} required />

        <label>Stories:</label>
        <input type="number" name="stories" onChange={handleChange} required />

        <label>Parking:</label>
        <input type="number" name="parking" onChange={handleChange} required />

        <label>Main Road:</label>
        <select name="mainroad" onChange={handleChange}>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>

        <label>Guest Room:</label>
        <select name="guestroom" onChange={handleChange}>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>

        <label>Basement:</label>
        <select name="basement" onChange={handleChange}>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>

        <label>Hot Water Heating:</label>
        <select name="hotwaterheating" onChange={handleChange}>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>

        <label>Air Conditioning:</label>
        <select name="airconditioning" onChange={handleChange}>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>

        <label>Preferred Area:</label>
        <select name="prefarea" onChange={handleChange}>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>

        <label>Furnishing Status:</label>
        <div>
          <label>
            <input
              type="radio"
              name="furnishingstatus"
              value="fullyfurnished"
              onChange={handleChange}
            />
            Fully Furnished
          </label>
          <label>
            <input
              type="radio"
              name="furnishingstatus"
              value="semifurnished"
              onChange={handleChange}
            />
            Semi-Furnished
          </label>
          <label>
            <input
              type="radio"
              name="furnishingstatus"
              value="unfurnished"
              onChange={handleChange}
              defaultChecked
            />
            Unfurnished
          </label>
        </div>

        <button type="submit">Predict</button>
      </form>

      {/* ✅ Modal only shows when prediction exists */}
      {prediction && (
        <PriceModal
          price={prediction}
          onClose={() => setPrediction(null)}
        />
      )}
    </div>
  );
}
