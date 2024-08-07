import { configureStore } from "@reduxjs/toolkit";
import departamentoReducer from "../features/departamentoSlice";
import ciudadReducer from "../features/ciudadSlice";
import categoriaReducer from "../features/categoriaSlice";
import plazaReducer from "../features/plazaSlice";
import eventoReducer from  "../features/eventoSlice";

export const store = configureStore({
    reducer:{
        departamento: departamentoReducer,
        ciudad: ciudadReducer,
        categoria: categoriaReducer,
        plaza: plazaReducer,
        evento: eventoReducer,
    }
})