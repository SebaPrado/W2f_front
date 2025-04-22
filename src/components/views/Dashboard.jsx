import React, { useState, useEffect } from "react";
import axios from "axios";
import "./dashboard.css";

function Dashboard() {
  const [cropPrices, setCropPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState({ id: null, active: false });
  const [formData, setFormData] = useState({
    crop_id: "",
    price_uss: "",
    created_at: new Date().toISOString().split("T")[0],
  });

  // Mapeo de IDs a nombres de cultivos
  const cropNames = {
    1: "Soja",
    2: "Maíz",
    3: "Sorgo",
    4: "Trigo",
    5: "Cebada",
    6: "Canola",
    7: "Girasol",
    8: "Arroz",
    9: "Calinata",
    10: "Avena",
    11: "Centeno",
  };

  // Obtener todos los precios de cultivos al cargar el componente
  useEffect(() => {
    const fetchCropPrices = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/crops_prices`
        );
        setCropPrices(response.data);
        setError(null);
      } catch (error) {
        console.error("Error al obtener precios de cultivos:", error);
        setError("Error al cargar los precios de cultivos");
      } finally {
        setLoading(false);
      }
    };

    fetchCropPrices();
  }, []);

  // Manejar cambios en el formulario
  const handleInputChange = (e, cropId = null) => {
    const { name, value } = e.target;
    if (cropId) {
      // Si estamos manejando un formulario específico de cultivo
      setFormData({
        ...formData,
        [name]: value,
        crop_id: cropId,
        created_at: new Date().toISOString().split("T")[0],
      });
    } else {
      // Para el formulario general
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Activar modo de edición para un precio
  const handleEdit = (price) => {
    // Formatear la fecha para el input type="date" (YYYY-MM-DD)
    const dateObj = new Date(price.created_at);
    const formattedDate = dateObj.toISOString().split("T")[0];

    setEditMode({ id: price.id, active: true });
    setFormData({
      crop_id: price.crop_id,
      price_uss: price.price_uss,
      created_at: formattedDate,
    });
  };

  // Cancelar la edición
  const handleCancel = () => {
    setEditMode({ id: null, active: false });
  };

  // Guardar los cambios
  const handleSave = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/crops_prices/${id}`,
        formData
      );

      // Actualizar la lista de precios
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/crops_prices`
      );
      setCropPrices(response.data);

      // Salir del modo edición
      setEditMode({ id: null, active: false });
    } catch (error) {
      console.error("Error al actualizar precio:", error);
      setError("Error al guardar los cambios");
    }
  };

  // Eliminar un precio
  const handleDelete = async (id) => {
    if (window.confirm("¿Está seguro que desea eliminar este precio?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/crops_prices/${id}`
        );
        setCropPrices(cropPrices.filter((price) => price.id !== id));
      } catch (error) {
        console.error("Error al eliminar precio:", error);
        setError("Error al eliminar el precio");
      }
    }
  };

  // Crear un nuevo precio
  const handleCreate = async (cropId = null) => {
    try {
      const dataToSend = cropId
        ? {
            crop_id: cropId,
            price_uss: formData.price_uss,
            created_at: formData.created_at,
          }
        : formData;

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/crops_prices`,
        dataToSend
      );
      setCropPrices([...cropPrices, response.data]);

      // Solo resetear el precio, mantener la fecha actual
      setFormData({
        ...formData,
        price_uss: "",
        crop_id: cropId || "",
      });
    } catch (error) {
      console.error("Error al crear precio:", error);
      setError("Error al crear el nuevo precio");
    }
  };

  // Formatear fecha
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  // Filtrar precios por cultivo
  const getPricesByCrop = (cropId) => {
    return cropPrices
      .filter((price) => price.crop_id === cropId)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Ordenar por fecha, más reciente primero
  };

  // Obtener el último precio de un cultivo
  const getLastPrice = (cropId) => {
    const prices = getPricesByCrop(cropId);
    return prices.length > 0 ? prices[0].price_uss : "";
  };

  if (loading)
    return (
      <div className="dashboard-container">
        <h3>Cargando precios de cultivos...</h3>
      </div>
    );
  if (error)
    return (
      <div className="dashboard-container">
        <h3>Error: {error}</h3>
      </div>
    );

  return (

    <div>
      <h2>Precios de Cultivos</h2>
    <div className="dashboard-container">

      {/* Renderizar una tabla para cada cultivo */}
      {Object.entries(cropNames).map(([cropId, cropName]) => (
        <div key={cropId} className="crop-section">
          <h3>{cropName}</h3>

          {/* Formulario para agregar precio del día para este cultivo */}
          <div className="create-form crop-form">
            <div className="form-group">
              <label>Precio de hoy (USD):</label>
              <input
                type="number"
                step="0.01"
                name="price_uss"
                value={
                  formData.crop_id === parseInt(cropId)
                    ? formData.price_uss
                    : getLastPrice(parseInt(cropId))
                }
                onChange={(e) => handleInputChange(e, parseInt(cropId))}
                className="price-input"
              />
            </div>
            <div className="form-group date-display">
              <label>Fecha: {new Date().toLocaleDateString("es-ES")}</label>
            </div>
            <button
              className="save-button"
              onClick={() => handleCreate(parseInt(cropId))}
            >
              Guardar Precio
            </button>
          </div>

          {/* Tabla de precios para este cultivo */}
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Precio (USD)</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {getPricesByCrop(parseInt(cropId)).map((price) => (
                  <tr key={price.id}>
                    <td>
                      {editMode.active && editMode.id === price.id ? (
                        <input
                          type="date"
                          name="created_at"
                          value={formData.created_at}
                          onChange={handleInputChange}
                          className="edit-input"
                        />
                      ) : (
                        formatDate(price.created_at)
                      )}
                    </td>
                    <td>
                      {editMode.active && editMode.id === price.id ? (
                        <input
                          type="number"
                          step="0.01"
                          name="price_uss"
                          value={formData.price_uss}
                          onChange={handleInputChange}
                          className="edit-input"
                        />
                      ) : (
                        `$${price.price_uss}`
                      )}
                    </td>
                    <td>
                      {editMode.active && editMode.id === price.id ? (
                        <div className="button-group">
                          <button
                            className="save-button"
                            onClick={() => handleSave(price.id)}
                          >
                            Guardar
                          </button>
                          <button
                            className="cancel-button"
                            onClick={handleCancel}
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <div className="button-group">
                          <button
                            className="edit-button"
                            onClick={() => handleEdit(price)}
                          >
                            Editar
                          </button>
                          <button
                            className="cancel-button"
                            onClick={() => handleDelete(price.id)}
                          >
                            Eliminar
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {getPricesByCrop(parseInt(cropId)).length === 0 && (
                  <tr>
                    <td colSpan="3" className="text-center">
                      No hay precios registrados para este cultivo
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default Dashboard;
