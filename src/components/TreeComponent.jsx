import React, { useState } from "react";
import Tree from "react-d3-tree";

const treeData = [
  {
    name: "Users",
    children: [
      {
        name: "Farmer_Crops",
        info: "Relación entre usuarios y cultivos",
        children: [
          {
            name: "Crop",
            info: "Cultivo en cuestion",
            children: [
              {
                name: "name (trigo, cebada, caniola, soja , maiz, sorgo) ",
                info: "Nombre del cultivo",
              },
            ],
          },
          {
            name: "Revenue",
            info: "toneladas * precio",
            children: [
              {
                name: "total tons (tt)",
                info: "hectareas totales * rendimiento",
              },
              { name: "price (u$s/tt)", info: "Precio por tonelada (API)" },
            ],
          },
          {
            name: "Production Costs (U$s/ha)",
            info: "Costos de producción (USD/tt)",
            children: [
              {
                name: "Fertilizations (U$s/ha)",
                info: "sumatoria de fertilizaciones aplicadas ",
                children: [
                  {
                    name: "Fert 1 ",
                    info: " (U$s/ha)",
                    children: [
                      {
                        name: "application_number",
                        info: "Número de aplicación : 1a",
                      },
                      { name: "fertilizer", info: "urea/uan/kCl" },
                      { name: "dose (kg/ha)", info: "Dosis (kg/ha)" },
                      { name: "cost per kg (u$s)", info: "Costo por tt/1000" },
                      {
                        name: "application_cost (u$s/ha)",
                        info: "contratista/maquinaria propia",
                      },
                      {
                        name: "transport_cost (u$s/tt)",
                        info: "Costo de flete",
                      },
                    ],
                  },
                  {
                    name: "Fert 2 ",
                    info: " (U$s/ha)",
                    children: [
                      {
                        name: "application_number",
                        info: "Número de aplicación : 2a ",
                      },
                      { name: "fertilizer", info: "urea/uan/kCl" },
                      { name: "dose (kg/ha)", info: "Dosis (kg/ha)" },
                      { name: "cost per kg (u$s)", info: "Costo por tt/1000" },
                      {
                        name: "application_cost (u$s/ha)",
                        info: "contratista/maquinaria propia",
                      },
                      {
                        name: "transport_cost (u$s/tt)",
                        info: "Costo de flete (+- 0)",
                      },
                    ],
                  },
                ],
              },
              {
                name: "Agrochemicals (U$s/ha)",
                info: "sumatoria de Agroquímicos aplicadas ",
                children: [
                  {
                    name: "Spraying 1 ",
                    info: " (U$s/ha)",
                    children: [
                      {
                        name: "application_number",
                        info: "Número de aplicación : 1a",
                      },
                      { name: "agrochemical", info: "agroquímico aplicado" },
                      { name: "dose (lt/ha)", info: "Dosis (lt/ha)" },
                      { name: "cost per lt (u$s)", info: "Costo por litro" },
                      {
                        name: "application_cost (u$s/ha)",
                        info: "Costo de pulverizacion",
                      },
                      {
                        name: "transport_cost (u$s/lt)",
                        info: "Costo de flete",
                      },
                    ],
                  },
                  {
                    name: "Spraying 2 ",
                    info: " (U$s/ha)",
                    children: [
                      {
                        name: "application_number",
                        info: "Número de aplicación : 2a",
                      },
                      { name: "agrochemical", info: "agroquímico aplicado" },
                      { name: "dose (lt/ha)", info: "Dosis (lt/ha)" },
                      { name: "cost per lt (u$s)", info: "Costo por litro" },
                      {
                        name: "application_cost (u$s/ha)",
                        info: "Costo de pulverizacion",
                      },
                      {
                        name: "transport_cost (u$s/lt)",
                        info: "Costo de flete (+- 0)",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          
          {
            name: "Lease price",
            info: "Costo de arrendamiento",
            children: [
              {
                name: "lease price (u$s/ha)",
                info: "Costo de arrendamiento",
              },
              {
                name: "alternative : lease price (kg/ha)",
                info: "Costo de arrendamiento (kg/ha)",
              },
            ],
          },
          {
            name: "Extra_Costs",
            info: "Gastos adicionales",
            children: [
              { name: "concept", info: "Concepto del gasto" },
              { name: "cost", info: "Costo en USD/ha" },
            ],
          },
          {
            name: "Net Income",
            info: "Ingreso neto después de costos",
            children: [{ name: "net_income", info: "Ingreso neto (USD/ha)" }],
          },
        ],
      },
    ],
  },
  {
    name: "Commercialization",
    info: "Proceso de comercialización",
    children: [
      { name: "freight_costs", info: "Costos de flete (USD/tt)" },
      { name: "net_income", info: "Ingreso neto después de costos" },
    ],
  },
];

const TreeComponent = () => {
  const containerStyles = {
    width: "100vw",
    height: "600px",
    position: "relative",
    background: "pink"
  };
  const [tooltip, setTooltip] = useState({
    visible: false,
    text: "",
    x: 0,
    y: 0,
  });

  const handleMouseEnter = (node, event) => {
    setTooltip({
      visible: true,
      text: node.info || "Sin información",
      x: event.clientX + 10,
      y: event.clientY - 10,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false, text: "", x: 0, y: 0 });
  };

  const renderCustomNode = ({ nodeDatum }) => (
    <g
      onMouseEnter={(e) => handleMouseEnter(nodeDatum, e)}
      onMouseLeave={handleMouseLeave}
    >
      <circle r="15" fill="lightblue" stroke="black" strokeWidth="2" />
      <text
        x="20px"
        dy=".35em"
        fontSize="14px"
        stroke="black"
        fill="red"
        border="red"
      >
        {nodeDatum.name}
      </text>
    </g>
  );

  return (
    <div style={containerStyles}>
      {tooltip.visible && (
        <div
          style={{
            position: "absolute",
            top: tooltip.y,
            left: tooltip.x,
            background: "rgba(38, 92, 25, 0.7)",
            color: "white",
            padding: "5px",
            borderRadius: "5px",
            fontSize: "12px",
          }}
        >
          {tooltip.text}
        </div>
      )}
      <Tree
        data={treeData}
        orientation="horizontal"
        renderCustomNodeElement={renderCustomNode}
        translate={{ x: 20, y: 750 }} // Ajusta la posición vertical del árbol
        separation={{ siblings: 0.12, nonSiblings: 0.4 }} // Reduce la separación vertical
        depthFactor={250} // Reduce la distancia entre las ramas en el eje Y
       
      />
    </div>
  );
};

export default TreeComponent;

//----------------------------------------------------------------------------------------------------------------//
