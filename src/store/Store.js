import { configureStore, createSlice} from "@reduxjs/toolkit";


const produkti = await fetch("https://dummyjson.com/products").then((res) =>
    res.json()
);

const productSlice = createSlice({
    name: "products",
    initialState:produkti.products,
    reducers: {
        addProduct: (state, action) => {
            state.push(action.payload);
        },
        deleteProduct: (state, action) => {
            return state.filter(product => product.id !== action.payload);
        },
        updateProduct: (state, action) => {
            const { id } = action.payload;
            const index = state.findIndex(product => product.id === id);
            state[index] = action.payload;
            
        }
    }
});

export const productActions = productSlice.actions;

const items = configureStore({
    reducer: {
        products: productSlice.reducer,
    }
});

export default items;