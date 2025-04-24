import React, { useState, useEffect } from "react";
import "./caso.css";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import { useAutoAnimate } from "@formkit/auto-animate/react";

function CasoEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const initialCasoData = location.state?.casoData;

  // Referencias para animaciones
  const [costListRef] = useAutoAnimate();
  const [formContainerRef] = useAutoAnimate();

  // Estados principales
  const [casoData, setCasoData] = useState(initialCasoData);
  const [isManualPrice, setIsManualPrice] = useState(false);
  const [editedData, setEditedData] = useState({
    crop_name: initialCasoData ? initialCasoData.crop_name : "",
    price: initialCasoData ? initialCasoData.price : "",
    yield: initialCasoData ? initialCasoData.yield : "",
    lease_cost_usd: initialCasoData ? initialCasoData.lease_cost_usd : 0,
    commercialization: initialCasoData ? initialCasoData.commercialization : 0,
    freight_costs: initialCasoData ? initialCasoData.freight_costs : 0,
  });

  // Estados para costos de producción
  const [showCostForm, setShowCostForm] = useState(false);
  const [costItems, setCostItems] = useState([]);
  const [newCostItem, setNewCostItem] = useState({
    name: "",
    precio_unidad: "",
    unidades: "",
  });

  useEffect(() => {
    const fetchCasoData = async () => {
      try {
        // Obtener datos básicos del caso
        const casoResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/farmers_crops/${id}`
        );

        // Obtener los items de costo asociados
        const costItemsResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/costs-items/farmer-crops/${id}`
        );
        console.log("costItemsResponse Seba", costItemsResponse.data);

        setCasoData(casoResponse.data);
        setEditedData({
          crop_name: casoResponse.data.crop_name,
          price: casoResponse.data.price,
          yield: casoResponse.data.yield,
          lease_cost_usd: casoResponse.data.lease_cost_usd,
          commercialization: casoResponse.data.commercialization,
          freight_costs: casoResponse.data.freight_costs,
        });
        setCostItems(costItemsResponse.data || []);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        alert("Error al cargar los datos del cultivo");
      }
    };

    if (!initialCasoData) {
      fetchCasoData();
    } else {
      // Si tenemos datos iniciales, intentamos obtener los cost items
      const fetchCostItems = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/costs_items/farmer-crop/${id}`
          );
          setCostItems(response.data || []);
        } catch (error) {
          console.error("Error al cargar los costos:", error);
        }
      };
      fetchCostItems();
    }
  }, [id, initialCasoData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejo de costos de producción
  const handleCostItemChange = (e) => {
    const { name, value } = e.target;
    setNewCostItem({
      ...newCostItem,
      [name]: value,
    });
  };

  const addCostItem = async (e) => {
    e.preventDefault();
    if (newCostItem.name && newCostItem.precio_unidad && newCostItem.unidades) {
      try {
        // Crear el objeto con los datos necesarios
        const costItemData = {
          name: newCostItem.name,
          precio_unidad: parseFloat(newCostItem.precio_unidad),
          unidades: parseFloat(newCostItem.unidades),
          farmerCropId: parseInt(id), // Corregido el nombre del campo y asegurándonos que sea número
          total:
            parseFloat(newCostItem.precio_unidad) *
            parseFloat(newCostItem.unidades),
        };

        console.log("Enviando datos:", costItemData); // Para debug

        // Hacer el POST a la API
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/costs_items`,
          costItemData
        );

        // Agregar el nuevo item a la lista local
        setCostItems([...costItems, response.data]);

        // Limpiar el formulario
        setNewCostItem({
          name: "",
          precio_unidad: "",
          unidades: "",
        });
        setShowCostForm(false);
      } catch (error) {
        console.error("Error completo:", error); // Para ver más detalles del error
        alert(
          "Error al crear el costo: " +
            (error.response?.data?.message || error.message)
        );
      }
    }
  };

  const removeCostItem = async (itemId) => {
    try {
      // Llamada a la API para eliminar el costo
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/costs_items/${itemId}`
      );

      if (response.data) {
        // Si la eliminación fue exitosa, actualizamos el estado local
        setCostItems(costItems.filter((item) => item.id !== itemId));
      }
    } catch (error) {
      console.error("Error al eliminar el costo:", error);
      alert(
        "Error al eliminar el costo: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const calculateTotalProductionCosts = () => {
    return costItems.reduce(
      (total, item) =>
        total + parseFloat(item.precio_unidad) * parseFloat(item.unidades),
      0
    );
  };

  // Cálculos financieros
  const calcularIngresoBruto = () => {
    return editedData.yield * editedData.price;
  };

  const calcularIngresoNeto = () => {
    const ingresoBruto = calcularIngresoBruto();
    const costosTotales =
      calculateTotalProductionCosts() +
      parseFloat(editedData.lease_cost_usd || 0) +
      parseFloat(editedData.commercialization || 0) +
      parseFloat(editedData.freight_costs || 0);
    return ingresoBruto - costosTotales;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToUpdate = {
        ...editedData,
        production_costs: calculateTotalProductionCosts(),
        gross_income: calcularIngresoBruto(),
        net_income: calcularIngresoNeto(),
        cost_items: costItems,
      };

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/farmers_crops/${id}`,
        dataToUpdate
      );

      if (response.data) {
        alert("Caso actualizado con éxito");
        navigate(`/caso/${id}`);
      }
    } catch (error) {
      console.error("Error al actualizar el caso:", error);
      alert(
        "Error al actualizar el caso: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  if (!casoData && !initialCasoData) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="caso_edit_container">
      <h2>Editar Caso: {editedData.crop_name}</h2>

      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-group">
          <label>Rinde (tt/ha):</label>
          <input
            type="number"
            name="yield"
            value={editedData.yield}
            onChange={handleInputChange}
            required
            min="0"
            step="0.1"
          />
        </div>

        <div className="form-group">
          <label>Precio:</label>
          <div className="price-input-group">
            <Button
              variant="contained"
              color={isManualPrice ? "primary" : "secondary"}
              onClick={() => setIsManualPrice(!isManualPrice)}
            >
              {isManualPrice ? "Precio Manual" : "Precio API"}
            </Button>
            <input
              type="number"
              name="price"
              value={editedData.price}
              onChange={handleInputChange}
              disabled={!isManualPrice}
              min="0"
              step="5"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Valor arrendamiento (USD):</label>
          <input
            type="number"
            name="lease_cost_usd"
            value={editedData.lease_cost_usd}
            onChange={handleInputChange}
            min="0"
            step="5"
          />
        </div>

        <div className="form-group">
          <label>Comercialización:</label>
          <input
            type="number"
            name="commercialization"
            value={editedData.commercialization}
            onChange={handleInputChange}
            min="0"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label>Costos de transporte:</label>
          <input
            type="number"
            name="freight_costs"
            value={editedData.freight_costs}
            onChange={handleInputChange}
            min="0"
            step="0.01"
          />
        </div>

        {/* Sección de costos de producción */}
        <div className="production-costs-section" ref={formContainerRef}>
          <h3>Costos de producción</h3>
          <h6>{JSON.stringify(costItems, null, 2)}</h6>

          {!showCostForm && (
            <button
              type="button"
              className="add-cost-btn"
              onClick={() => setShowCostForm(true)}
            >
              + Nuevo insumo
            </button>
          )}

          {showCostForm && (
            <div className="cost-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Nombre del insumo:</label>
                  <input
                    type="text"
                    name="name"
                    value={newCostItem.name}
                    onChange={handleCostItemChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Precio por unidad:</label>
                  <input
                    type="number"
                    name="precio_unidad"
                    value={newCostItem.precio_unidad}
                    onChange={handleCostItemChange}
                    min="0"
                    step="0.5"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Unidades:</label>
                  <input
                    type="number"
                    name="unidades"
                    value={newCostItem.unidades}
                    onChange={handleCostItemChange}
                    min="0"
                    step="0.1"
                    required
                  />
                </div>
              </div>
              <div className="form-buttons">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowCostForm(false)}
                >
                  Cancelar
                </button>
                <button type="button" className="add-btn" onClick={addCostItem}>
                  Agregar
                </button>
              </div>
            </div>
          )}

          {/* Lista de costos */}
          <div className="cost-items-list" ref={costListRef}>
            {costItems.map((item) => (
              <div key={item.id} className="cost-item">
                <div className="cost-item-details">
                  <div className="cost-item-name">{item.name}</div>
                  <div className="cost-item-specs">
                    Precio por unidad: ${item.precio_unidad} | Dosis:{" "}
                    {item.unidades} | Total: $
                    {(
                      parseFloat(item.precio_unidad) * parseFloat(item.unidades)
                    ).toFixed(2)}
                  </div>
                </div>
                <button
                  type="button"
                  className="remove-item-btn"
                  onClick={() => removeCostItem(item.id)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {costItems.length > 0 && (
            <div className="production-costs-total">
              <strong>Total costos de producción:</strong> $
              {calculateTotalProductionCosts().toFixed(2)}
            </div>
          )}
        </div>

        {/* Resumen financiero */}
        <div className="financial-summary">
          <div className="form-group">
            <label>Ingreso Bruto:</label>
            <input
              type="text"
              //   value={`$${calcularIngresoBruto().toFixed(2)}`}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Ingreso Neto:</label>
            <input
              type="text"
              //   value={`$${calcularIngresoNeto().toFixed(2)}`}
              disabled
            />
          </div>
        </div>

        <div className="form-buttons">
          <button type="submit" className="save-button">
            Guardar Cambios
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate(`/caso/${id}`)}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default CasoEdit;
