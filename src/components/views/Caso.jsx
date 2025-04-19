// src/components/Caso.jsx
import React, { useState } from "react";
import "./caso.css";
import axios from "axios";

function Caso({ casoData, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: casoData.crop_name,
    price: casoData.price,
  });

  const handleEditClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
    onEdit(casoData.id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/crops/${casoData.id}`,
        editedData
      );
      if (response.data) {
        setIsEditing(false);
        // Aquí podrías actualizar el estado global o llamar a una función de actualización
        alert("Cultivo actualizado con éxito");
      }
    } catch (error) {
      console.error("Error al actualizar el cultivo:", error);
      alert(
        "Error al actualizar el cultivo: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="caso_div_padre caso">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-group">
            <label>Nombre del cultivo:</label>
            <input
              type="text"
              name="name"
              value={editedData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Precio:</label>
            <input
              type="number"
              name="price"
              value={editedData.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="button-group">
            <button type="submit" className="save-button">
              Guardar
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => setIsEditing(false)}
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="caso_div_hijo">
            <div key={casoData.id}>ID: {casoData.id}</div>
            <div>user_id: {casoData.user_id}</div>
            <div>crop_id: {casoData.crop_id}</div>
            <div>crop name: {casoData.crop_name}</div>
            <div>yield: {casoData.yield}</div>
            <div>price: {casoData.price}</div>
            <div>lease_cost_usd: {casoData.lease_cost_usd}</div>
            <div>lease_cost_kg: {casoData.lease_cost_kg}</div>
            <div>production_costs: {casoData.production_costs}</div>
            <div>gross_income: {casoData.gross_income}</div>
            <div>commercialization: {casoData.commercialization}</div>
            <div>freight_costs: {casoData.freight_costs}</div>
            <div>net_income: {casoData.net_income}</div>
          </div>
          <br />
          <div>
            <button className="edit-button" onClick={handleEditClick}>
              Editar
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Caso;
