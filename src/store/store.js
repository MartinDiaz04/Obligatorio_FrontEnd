import { configureStore } from "@reduxjs/toolkit";
import departamentoReducer from "../features/departamentoSlice";
import ciudadReducer from "../features/ciudadSlice";
import categoriaReducer from "../features/categoriaSlice";
import eventoReducer from  "../features/eventoSlice";
import spinnerReducer from "../features/spinnerSlice";
import biberonReducer from "../features/horaUltimoBiberonSlice";

export const store = configureStore({
    reducer:{
        departamento: departamentoReducer,
        ciudad: ciudadReducer,
        categoria: categoriaReducer,
        evento: eventoReducer,
        spinner: spinnerReducer,
        biberonHora: biberonReducer
    }
})