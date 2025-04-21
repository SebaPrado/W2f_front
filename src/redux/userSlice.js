import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: null, // Estado inicial con email nulo
    name: null, // Otros campos que quieras guardar en el estado global
    identification: null, // Añadimos el id al estado inicial
    token: null, // Añadir el token al estado inicial
  },
  reducers: {
    // Un reducer es una función pura que toma el estado actual y una acción, y devuelve un nuevo estado basado en esa acción.
    authUser(state, action) {
      state.email = action.payload.email;
      //   state.name= action.payload.name ;
      //   state.identification = action.payload.identification ;
    },
    userName(state, action) {
      state.name = action.payload.name;
    },
    userId(state, action) {
      state.identification = action.payload.identification;
    },
    userToken(state, action) {
      // Nuevo reducer para el token
      state.token = action.payload.token;
    },
    logout(state) {
      state.email = null;
      state.name = null;
      state.identification = null;
      state.token = null; // Limpiar el token al cerrar sesión
    },
  },
});

const { reducer, actions } = userSlice;
export const { authUser, logout, userId, userName, userToken } = actions;
export default reducer;
