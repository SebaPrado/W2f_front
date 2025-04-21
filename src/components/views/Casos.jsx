import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Caso from "./Caso";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import "./casos.css";

function Casos() {
  // Obtener ID del usuario y token desde Redux
  const userId = useSelector((state) => state.user.identification);
  const token = useSelector((state) => state.user.token);

  // Estados
  const [loading, setLoading] = useState(true);
  const [editingCropId, setEditingCropId] = useState(null);

  // Configuración de drag and drop
  const [parentRef, crops, setCrops] = useDragAndDrop([], {
    sortable: true,
    classes: {
      active: "caso-dragging",
      over: "caso-drag-over",
      source: "caso-drag-source",
      ghost: "caso-drag-ghost",
    },
  });

  // Obtener cultivos del agricultor al cargar el componente
  useEffect(() => {
    const fetchFarmersCrops = async () => {
      if (!userId || !token) return;

      try {
        setLoading(true);

        // Configurar los encabezados de la solicitud
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/farmers_crops/mis_cultivos/${userId}`,
          config
        );
        console.log("Datos de cultivos:", response.data);
        setCrops(response.data);
      } catch (error) {
        console.error("Error al obtener datos de cultivos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmersCrops();
  }, [userId, token, setCrops]);

//   // Guardar orden después de drag and drop
//   useEffect(() => {
//     const saveNewOrder = async () => {
//       // Solo guardar si ya cargaron los datos y hay cultivos
//       if (!loading && crops.length > 0) {
//         // Aquí implementarías la lógica para guardar el nuevo orden en el backend
//         // Por ejemplo:
//         // await axios.post('/api/save-crop-order', { crops });
//         // console.log("Nuevo orden de cultivos:", crops);
//       }
//     };

//     // Descomenta esta línea cuando implementes la función de guardar
//     // saveNewOrder();
//   }, [crops, loading]);

  // Función para manejar la edición de un cultivo
  const handleEditCrop = (cropId) => {
    setEditingCropId(cropId);
    console.log("Editando cultivo con ID:", cropId);
    // Aquí implementarías la apertura de un modal de edición o navegación
  };

  // Renderizar mensaje de carga
  if (loading) {
    return <div className="loading-container">Cargando cultivos...</div>;
  }
  // Añadir esta función dentro del componente Casos
  const handleDeleteCrop = (cropId) => {
    // Actualizar el estado eliminando el cultivo con el ID proporcionado
    setCrops(crops.filter((crop) => crop.id !== cropId));
    console.log("Cultivo eliminado del estado:", cropId);
  };

  return (
    <div className="contenedor_casos_padre">
      <div className="contenedor_casos_header">
        <h4>Mis casos</h4>
      </div>

      <div className="contenedor_casos_hijo" ref={parentRef}>
        {crops.length > 0 ? (
          crops.map((crop) => (
            <div key={crop.id} className="caso-container">
              <Caso
                casoData={crop}
                onEdit={handleEditCrop}
                onDelete={handleDeleteCrop}
              />
            </div>
          ))
        ) : (
          <p className="no-crops-message">No hay cultivos disponibles</p>
        )}
      </div>

      {/* Aquí iría el modal o formulario de edición que se mostraría cuando editingCropId tiene valor */}
      {editingCropId &&
        // Placeholder para el componente de edición
        // <EditCropModal cropId={editingCropId} onClose={() => setEditingCropId(null)} />
        null}
    </div>
  );
}

export default Casos;
