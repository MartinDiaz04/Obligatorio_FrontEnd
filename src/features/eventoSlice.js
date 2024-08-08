import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    listaEventos: [],
}

export const eventoSlice = createSlice({
    name: "eventos",
    initialState,
    reducers: {
        guardarEventos: (state, action) => {
            state.listaEventos = action.payload            
        },
        agregarEvento: (state, action) => {
            state.listaEventos.push(action.payload)
        },
        eliminarEvento: (state, action) => {
            state.listaEventos = state.listaEventos.filter(evento => evento.id !== action.payload)
        },
    }   
})

export const {guardarEventos, agregarEvento, eliminarEvento} = eventoSlice.actions
export default eventoSlice.reducer;