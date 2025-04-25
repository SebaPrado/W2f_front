export function rutas(app) {
  // app.use("/", authRoutes);
  // app.use("/admins", adminRoutes);
  app.use("/users", userRoutes);
  app.use("/crops", cropsRoutes);
  app.use("/crops_prices", cropPricesRoutes);
  app.use("/farmers_crops", farmerCropRoutes);
  app.use("/fertilizers", fertilizersRoutes);
  app.use("/agrochemicals", agrochemicalsRoutes);
  app.use("/extracosts", extracostsRoutes);
  app.use("/auth", authRoutes);
  app.use("/costs_items", costsItemsRoutes);
  app.use("/api", todoRoutes);
}

//----------------------             Users Routes            >>        ------------------//

import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener un usuario por ID
router.get("/:email", async (req, res) => {
  try {
    // Buscar usuario por email
    const user = await User.findOne({ where: { email: req.params.email } });

    if (user) {
      res.json(user); // Si el usuario existe, devolvemos los datos
    } else {
      res.status(404).json({ message: "Usuario no encontrado" }); // Si no se encuentra el usuario
    }
  } catch (error) {
    res.status(500).json({ message: error.message }); // Si hay un error en la consulta
  }
});

// Crear un nuevo usuario
router.post("/", async (req, res) => {
  try {
    console.log("Body recibido:", req.body);

    const { email, password, name, last_name } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "El email y la contraseña son obligatorios." });
    }

    console.log("Intentando crear usuario...");

    const user = await User.create({ email, password, name, last_name });

    console.log("Usuario creado:", user);
    res.status(201).json(user);
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ message: error.message });
  }
});

// Actualizar un usuario
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, last_name, created_at, updated_at, email, password } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar si se intenta actualizar correo o contraseña
    if (email || password) {
      return res.status(400).json({
        message:
          "No se puede actualizar el correo o la contraseña directamente.",
      });
    }

    // Actualizar cada campo de forma explícita
    user.name = name;
    user.last_name = last_name;
    user.created_at = created_at;
    user.updated_at = updated_at;

    await user.save(); // Guardar los cambios en la base de datos

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar un usuario
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.json({ message: "Usuario ha sido eliminado" });
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
