import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    ultimoBiberon: null,
}

export const horaUltimoBiberonSlice = createSlice({
    name: "biberonHora",
    initialState,
    reducers: {
        guardarHora: (state, action) => {
            state.ultimoBiberon = action.payload                     
        }
    }   
})

export const {guardarHora} = horaUltimoBiberonSlice.actions
export default horaUltimoBiberonSlice.reducer;