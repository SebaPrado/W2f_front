import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./crear_caso.css";
import { Button } from "@mui/material";
import { useAutoAnimate } from "@formkit/auto-animate/react";

function CrearCaso() {
  const userId = useSelector((state) => state.user.identification);

  // Add these refs for auto-animate
  const [costListRef] = useAutoAnimate();
  const [formContainerRef] = useAutoAnimate();

  //------------------         Estados para manejar la selección y datos del cultivo        ------------------//

  const [crops, setCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [cropDetails, setCropDetails] = useState(null);
  const [rinde, setRinde] = useState("");
  const [loading, setLoading] = useState(true);
  const [isManualPrice, setIsManualPrice] = useState(false);
  const [manualPrice, setManualPrice] = useState(0);

  // ------------- Nueva sección para manejar costos de producción dinámicos ------------------//
  const [showCostForm, setShowCostForm] = useState(false);
  const [costItems, setCostItems] = useState([]);
  const [newCostItem, setNewCostItem] = useState({
    name: "",
    pricePerUnit: "",
    dosage: "",
  });

  // Lista de cultivos disponibles con IDs asignados
  const cultivoOptions = [
    { id: 1, name: "Soja" },
    { id: 2, name: "Maíz" },
    { id: 3, name: "Sorgo" },
    { id: 4, name: "Trigo" },
    { id: 5, name: "Cebada" },
    { id: 6, name: "Canola" },
    { id: 7, name: "Girasol" },
    { id: 8, name: "Arroz" },
    { id: 9, name: "Calinata" },
    { id: 10, name: "Avena" },
    { id: 11, name: "Centeno" },
  ];

  //-----------            Obtener la lista de cultivos al cargar el componente            ------------------//
  // This useEffect is not really needed since we're using the cultivoOptions array now
  // We could keep it if you want to fetch all crops initially
  useEffect(() => {
    // You can leave this empty or remove it if you don't need to fetch all crops initially
  }, []);

  // -------------            Manejar la selección de cultivo          ------------------//
  const handleCropSelection = async (cropId, cropName) => {
    try {
      setLoading(true);
      // Now we fetch the specific crop data by ID
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/crops/${cropId}`
      );

      console.log("Cultivo obtenido:", response.data);

      // Set the selected crop and its details
      if (response.data) {
        setSelectedCrop(response.data.name);
        setCropDetails(response.data);

        // Establecer el rinde predeterminado si existe
        if (response.data.rinde_promedio) {
          setRinde(response.data.rinde_promedio.toString());
        } else {
          setRinde("");
        }
      }
    } catch (error) {
      console.error("Error al seleccionar cultivo:", error);
    } finally {
      setLoading(false);
    }
  };

  // -------------            Manejar cambio en el campo de rinde            ------------------//

  const handleRindeChange = (e) => {
    setRinde(e.target.value);
  };

  const handlePriceChange = (e) => {
    setManualPrice(e.target.value);
  };

  // -------------          Manejar los costos de producción          ------------------//

  const handleCostItemChange = (e) => {
    const { name, value } = e.target;
    setNewCostItem({
      ...newCostItem,
      [name]: value,
    });
  };

  const addCostItem = (e) => {
    e.preventDefault();
    if (newCostItem.name && newCostItem.pricePerUnit && newCostItem.dosage) {
      const newItem = {
        ...newCostItem,
        id: Date.now(),
        total:
          parseFloat(newCostItem.pricePerUnit) * parseFloat(newCostItem.dosage),
      };
      setCostItems([...costItems, newItem]);
      // Reset form
      setNewCostItem({
        name: "",
        pricePerUnit: "",
        dosage: "",
      });
      setShowCostForm(false);
    }
  };

  const removeCostItem = (id) => {
    setCostItems(costItems.filter((item) => item.id !== id));
  };

  // Calcular el total de costos de producción
  const calculateTotalProductionCosts = () => {
    return costItems.reduce((total, item) => total + item.total, 0);
  };

  // Calcular ingreso basado en rinde y precio
  const calcularIngreso = () => {
    if (!cropDetails || !rinde) return 0;
    const precio = isManualPrice
      ? parseFloat(manualPrice)
      : parseFloat(cropDetails.price);
    return parseFloat(rinde) * precio;
  };

  // Calcular ingreso neto (ingreso bruto - costos de producción)
  const calcularIngresoNeto = () => {
    const ingresoBruto = calcularIngreso();
    const costosProduccion = calculateTotalProductionCosts();
    return ingresoBruto - costosProduccion;
  };

  // -------------            Manejar envío del formulario            ------------------//

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCrop || !rinde) {
      alert("Por favor complete todos los campos");
      return;
    }

    // Verificar los valores antes de enviar
    console.log("userId:", userId);
    console.log("cropDetails:", cropDetails);

    if (!userId || !cropDetails || !cropDetails.id) {
      alert("El user_id y el crop_id son obligatorios.");
      return;
    }

    try {
      const ingresosBrutos = calcularIngreso();
      const costosProduccion = calculateTotalProductionCosts();

      const dataToSend = {
        user_id: Number(userId),
        crop_id: Number(cropDetails.id),
        
        yield: Number(rinde),
        price: Number(isManualPrice ? manualPrice : cropDetails.price),
        production_costs: costosProduccion,
        gross_income: ingresosBrutos,
        commercialization: 0,
        freight_costs: 0,
        net_income: ingresosBrutos - costosProduccion,
        lease_cost_usd: 0,
        lease_cost_kg: 0,
        cost_items: costItems,
      };

      console.log("Datos a enviar:", dataToSend);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/farmers_crops`,
        dataToSend
      );

      console.log("Respuesta del servidor:", response.data);

      alert("Cultivo agregado exitosamente");
      // Resetear formulario
      setSelectedCrop(null);
      setCropDetails(null);
      setRinde("");
      setManualPrice("");
      setIsManualPrice(false);
      setCostItems([]);
    } catch (error) {
      console.error("Error al crear caso:", error);
      console.error("Detalles del error:", error.response?.data);
      alert(
        `Error al crear el caso: ${
          error.response?.data?.message || "Error desconocido"
        }`
      );
    }
  };

  return (
    <div className="crear_caso_container">
      <h2 className="crear_caso_title">Crear Nuevo Caso</h2>

      <div className="cultivos_selection_container">
        <h3>Seleccione un cultivo:</h3>
        <div className="cultivos_grid">
          {cultivoOptions.map((cultivo) => (
            <div
              key={cultivo.id}
              className={`cultivo_card ${
                selectedCrop === cultivo.name ? "selected" : ""
              }`}
              onClick={() => handleCropSelection(cultivo.id, cultivo.name)}
            >
              <div className="cultivo_icon">🌱</div>
              <div className="cultivo_name">{cultivo.name}</div>
            </div>
          ))}
        </div>
      </div>

      {selectedCrop && cropDetails && (
        <div className="cultivo_form_container">
          <h3>Detalles del cultivo: {selectedCrop}</h3>

          <form onSubmit={handleSubmit} className="cultivo_form">
            <div className="form_group">
              <label>Rendimiento estimado (tt/ha) :</label>

              <input
                type="number"
                className="form_control"
                placeholder="Ingrese el rinde"
                value={rinde}
                onChange={handleRindeChange}
                min="0"
                step="0.1"
                required
              />
            </div>

            <div className="form_group">
              <label>Precio del grano:</label>
              <Button
                variant="contained"
                color={isManualPrice ? "primary" : "secondary"}
                onClick={() => setIsManualPrice(!isManualPrice)}
              >
                {isManualPrice ? "Precio Manual" : "Precio API"}
              </Button>
              <input
                type="number"
                className="form_control"
                value={isManualPrice ? manualPrice : cropDetails.price}
                onChange={handlePriceChange}
                disabled={!isManualPrice}
                min="0"
                step="1"
              />
            </div>

            <div className="form_group">
              <label>Ingreso estimado:</label>
              <input
                type="text"
                className="form_control"
                value={`$${calcularIngreso().toFixed(2)}`}
                disabled
              />
            </div>

            {/* Nueva sección: Costos de producción */}
            <div className="production_costs_section">
              <h3>Costos de producción</h3>

              <div ref={formContainerRef}>
                {/* Botón para mostrar el formulario de nuevo costo */}
                {!showCostForm && (
                  <button
                    type="button"
                    className="add_cost_btn"
                    onClick={() => setShowCostForm(true)}
                  >
                    + Nuevo insumo
                  </button>
                )}

                {/* Formulario para agregar nuevo costo */}
                {showCostForm && (
                  <div className="cost_form">
                    <div className="form_row">
                      <div className="form_group">
                        <label>Nombre del insumo:</label>
                        <input
                          type="text"
                          name="name"
                          className="form_control"
                          value={newCostItem.name}
                          onChange={handleCostItemChange}
                          placeholder="Ej: Fertilizante"
                          required
                        />
                      </div>
                      <div className="form_group">
                        <label>Precio por unidad:</label>
                        <input
                          type="number"
                          name="pricePerUnit"
                          className="form_control"
                          value={newCostItem.pricePerUnit}
                          onChange={handleCostItemChange}
                          placeholder="Ej: 45.50"
                          min="0"
                          step="0.01"
                          required
                        />
                      </div>
                      <div className="form_group">
                        <label>Dosis:</label>
                        <input
                          type="number"
                          name="dosage"
                          className="form_control"
                          value={newCostItem.dosage}
                          onChange={handleCostItemChange}
                          placeholder="Ej: 2.5"
                          min="0"
                          step="0.1"
                          required
                        />
                      </div>
                    </div>
                    <div className="form_buttons">
                      <button
                        type="button"
                        className="cancel_btn"
                        onClick={() => setShowCostForm(false)}
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        className="add_btn"
                        onClick={addCostItem}
                      >
                        Agregar
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Lista de insumos */}
              <div className="cost_items_list" ref={costListRef}>
                {costItems.map((item) => (
                  <div key={item.id} className="cost_item">
                    <div className="cost_item_details">
                      <div className="cost_item_name">{item.name}</div>
                      <div className="cost_item_specs">
                        ${item.pricePerUnit} × {item.dosage} = $
                        {item.total.toFixed(2)}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="remove_item_btn"
                      onClick={() => removeCostItem(item.id)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              {/* Total de costos de producción */}
              {costItems.length > 0 && (
                <div className="production_costs_total">
                  <strong>Total costos de producción:</strong> $
                  {calculateTotalProductionCosts().toFixed(2)}
                </div>
              )}
            </div>

            {/* Ingreso neto (actualizado con costos de producción) */}
            <div className="form_group">
              <label>Ingreso neto estimado:</label>
              <input
                type="text"
                className="form_control"
                value={`$${calcularIngresoNeto().toFixed(2)}`}
                disabled
              />
            </div>

            <button type="submit" className="crear_caso_btn">
              Guardar Caso
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default CrearCaso;
