import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./create_table.css";

function CreateTable() {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.identification);
  console.log("ID del usuario al cargar:", userId);

  // Estado para cada campo del formulario
  const [formData, setFormData] = useState({
    user_id: userId,
    crop_id: "",
    yield: "",
    price: "",
    lease_cost_usd: "",
    lease_cost_kg: "",
    production_costs: "",
    gross_income: "",
    commercialization: "",
    freight_costs: "",
    net_income: "",
  });

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("ID del usuario:", userId);

    try {
      // Convertir campos numéricos de string a número
      const numericFields = [
        "crop_id",
        "yield",
        "price",
        "lease_cost_usd",
        "lease_cost_kg",
        "production_costs",
        "gross_income",
        "commercialization",
        "freight_costs",
        "net_income",
      ];

      const formattedData = { ...formData };
      numericFields.forEach((field) => {
        if (formattedData[field]) {
          formattedData[field] = parseFloat(formattedData[field]);
        }
      });

      // Configuración para la petición axios
      const axiosConfig = {
        method: "POST",
        url: `${import.meta.env.VITE_API_URL}/farmers_crops`,
        data: formattedData,
      };

      const response = await axios(axiosConfig);

      // Mostrar mensaje de éxito y redirigir
      alert("Registro creado con éxito");
      navigate("/tables"); // Ajusta esta ruta según tu aplicación
    } catch (err) {
      console.error("Error al crear el registro:", err);
      alert(
        "Error al crear el registro: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <>
      <div className="container d-flex flex-column align-items-center mt-5 ">
        <div className="w-75 border border-dark-subtle rounded glass-box p-5 formdiv">
          <h4 className="">CREAR NUEVO REGISTRO DE CULTIVO</h4>
          <form className="mt-4" onSubmit={handleSubmit}>
            {/* Campos obligatorios */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="user_id" className="form-label">
                  ID de Usuario *
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="user_id"
                  value={formData.user_id}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="crop_id" className="form-label">
                  ID de Cultivo*
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="crop_id"
                  value={formData.crop_id}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Campos numéricos obligatorios */}
            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="yield" className="form-label">
                  Rendimiento *
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  id="yield"
                  value={formData.yield}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="price" className="form-label">
                  Precio *
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  id="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="production_costs" className="form-label">
                  Costos de Producción *
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  id="production_costs"
                  value={formData.production_costs}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="gross_income" className="form-label">
                  Ingreso Bruto*
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  id="gross_income"
                  value={formData.gross_income}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="commercialization" className="form-label">
                  Comercialización *
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  id="commercialization"
                  value={formData.commercialization}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="freight_costs" className="form-label">
                  Costos de Flete *
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  id="freight_costs"
                  value={formData.freight_costs}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="net_income" className="form-label">
                  Ingreso Neto *
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  id="net_income"
                  value={formData.net_income}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="lease_cost_usd" className="form-label">
                  Costo de Arrendamiento (USD)
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  id="lease_cost_usd"
                  value={formData.lease_cost_usd}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="lease_cost_kg" className="form-label">
                  Costo de Arrendamiento (KG)
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  id="lease_cost_kg"
                  value={formData.lease_cost_kg}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="d-flex justify-content-end mt-4">
              <Link to="/home" className="btn btn-secondary">
                ← Volver
              </Link>
              <button type="submit" className="btn btn-dark ms-3">
                Crear
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateTable;
