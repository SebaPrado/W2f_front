import React, { useState, useEffect } from "react";
import axios from "axios";
import "./dashboard.css";
import Todo from "./Todo";
import { tasks as initialTasks } from "../../data/tasks";

function Dashboard() {
  const [cropPrices, setCropPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState({ id: null, active: false });
  const [showModal, setShowModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [localTasks, setLocalTasks] = useState(initialTasks);
  const [formData, setFormData] = useState({
    crop_id: "",
    price_uss: "",
    created_at: new Date().toISOString().split("T")[0],
  });
  const [newPrice, setNewPrice] = useState({
    price_uss: "",
    created_at: new Date().toISOString().split("T")[0],
  });
  const [bulkPrices, setBulkPrices] = useState({});
  const [users, setUsers] = useState([]);

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
        console.log("Iniciando petición de precios");
        setLoading(true);

        // Configuración de Axios
        const axiosConfig = {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          // Agregamos un timeout más largo para asegurar que las peticiones tengan tiempo de completarse
          timeout: 10000,
        };

        // Crear un array de promesas para todas las peticiones
        const promises = [];

        // Iteramos secuencialmente para evitar sobrecarga
        for (const cropId of Object.keys(cropNames)) {
          try {
            const response = await axios.get(
              `${import.meta.env.VITE_API_URL}/crops_prices/crop/${cropId}`,
              axiosConfig
            );
            promises.push(response.data);
          } catch (error) {
            console.error(
              `Error al obtener precios para cultivo ${cropNames[cropId]}:`,
              error
            );
            promises.push([]);
          }
          // Agregamos un pequeño delay entre peticiones
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        // Esperamos a que todas las promesas se resuelvan
        const responses = await Promise.all(promises);
        const allPrices = responses.flat();

        console.log("Total de precios cargados:", allPrices.length);
        console.log(
          "Precios por cultivo:",
          responses.map((r, i) => ({
            cultivo: cropNames[Object.keys(cropNames)[i]],
            cantidadPrecios: r.length,
          }))
        );

        setCropPrices(allPrices);
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

  // Inicializar bulkPrices con los últimos precios disponibles
  useEffect(() => {
    const getLatestPrices = () => {
      const latestPrices = {};
      Object.keys(cropNames).forEach((cropId) => {
        // Encontrar el último precio disponible para cada cultivo
        const pricesForCrop = cropPrices
          .filter((p) => p.crop_id == cropId)
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        if (pricesForCrop.length > 0) {
          latestPrices[cropId] = pricesForCrop[0].price_uss.toString();
        } else {
          // Valores por defecto si no hay precios previos
          if (cropId === "2" || cropId === "3") {
            latestPrices[cropId] = "200";
          } else if (cropId === "6" || cropId === "7") {
            latestPrices[cropId] = "530";
          } else {
            latestPrices[cropId] = "300";
          }
        }
      });
      return latestPrices;
    };

    setBulkPrices(getLatestPrices());
  }, [cropPrices]);

  const [bulkDate, setBulkDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Activar modo de edición para un precio
  const handleEdit = (price) => {
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
    setFormData({
      crop_id: "",
      price_uss: "",
      created_at: new Date().toISOString().split("T")[0],
    });
  };

  // Guardar los cambios
  const handleSave = async (id) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/crops_prices/${id}`,
        formData
      );

      // Actualizar el precio en el estado local
      setCropPrices((prevPrices) =>
        prevPrices.map((price) => (price.id === id ? response.data : price))
      );

      // Salir del modo edición
      handleCancel();
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
  const handleCreate = async (cropId, date) => {
    try {
      console.log("Creando precio para fecha:", date);
      const dataToSend = {
        crop_id: cropId,
        price_uss: formData.price_uss,
        created_at: date,
      };

      console.log("Datos a enviar:", dataToSend);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/crops_prices`,
        dataToSend
      );
      setCropPrices([...cropPrices, response.data]);

      // Resetear el precio
      setFormData({
        ...formData,
        price_uss: "",
      });

      // Salir del modo edición si estábamos creando un precio nuevo
      setEditMode({ id: null, active: false });
    } catch (error) {
      console.error("Error al crear precio:", error);
      setError("Error al crear el nuevo precio");
    }
  };

  // Formatear fecha para mostrar
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  // Obtener los últimos 8 días (incluyendo hoy)
  const getLastDays = () => {
    const days = [];
    for (let i = 0; i < 8; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push({
        date: date.toISOString().split("T")[0],
        label: i === 0 ? "Hoy" : i === 1 ? "Ayer" : formatDate(date),
      });
    }
    return days;
  };

  // Obtener el precio para un cultivo en una fecha específica
  const getPriceForCropAndDate = (cropId, date) => {
    const price = cropPrices.find(
      (p) => p.crop_id == cropId && p.created_at.split("T")[0] === date
    );
    return price || null;
  };

  // Función para manejar el envío del nuevo precio
  const handleSubmitNewPrice = async () => {
    try {
      console.log("Datos del formulario antes de enviar:", {
        crop_id: selectedCrop,
        price_uss: newPrice.price_uss,
        created_at: newPrice.created_at,
      });

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/crops_prices`,
        {
          crop_id: selectedCrop,
          price_uss: newPrice.price_uss,
          created_at: newPrice.created_at,
        }
      );

      console.log("Respuesta del servidor:", response.data);
      setCropPrices([...cropPrices, response.data]);
      setShowModal(false);
      // Resetear el formulario
      setNewPrice({
        price_uss: "",
        created_at: new Date().toISOString().split("T")[0],
      });
      setSelectedCrop(null);
    } catch (error) {
      console.error("Error completo al crear precio:", error.response || error);
      setError("Error al crear el nuevo precio");
    }
  };

  // Función para manejar el envío de precios en masa
  const handleSubmitBulkPrices = async () => {
    try {
      const promises = Object.entries(bulkPrices)
        .filter(([_, price]) => price !== "") // Solo enviar los precios que no estén vacíos
        .map(([cropId, price]) => {
          return axios.post(`${import.meta.env.VITE_API_URL}/crops_prices`, {
            crop_id: cropId,
            price_uss: price,
            created_at: bulkDate,
          });
        });

      await Promise.all(promises);

      // Actualizar la lista de precios
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/crops_prices`
      );
      setCropPrices(response.data);
      setShowBulkModal(false);

      // Resetear el formulario
      const resetBulkPrices = {};
      Object.keys(cropNames).forEach((cropId) => {
        resetBulkPrices[cropId] = "";
      });
      setBulkPrices(resetBulkPrices);
    } catch (error) {
      console.error("Error al crear precios en masa:", error);
      setError("Error al crear los nuevos precios");
    }
  };

  // Obtener usuarios
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users`
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    fetchUsers();
  }, []);

  if (loading)
    return (
      <div className="dashboard-container">
        <h3>Cargando precios de los cultivos...</h3>
      </div>
    );
  if (error)
    return (
      <div className="dashboard-container">
        <h3>Error: {error}</h3>
      </div>
    );

  const lastDays = getLastDays();

  return (
    <div className="dashboard-container">
      <div className="dashboard-section">
        <h2>Precios de Cultivos</h2>
        <button
          className="bulk-edit-btn"
          onClick={() => setShowBulkModal(true)}
        >
          Editar Todos los Precios
        </button>
        <div className="prices-table">
          {/* Cabeceras */}
          <div className="header-cell">Cultivo</div>
          {lastDays.map((day, index) => (
            <div key={`header-${index}`} className="header-cell">
              {day.label}
            </div>
          ))}

          {/* Filas de cultivos */}
          {Object.entries(cropNames).map(([cropId, cropName], rowIndex) => (
            <React.Fragment key={`crop-${cropId}`}>
              {/* Nombre del cultivo */}
              <div className="crop-name">
                {cropName}
                <button
                  className="add-crop-btn"
                  onClick={() => {
                    setSelectedCrop(cropId);
                    setShowModal(true);
                  }}
                  title="Agregar precio"
                >
                  +
                </button>
              </div>
              {/* <div> hola</div> */}

              {/* Celdas de precios para cada día */}
              {lastDays.map((day, colIndex) => {
                const price = getPriceForCropAndDate(cropId, day.date);
                const isEditing =
                  editMode.active && price && editMode.id === price.id;

                return (
                  <div
                    key={`price-${cropId}-${day.date}`}
                    className={`price-cell ${colIndex === 0 ? "today" : ""} ${
                      rowIndex % 2 === 1 ? "row-even" : "row-odd"
                    }`}
                  >
                    {isEditing ? (
                      <div className="edit-mode">
                        <input
                          type="number"
                          step="1"
                          name="price_uss"
                          value={formData.price_uss}
                          onChange={handleInputChange}
                          className="edit-input"
                        />
                        <div className="edit-actions">
                          <button
                            className="save-btn"
                            onClick={() => handleSave(price.id)}
                          >
                            Guardar
                          </button>
                          <button className="cancel-btn" onClick={handleCancel}>
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {price ? (
                          <>
                            ${price.price_uss}
                            <button
                              className="edit-btn"
                              onClick={() => handleEdit(price)}
                              title="Editar"
                            >
                              ✎
                            </button>
                          </>
                        ) : (
                          <div className="no-data">-</div>
                        )}

                        {/* Modo de edición para nuevo precio */}
                        {editMode.active &&
                          editMode.id === `new-${cropId}-${day.date}` && (
                            <div className="edit-mode">
                              <input
                                type="number"
                                step="0.01"
                                name="price_uss"
                                value={formData.price_uss}
                                onChange={handleInputChange}
                                className="edit-input"
                              />
                              <div className="edit-actions">
                                <button
                                  className="save-btn"
                                  onClick={() => {
                                    console.log(
                                      "Guardando con fecha:",
                                      day.date
                                    );
                                    handleCreate(cropId, day.date);
                                  }}
                                >
                                  Guardar
                                </button>
                                <button
                                  className="cancel-btn"
                                  onClick={handleCancel}
                                >
                                  Cancelar
                                </button>
                              </div>
                            </div>
                          )}
                      </>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Sección de usuarios antes del Todo list */}
      <div className="dashboard-section">
        <h2>Usuarios Registrados</h2>
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Contraseña</th>
                <th>Fecha de Registro</th>
                <th>Última Actualización</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>
                    {new Date(user.created_at).toLocaleDateString("es-AR")}
                  </td>
                  <td>
                    {new Date(user.updated_at).toLocaleDateString("es-AR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Listado de Tareas</h2>
        <Todo />
      </div>

      {/* -------------------------            show modal            -------------------------------- */}

      {/* Modal para edición en masa */}
      {showBulkModal && (
        <div className="modal-overlay">
          <div className="modal-content bulk-modal">
            <h3>Editar Precios de Todos los Cultivos</h3>
            <div className="form-group">
              <label>Fecha:</label>
              <input
                type="date"
                value={bulkDate}
                onChange={(e) => setBulkDate(e.target.value)}
                className="modal-input"
              />
            </div>
            <div className="bulk-prices-grid">
              {Object.entries(cropNames).map(([cropId, cropName]) => (
                <div key={cropId} className="bulk-price-item">
                  <label>{cropName}:</label>
                  <input
                    type="number"
                    step="1"
                    value={bulkPrices[cropId]}
                    onChange={(e) =>
                      setBulkPrices({
                        ...bulkPrices,
                        [cropId]: e.target.value,
                      })
                    }
                    className="modal-input"
                    placeholder={`Precio para ${cropName}`}
                  />
                </div>
              ))}
            </div>
            <div className="modal-actions">
              <button className="save-btn" onClick={handleSubmitBulkPrices}>
                Guardar Todos
              </button>
              <button
                className="cancel-btn"
                onClick={() => {
                  setShowBulkModal(false);
                  // Resetear los valores
                  const resetBulkPrices = {};
                  Object.keys(cropNames).forEach((cropId) => {
                    resetBulkPrices[cropId] = "";
                  });
                  setBulkPrices(resetBulkPrices);
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para agregar nuevo precio */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Agregar nuevo precio</h3>
            <div className="form-group">
              <label>Cultivo:</label>
              <span className="crop-name-label">{cropNames[selectedCrop]}</span>
            </div>
            <div className="form-group">
              <label>Fecha:</label>
              <input
                type="date"
                value={newPrice.created_at}
                onChange={(e) => {
                  console.log("Fecha seleccionada:", e.target.value);
                  setNewPrice({ ...newPrice, created_at: e.target.value });
                }}
                className="modal-input"
              />
            </div>
            <div className="form-group">
              <label>Precio (US$):</label>
              <input
                type="number"
                step="0.01"
                value={newPrice.price_uss}
                onChange={(e) =>
                  setNewPrice({ ...newPrice, price_uss: e.target.value })
                }
                className="modal-input"
              />
            </div>
            <div className="modal-actions">
              <button className="save-btn" onClick={handleSubmitNewPrice}>
                Guardar
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
