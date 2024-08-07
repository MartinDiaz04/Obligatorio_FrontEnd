import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    listaCiudades: [],
}

export const ciudadSlice = createSlice({
    name: "ciudad",
    initialState,
    reducers: {
        guardarCiudades: (state, action) => {
            state.listaCiudades = action.payload
        }
    }   
})

export const {guardarCiudades} = ciudadSlice.actions
export default ciudadSlice.reducer;