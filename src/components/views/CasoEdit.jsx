import React, { useState, useEffect } from "react";
import "./caso.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function CasoEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [casoData, setCasoData] = useState(null);
  const [editedData, setEditedData] = useState({
    name: "",
    price: "",
  });

  useEffect(() => {
    const fetchCasoData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/crops/${id}`
        );
        setCasoData(response.data);
        setEditedData({
          name: response.data.crop_name,
          price: response.data.price,
        });
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        alert("Error al cargar los datos del cultivo");
      }
    };

    fetchCasoData();
  }, [id]);

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
        `${import.meta.env.VITE_API_URL}/crops/${id}`,
        editedData
      );
      if (response.data) {
        alert("Cultivo actualizado con éxito");
        navigate(`/caso/${id}`);
      }
    } catch (error) {
      console.error("Error al actualizar el cultivo:", error);
      alert(
        "Error al actualizar el cultivo: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  if (!casoData) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="caso_div_padre caso">
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
        <div className="button-group">
          <button type="submit" className="save-button">
            Guardar
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
