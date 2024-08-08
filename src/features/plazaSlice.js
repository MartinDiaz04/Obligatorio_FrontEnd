import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    listaPlazas: [],
}

export const plazaSlice = createSlice({
    name: "plazas",
    initialState,
    reducers: {
        guardarPlazas: (state, action) => {
            state.listaPlazas = action.payload    
        }
    }   
})

export const {guardarPlazas} = plazaSlice.actions
export default plazaSlice.reducer;