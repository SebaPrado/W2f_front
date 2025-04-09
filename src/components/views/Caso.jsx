// src/components/Caso.jsx
import React from "react";
import "./caso.css"

function Caso({ casoData }) {
  return (
    <div className="caso_div_padre">
      <div className="caso_div_hijo">
        <div key={casoData.id}>ID: {casoData.id}</div>
        <div>user_id: {casoData.user_id}</div>
        <div>crop_id: {casoData.crop_id}</div>
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
    </div>
  );
}

export default Caso;