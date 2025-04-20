import React, { useState, useEffect } from "react";
import axios from "axios";
import "./dashboard.css";

function Dashboard() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCrop, setEditingCrop] = useState(null);
  const [editedData, setEditedData] = useState({
    name: "",
    price: "",
    rinde_promedio: "",
  });

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/crops`
        );
        setCrops(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los cultivos:", error);
        setLoading(false);
      }
    };

    fetchCrops();
  }, []);

  const handleEditClick = (crop) => {
    setEditingCrop(crop.id);
    setEditedData({
      name: crop.name,
      price: crop.price,
      rinde_promedio: crop.rinde_promedio,
    });
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
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/crops/${editingCrop}`,
        editedData
      );

      if (response.data) {
        // Actualizar la lista de cultivos
        setCrops(
          crops.map((crop) =>
            crop.id === editingCrop ? { ...crop, ...editedData } : crop
          )
        );
        setEditingCrop(null);
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

  if (loading) {
    return <div>Cargando cultivos...</div>;
  }

  return (
    <div className="dashboard-container">
        <h2>Dashboard Administradores </h2>
      <h3>Lista de Cultivos</h3>
      <div className="crops-grid">
        {crops.map((crop) => (
          <div key={crop.id} className="crop_card">
            {editingCrop === crop.id ? (
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
                <div className="form-group">
                  <label>Rinde promedio:</label>
                  <input
                    type="number"
                    name="rinde_promedio"
                    value={editedData.rinde_promedio}
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
                    onClick={() => setEditingCrop(null)}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="crop_div_closed">
                  <div className="crop-info">
                    <h3>{crop.name}</h3>
                    <p>Precio: u$s {crop.price}</p>
                    <p>Rinde promedio: {crop.rinde_promedio} kg</p>
                    <br />
                  </div>
                  <div className="button-container">
                    <button
                      className="edit-button"
                      onClick={() => handleEditClick(crop)}
                    >
                      Editar
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
