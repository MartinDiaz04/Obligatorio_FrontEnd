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
        agregarEventoLocal: (state, action) => {
            console.log(action.payload)
            state.listaEventos.push(action.payload)
        },
        eliminarEvento: (state, action) => {
            state.listaEventos = state.listaEventos.filter(evento => evento.id !== action.payload)
        },
    }   
})

export const {guardarEventos, agregarEventoLocal, eliminarEvento} = eventoSlice.actions
export default eventoSlice.reducer;