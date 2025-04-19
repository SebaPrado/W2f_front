import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Caso from "./Caso";
import "./casos.css";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";

function Casos() {
  const id = useSelector((state) => state.user.identification);
  const [loading, setLoading] = useState(true);
  // Estado para controlar qué cultivo se está editando
  const [editingCropId, setEditingCropId] = useState(null);

  // Initialize with empty array - we'll update this after fetching data
  const [parentRef, farmersCropsLists, setFarmersCropsLists, updateConfig] =
    useDragAndDrop([], {
      sortable: true,
      // Optional: Add styling for drag operations
      classes: {
        active: "caso-dragging", // Elemento que estás arrastrando
        over: "caso-drag-over", // Elemento sobre el que arrastras
        source: "caso-drag-source", // Posición original del elemento
        ghost: "caso-drag-ghost", // "Fantasma" (copia visual durante arrastre)
      },
    });

  useEffect(() => {
    const fetchFarmersCrops = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/farmers_crops/mis_cultivos/${id}`
        );
        // Update the drag-and-drop managed state
        setFarmersCropsLists(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener datos de cultivos:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchFarmersCrops();
    }
  }, [id, setFarmersCropsLists]);

  // Optional: Add effect to save reordered items to backend
  useEffect(() => {
    // Only run this effect after initial loading
    if (!loading && farmersCropsLists.length > 0) {
      // You could implement a save function here if needed
      // For example, send the new order to your backend
      // This would run whenever the order changes due to drag and drop
    }
  }, [farmersCropsLists, loading]);

  // Función para manejar la edición de un cultivo
  const handleEditCrop = (cropId) => {
    setEditingCropId(cropId);
    // Aquí puedes implementar la lógica de edición
    // Por ejemplo, abrir un modal o navegar a una página de edición
    console.log("Editando cultivo con ID:", cropId);
  };

  if (loading) {
    return <div>Cargando cultivos...</div>;
  }

  return (
    <div className="contenedor_casos_padre">
      <div>
        <h4>lista de cultivos</h4>
      </div>
      <div className="contenedor_casos_hijo" ref={parentRef}>
        {farmersCropsLists.length > 0 ? (
          farmersCropsLists.map((item) => (
            // Envuelve cada Caso en un div que pueda recibir las clases de arrastre
            <div key={item.id} className="caso-container">
              <Caso casoData={item} onEdit={handleEditCrop} />
            </div>
          ))
        ) : (
          <p>No hay cultivos disponibles</p>
        )}
      </div>

      {/* Aquí podrías añadir un modal o formulario de edición que se muestre cuando editingCropId no sea null */}
    </div>
  );
}

export default Casos;
