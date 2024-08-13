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
            state.listaEventos.push(action.payload)
        },
        eliminarEventoLocal: (state, action) => {
            state.listaEventos = state.listaEventos.filter(evento => evento.id !== action.payload)
        },
    }   
})

export const {guardarEventos, agregarEventoLocal, eliminarEventoLocal} = eventoSlice.actions
export default eventoSlice.reducer;