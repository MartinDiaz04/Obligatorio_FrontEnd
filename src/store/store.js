import { configureStore } from "@reduxjs/toolkit";
import departamentoReducer from "../features/departamentoSlice";
import ciudadReducer from "../features/ciudadSlice";

export const store = configureStore({
    reducer:{
        departamento: departamentoReducer,
        ciudad: ciudadReducer,
    }
})