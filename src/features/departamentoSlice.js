import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    listaDepartamentos: [],
}

export const departamentoSlice = createSlice({
    name: "departamentos",
    initialState,
    reducers: {
        guardarDepartamentos: (state, action) => {
            state.listaDepartamentos = action.payload
        }
    }   
})

export const {guardarDepartamentos} = departamentoSlice.actions
export default departamentoSlice.reducer;