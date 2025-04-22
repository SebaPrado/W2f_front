import React, { useState, useEffect } from "react";
import axios from "axios";

function Api_granos() {
  // Estado para almacenar los precios de los granos
  const [precios, setPrecios] = useState({
    soja: null,
    maiz: null,
    trigo: null,
    sojaAgro: null,
    maizAgro: null,
    trigoAgro: null,
    lastUpdated: null,
    isLoading: true,
    error: null,
  });

  // Configuración inicial de tokens (solo ejecutar una vez)
  useEffect(() => {
    // Si no hay tokens almacenados, guardar los proporcionados
    if (!localStorage.getItem("matbarofex_access_token")) {
      localStorage.setItem(
        "matbarofex_access_token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1MzM2ODU0LCJpYXQiOjE3NDUyNTA0NTQsImp0aSI6ImViNjkyMTQwNDIyZDRiNThhZDVhNWMyMjljNDg5Y2RlIiwidXNlcl9pZCI6MzM0fQ.2fnki0WTKszK-2el4FF_d1BzzgOrqsH2vLaaDD5BRJo"
      );
      localStorage.setItem(
        "matbarofex_refresh_token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NTU5NjA1NCwiaWF0IjoxNzQ1MjUwNDU0LCJqdGkiOiJjNmI0OGI2MzY2MjQ0MGE4ODYyNzg4N2ZhNmM3OWQ5MCIsInVzZXJfaWQiOjMzNH0.AqmoxSz8gR8_jGQMKJ3rIgIhcEx3mJ7gT-lJdr1obPk"
      );

      // Calcular fecha de expiración aproximada (24 horas desde ahora)
      const expirationTime = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem("matbarofex_token_expiration", expirationTime);
    }
  }, []);

  // Función para obtener el token de autenticación
  // Modificar esta función para usar los tokens de tu entorno
  // Reemplaza la función obtenerToken con esta versión mejorada que utiliza refresh tokens
  const obtenerToken = async () => {
    try {
      // Intentar recuperar el token almacenado y su fecha de expiración
      const storedToken = localStorage.getItem("matbarofex_access_token");
      const tokenExpiration = localStorage.getItem(
        "matbarofex_token_expiration"
      );
      const refreshToken =
        localStorage.getItem("matbarofex_refresh_token") ||
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NTU5NjA1NCwiaWF0IjoxNzQ1MjUwNDU0LCJqdGkiOiJjNmI0OGI2MzY2MjQ0MGE4ODYyNzg4N2ZhNmM3OWQ5MCIsInVzZXJfaWQiOjMzNH0.AqmoxSz8gR8_jGQMKJ3rIgIhcEx3mJ7gT-lJdr1obPk";

      const now = Date.now();

      // Si tenemos un token almacenado y no ha expirado, usarlo
      if (storedToken && tokenExpiration && now < parseInt(tokenExpiration)) {
        return storedToken;
      }

      // Si no tenemos token o ha expirado, intentar usar el refresh token
      if (refreshToken) {
        try {
          const response = await axios.post(
            "https://api.matbarofex.com.ar/v2/token/refresh/",
            { refresh: refreshToken },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          // Guardar el nuevo token y su fecha de expiración (24 horas desde ahora)
          const newToken = response.data.access;
          const newRefreshToken = response.data.refresh;
          const expirationTime = now + 24 * 60 * 60 * 1000; // 24 horas en ms

          localStorage.setItem("matbarofex_access_token", newToken);
          localStorage.setItem("matbarofex_token_expiration", expirationTime);

          // Si también obtenemos un nuevo refresh token, guardarlo
          if (newRefreshToken) {
            localStorage.setItem("matbarofex_refresh_token", newRefreshToken);
          }

          return newToken;
        } catch (refreshError) {
          console.error("Error al refrescar el token:", refreshError);
          // Si falla el refresh, intentamos obtener un nuevo token con credenciales
        }
      }

      // Si no podemos usar refresh token, obtener uno nuevo con credenciales
      const credenciales = {
        username: "sebaspradomelesi",
        password: "sean3131",
      };

      const loginResponse = await axios.post(
        "https://api.matbarofex.com.ar/v2/token/",
        credenciales,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Guardar el nuevo token, refresh token y fecha de expiración
      const newToken = loginResponse.data.access;
      const newRefreshToken = loginResponse.data.refresh;
      const expirationTime = now + 24 * 60 * 60 * 1000; // 24 horas en ms

      localStorage.setItem("matbarofex_access_token", newToken);
      localStorage.setItem("matbarofex_refresh_token", newRefreshToken);
      localStorage.setItem("matbarofex_token_expiration", expirationTime);

      return newToken;
    } catch (error) {
      console.error("Error en el proceso de autenticación:", error);
      return null;
    }
  };

  // Función para obtener el precio de un grano específico
  const obtenerPrecioGrano = async (symbol, token) => {
    try {
      const respuesta = await axios.get(
        `https://api.matbarofex.com.ar/v2/symbol/${symbol}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return respuesta.data;
    } catch (error) {
      console.error(`Error al obtener precio de ${symbol}:`, error);
      return null;
    }
  };

  // Función para verificar si debemos actualizar los precios hoy
  const debeActualizarHoy = () => {
    const lastUpdate = localStorage.getItem("lastGrainPriceUpdate");
    if (!lastUpdate) return true;

    const lastUpdateDate = new Date(lastUpdate).setHours(0, 0, 0, 0);
    const today = new Date().setHours(0, 0, 0, 0);

    return lastUpdateDate < today;
  };

  // Función para obtener todos los precios de granos
  const obtenerTodosLosPrecios = async () => {
    // Verificar si ya obtuvimos precios hoy
    if (!debeActualizarHoy() && localStorage.getItem("grainPrices")) {
      const cachedPrices = JSON.parse(localStorage.getItem("grainPrices"));
      setPrecios({
        ...cachedPrices,
        isLoading: false,
      });
      return;
    }

    setPrecios((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const token = await obtenerToken();
      if (!token) {
        throw new Error("No se pudo obtener el token de autenticación");
      }

      // Lista de símbolos a consultar
      const simbolos = [
        "I.SOJA",
        "I.MAIZ",
        "I.TRIGO",
        "I.AGTKSOYA",
        "I.AGTKCORA",
        "I.AGTKWHEA",
      ];

      // Obtener datos de todos los símbolos en paralelo
      const resultados = await Promise.all(
        simbolos.map((simbolo) => obtenerPrecioGrano(simbolo, token))
      );

      // Organizar resultados
      const nuevosPrecios = {
        soja: resultados[0]?.indexValue || null,
        maiz: resultados[1]?.indexValue || null,
        trigo: resultados[2]?.indexValue || null,
        sojaAgro: resultados[3]?.indexValue || null,
        maizAgro: resultados[4]?.indexValue || null,
        trigoAgro: resultados[5]?.indexValue || null,
        lastUpdated: new Date().toISOString(),
        isLoading: false,
        error: null,
      };

      // Guardar en estado y localStorage
      setPrecios(nuevosPrecios);
      localStorage.setItem("grainPrices", JSON.stringify(nuevosPrecios));
      localStorage.setItem("lastGrainPriceUpdate", new Date().toISOString());
    } catch (error) {
      setPrecios((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message || "Error al obtener precios",
      }));
    }
  };

  // Efecto para cargar los precios al montar el componente
  useEffect(() => {
    obtenerTodosLosPrecios();

    // Este intervalo verificará cada hora si debemos actualizar los precios
    // pero solo realizará la actualización una vez por día
    const intervalo = setInterval(() => {
      if (debeActualizarHoy()) {
        obtenerTodosLosPrecios();
      }
    }, 3600000); // 1 hora en milisegundos

    return () => clearInterval(intervalo);
  }, []);

  // Formatear fecha de última actualización
  const formatearFecha = (fechaISO) => {
    if (!fechaISO) return "Nunca";
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString() + " " + fecha.toLocaleTimeString();
  };

  // Renderizado condicional basado en el estado
  if (precios.isLoading) {
    return <div>Cargando precios de granos...</div>;
  }

  if (precios.error) {
    return <div>Error: {precios.error}</div>;
  }

  return (
    <div className="precios-granos">
      <h2>Precios de Granos</h2>

      <div className="precio-card">
        <h3>Índices MtR</h3>
        <ul>
          <li>
            Soja: ${precios.soja ? precios.soja.toFixed(2) : "No disponible"}{" "}
            USD
          </li>
          <li>
            Maíz: ${precios.maiz ? precios.maiz.toFixed(2) : "No disponible"}{" "}
            USD
          </li>
          <li>
            Trigo: ${precios.trigo ? precios.trigo.toFixed(2) : "No disponible"}{" "}
            USD
          </li>
        </ul>
      </div>

      <div className="precio-card">
        <h3>Índices Agrotoken</h3>
        <ul>
          <li>
            Soja (AGTKSOYA): $
            {precios.sojaAgro ? precios.sojaAgro.toFixed(2) : "No disponible"}{" "}
            ARS
          </li>
          <li>
            Maíz (AGTKCORA): $
            {precios.maizAgro ? precios.maizAgro.toFixed(2) : "No disponible"}{" "}
            ARS
          </li>
          <li>
            Trigo (AGTKWHEA): $
            {precios.trigoAgro ? precios.trigoAgro.toFixed(2) : "No disponible"}{" "}
            ARS
          </li>
        </ul>
      </div>

      <p className="actualizacion">
        Última actualización: {formatearFecha(precios.lastUpdated)}
      </p>

      <button onClick={obtenerTodosLosPrecios} className="actualizar-btn">
        Actualizar precios
      </button>

      <style>{`
        .precios-granos {
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }

        h2 {
          color: #2c3e50;
          border-bottom: 2px solid #eee;
          padding-bottom: 10px;
        }

        .precio-card {
          background-color: #f9f9f9;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 20px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        h3 {
          margin-top: 0;
          color: #3498db;
        }

        ul {
          list-style-type: none;
          padding-left: 0;
        }

        li {
          padding: 8px 0;
          border-bottom: 1px solid #eee;
        }

        .actualizacion {
          font-size: 0.9em;
          color: #7f8c8d;
          text-align: right;
        }

        .actualizar-btn {
          background-color: #3498db;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
        }

        .actualizar-btn:hover {
          background-color: #2980b9;
        }
      `}</style>
    </div>
  );
}

export default Api_granos;
