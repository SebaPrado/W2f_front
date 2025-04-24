// src/components/Caso.jsx
import React, { useState, useEffect } from "react";
import "./caso.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Caso({ casoData, onDelete }) {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [costItems, setCostItems] = useState([]);
  const [totalProductionCosts, setTotalProductionCosts] = useState(0);

  useEffect(() => {
    const fetchCostItems = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/costs_items/farmer-crop/${
            casoData.id
          }`
        );
        setCostItems(response.data);
        // Calcular el total de los costos de producción
        const total = response.data.reduce(
          (sum, item) => sum + item.price_per_unit * item.units,
          0
        );
        setTotalProductionCosts(total);
      } catch (error) {
        console.error("Error al obtener los costos:", error);
      }
    };

    fetchCostItems();
  }, [casoData.id]);

  const handleEdit = () => {
    navigate(`/caso/${casoData.id}/edit`, {
      state: { casoData },
    });
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/farmers_crops/${casoData.id}`
      );

      if (response.status === 200) {
        console.log("Cultivo de productor eliminado");
        if (onDelete) {
          onDelete(casoData.id);
        }
      } else if (response.status === 404) {
        console.log("Cultivo de productor no encontrado");
      } else {
        console.log("Error al eliminar el cultivo de productor");
      }
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="crop-card">
      <h3 className="crop-title"> Cultivo: {casoData.crop_name}</h3>
      <div className="crop-data">
        <div className="crop-row">
          <span className="crop-label">ID</span>
          <span className="crop-value">{casoData.id}</span>
        </div>
        {/* <div className="crop-row">
          <span className="crop-label">user_id</span>
          <span className="crop-value">{casoData.user_id}</span>
        </div> */}
        {/* <div className="crop-row">
          <span className="crop-label">crop_id</span>
          <span className="crop-value">{casoData.crop_id}</span>
        </div> */}
        <div className="crop-row">
          <span className="crop-label">Precio </span>
          <span className="crop-value">{casoData.price}</span>
        </div>
        <div className="crop-row">
          <span className="crop-label">Rinde</span>
          <span className="crop-value">{casoData.yield}</span>
        </div>
        <div className="crop-row">
          <span className="crop-label">Ingreso Bruto</span>
          <span className="crop-value">{casoData.gross_income}</span>
        </div>
        <div className="crop-row">
          <span className="crop-label">Valor arrendamiento</span>
          <span className="crop-value">{casoData.lease_cost_usd}</span>
        </div>
        <div className="crop-row">
          <span className="crop-label">Costos Insumos</span>
          <span className="crop-value">{totalProductionCosts.toFixed(2)}</span>
        </div>
        {isExpanded && costItems.length > 0 && (
          <div className="cost-items-detail">
            <h4>Detalle de Costos:</h4>
            {costItems.map((item, index) => (
              <div key={index} className="cost-item-row">
                <span>{item.name}</span>
                <span>${(item.price_per_unit * item.units).toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}
        <div className="crop-row">
          <span className="crop-label">Comercializacion</span>
          <span className="crop-value">{casoData.commercialization}</span>
        </div>
        <div className="crop-row">
          <span className="crop-label">Costos transporte</span>
          <span className="crop-value">{casoData.freight_costs}</span>
        </div>
        <div className="crop-row">
          <span className="crop-label">Ingreso neto</span>
          <span className="crop-value">{casoData.net_income}</span>
        </div>
      </div>
      <div className="margin-container">
        <div className="margin-label">
          <button className="expand-button" onClick={toggleExpand}>
            {isExpanded ? "-" : "+"}
          </button>
          {isExpanded && (
            <div className="action-buttons">
              <button className="edit-button" onClick={handleEdit}>
                Editar
              </button>
              <button className="delete-button" onClick={handleDelete}>
                Eliminar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Caso;
