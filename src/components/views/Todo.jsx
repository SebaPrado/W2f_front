import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Todo.css";

const Todo = () => {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTask, setNewTask] = useState({
    category: "dash",
    tarea: "",
    done: false,
  });
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkTasks, setBulkTasks] = useState([
    { tarea: "", category: "General" },
  ]);

  // Cargar tareas al montar el componente
  useEffect(() => {
    fetchTasks();
  }, []);

  // Función para obtener todas las tareas
  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/todos`
      );
      setTasks(response.data);
      setError(null);
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
      setError("Error al cargar las tareas");
    } finally {
      setLoading(false);
    }
  };

  // Primero filtramos las tareas pendientes (done: false)
  const pendingTasks = tasks
    .filter((task) => !task.done)
    .sort((a, b) => {
      // Si existe createdAt, usarlo para ordenar
      if (a.createdAt && b.createdAt) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      // Si no existe createdAt, usar el ID (asumiendo que IDs más altos son más recientes)
      return b.id - a.id;
    });

  // Luego filtramos las tareas completadas (done: true)
  const completedTasks = tasks
    .filter((task) => task.done)
    .sort((a, b) => {
      // Si existe createdAt, usarlo para ordenar
      if (a.createdAt && b.createdAt) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      // Si no existe createdAt, usar el ID (asumiendo que IDs más altos son más recientes)
      return b.id - a.id;
    });

  // Categorías predefinidas
  const categories = [
    "dash",
    "database",
    "front_home",
    "front_user_home",
    "front_create_case",
    "front_edit_case",
    "front_login_signup",
    "back_models",
    "back_routes",
    "back_seguridad",
    "back_apikeys",
    "back_parsear",
  ];

  // Función para agrupar tareas por categoría
  const groupTasksByCategory = (tasks) => {
    return categories.reduce((acc, category) => {
      const categoryTasks = tasks.filter((task) => task.category === category);
      if (categoryTasks.length > 0) {
        acc[category] = categoryTasks;
      }
      return acc;
    }, {});
  };

  // Agrupamos las tareas completadas por categoría
  const groupedCompletedTasks = groupTasksByCategory(completedTasks);

  // Función para manejar cambios en el formulario de nueva tarea
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const handleBulkInputChange = (index, field, value) => {
    const updatedTasks = [...bulkTasks];
    updatedTasks[index] = {
      ...updatedTasks[index],
      [field]: value,
    };
    setBulkTasks(updatedTasks);
  };

  const addTaskField = () => {
    setBulkTasks([...bulkTasks, { tarea: "", category: "General" }]);
  };

  const removeTaskField = (index) => {
    const updatedTasks = bulkTasks.filter((_, i) => i !== index);
    setBulkTasks(updatedTasks);
  };

  // Función para crear una nueva tarea
  const handleCreateTask = async () => {
    if (newTask.tarea.trim() === "") {
      alert("Por favor, ingrese una descripción para la tarea");
      return;
    }

    try {
      // Enviar la nueva tarea al servidor
      await axios.post(`${import.meta.env.VITE_API_URL}/api/todos`, {
        tarea: newTask.tarea,
        category: newTask.category,
      });

      // Recargar las tareas
      await fetchTasks();

      // Cerrar el modal y resetear el formulario
      setShowModal(false);
      setNewTask({
        category: "dash",
        tarea: "",
        done: false,
      });
    } catch (error) {
      console.error("Error al crear la tarea:", error);
      alert("Error al crear la tarea. Por favor intente nuevamente.");
    }
  };

  const handleBulkSubmit = async () => {
    try {
      const validTasks = bulkTasks.filter((task) => task.tarea.trim());
      const promises = validTasks.map((task) =>
        axios.post(`${import.meta.env.VITE_API_URL}/api/todos`, {
          tarea: task.tarea,
          category: task.category,
        })
      );

      await Promise.all(promises);
      setShowBulkModal(false);
      setBulkTasks([{ tarea: "", category: "General" }]);
      fetchTasks();
    } catch (error) {
      console.error("Error al crear tareas en masa:", error);
    }
  };

  // Función para eliminar una tarea
  const handleDeleteTask = async (id) => {
    if (window.confirm("¿Está seguro que desea eliminar esta tarea?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/todos/${id}`);
        await fetchTasks();
      } catch (error) {
        console.error("Error al eliminar la tarea:", error);
        alert("Error al eliminar la tarea");
      }
    }
  };

  if (loading) return <div>Cargando tareas...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="todo-container">
      {/* Botón para agregar nueva tarea */}
      <div className="add-task-button-container">
        <button className="add-task-button" onClick={() => setShowModal(true)}>
          + Agregar Tarea
        </button>
      </div>

      {/* Modal para crear nueva tarea */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Crear Nueva Tarea</h3>
            <div className="form-group">
              <label>Categoría:</label>
              <select
                name="category"
                value={newTask.category}
                onChange={handleInputChange}
                className="modal-input"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Descripción:</label>
              <textarea
                name="tarea"
                value={newTask.tarea}
                onChange={handleInputChange}
                className="modal-input"
                rows="3"
              />
            </div>
            <div className="modal-actions">
              <button className="save-btn" onClick={handleCreateTask}>
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

      {/* Sección de tareas pendientes */}
      <div className="pending-tasks">
        <h3>Tareas Pendientes</h3>
        {pendingTasks.map((task) => (
          <div key={task.id} className="task-item pending">
            <div className="task-content">
              <h4>{task.category}</h4>
              <p>{task.tarea}</p>
            </div>
            <button
              className="delete-btn"
              onClick={() => handleDeleteTask(task.id)}
              title="Eliminar tarea"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Sección de tareas completadas */}
      <div className="completed-tasks">
        <h3>Tareas Completadas (revisar) </h3>
        {categories.map((category) => {
          const categoryTasks = groupedCompletedTasks[category];
          if (categoryTasks) {
            return (
              <div key={category} className="category-group">
                {/* <h4>{category}</h4> */}
                {categoryTasks.map((task) => (
                  <div key={task.id} className="task-item completed">
                    <div className="task-content">
                      <p>{task.tarea}</p>
                    </div>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteTask(task.id)}
                      title="Eliminar tarea"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="todo-header">
        <button className="bulk-add-btn" onClick={() => setShowBulkModal(true)}>
          Agregar Múltiples Tareas
        </button>
      </div>

      <form onSubmit={handleCreateTask} className="todo-form">
        <div className="input-group">
          <input
            type="text"
            name="tarea"
            value={newTask.tarea}
            onChange={handleInputChange}
            placeholder="Nueva tarea..."
            className="task-input"
          />
          <select
            name="category"
            value={newTask.category}
            onChange={handleInputChange}
            className="category-select"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button type="submit" className="add-btn">
            Agregar
          </button>
        </div>
      </form>

      {/* Modal para agregar múltiples tareas */}
      {showBulkModal && (
        <div className="modal-overlay">
          <div className="modal-content bulk-tasks-modal">
            <h3>Agregar Múltiples Tareas</h3>
            <div className="bulk-tasks-container">
              {bulkTasks.map((task, index) => (
                <div key={index} className="bulk-task-item">
                  <div className="bulk-task-inputs">
                    <input
                      type="text"
                      value={task.tarea}
                      onChange={(e) =>
                        handleBulkInputChange(index, "tarea", e.target.value)
                      }
                      placeholder="Nueva tarea..."
                      className="task-input"
                    />
                    <select
                      value={task.category}
                      onChange={(e) =>
                        handleBulkInputChange(index, "category", e.target.value)
                      }
                      className="category-select"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    {bulkTasks.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTaskField(index)}
                        className="remove-task-btn"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="bulk-tasks-actions">
              <button onClick={addTaskField} className="add-field-btn">
                + Agregar Otra Tarea
              </button>
              <div className="modal-actions">
                <button onClick={handleBulkSubmit} className="save-btn">
                  Guardar Todas
                </button>
                <button
                  onClick={() => {
                    setShowBulkModal(false);
                    setBulkTasks([{ tarea: "", category: "General" }]);
                  }}
                  className="cancel-btn"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;
