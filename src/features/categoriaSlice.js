import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    listaCategorias: [],
}

export const categoriaSlice = createSlice({
    name: "categorias",
    initialState,
    reducers: {
        guardarCategorias: (state, action) => {
            state.listaCategorias = action.payload
        }
    }   
})

export const {guardarCategorias} = categoriaSlice.actions
export default categoriaSlice.reducer;