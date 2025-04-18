// src/components/Caso.jsx
import React from "react";
import "./caso.css";

function Caso({ casoData , onEdit}) {
    const handleEditClick = (e) => {
        // Detener la propagación para evitar que el drag and drop se active
        e.stopPropagation();
        onEdit(casoData.id);
      };
  return (
    <div className="caso_div_padre caso">
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
      </div><br />
      <div>
      <button className="edit-button" onClick={handleEditClick}>
        Editar + {casoData.crop_id}
      </button>
      </div>
    </div>
  );
}

export default Caso;
