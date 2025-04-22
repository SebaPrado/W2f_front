import React, { useState, useEffect } from "react";
import axios from "axios";
import "./dashboard.css";

function Dashboard() {
  const [cropPrices, setCropPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState({ id: null, active: false });
  const [formData, setFormData] = useState({ crop_id: "", price_uss: "" });

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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Activar modo de edición para un precio
  const handleEdit = (price) => {
    setEditMode({ id: price.id, active: true });
    setFormData({
      crop_id: price.crop_id,
      price_uss: price.price_uss,
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
        await axios.delete(`${import.meta.env.VITE_API_URL}/crops_prices/${id}`);
        setCropPrices(cropPrices.filter((price) => price.id !== id));
      } catch (error) {
        console.error("Error al eliminar precio:", error);
        setError("Error al eliminar el precio");
      }
    }
  };

  // Crear un nuevo precio
  const handleCreate = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/crops_prices`,
        formData
      );
      setCropPrices([...cropPrices, response.data]);
      setFormData({ crop_id: "", price_uss: "" });
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
    <div className="dashboard-container">
      <h2>Precios de Cultivos</h2>

      {/* Formulario para crear nuevo precio */}
      <div className="create-form">
        <h3>Agregar Nuevo Precio</h3>
        <div className="form-group">
          <label>ID del Cultivo:</label>
          <input
            type="number"
            name="crop_id"
            value={formData.crop_id}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Precio (USD):</label>
          <input
            type="number"
            step="0.01"
            name="price_uss"
            value={formData.price_uss}
            onChange={handleInputChange}
          />
        </div>
        <button className="save-button" onClick={handleCreate}>
          Crear Precio
        </button>
      </div>

      {/* Tabla de precios */}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cultivo</th>
              <th>Precio (USD)</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cropPrices.map((price) => (
              <tr key={price.id}>
                <td>{price.id}</td>
                <td>
                  {price.Crop
                    ? price.Crop.name
                    : `Cultivo ID: ${price.crop_id}`}
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
                <td>{formatDate(price.created_at)}</td>
                <td>
                  {editMode.active && editMode.id === price.id ? (
                    <div className="button-group">
                      <button
                        className="save-button"
                        onClick={() => handleSave(price.id)}
                      >
                        Guardar
                      </button>
                      <button className="cancel-button" onClick={handleCancel}>
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
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
