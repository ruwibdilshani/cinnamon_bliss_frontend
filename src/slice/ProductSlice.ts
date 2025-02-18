import {Product} from "../model/Product.ts";
import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Log} from "../model/Log.ts";

const initialState: Product[] = [];

const api = axios.create({
    baseURL: "http://localhost:3000/products"
});

export const saveProduct = createAsyncThunk(
    'products/saveProduct',
    async (product: Product) => {
        console.log("Slice", product);
        try {
            const response = await api.post('/add', product);
            return response.data;
        } catch (error) {
            return console.log('error', error)
        }
    }
);

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async (product: Product) => {
        try {
            const response = await api.put(`/update/${product.batchCode}`, product);
            return response.data;
        } catch (error) {
            return console.log('error', error)
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'products/removeProduct',
    async (batchCode: string) => {
        try {
            const response = await api.delete(`/remove/${batchCode}`);
            return response.data;
        } catch (error) {
            return console.log('error', error)
        }
    }
);

export const getAllProducts = createAsyncThunk(
    'products/getAllProducts',
    async () => {
        try {
            const response = await api.get('/all');
            return response.data;
        } catch (error) {
            return console.log('error', error)
        }
    })

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(saveProduct.pending, (state, action) => {
                console.log('product pending');
            })
            .addCase(saveProduct.rejected, (state, action) => {
                console.log('Product reject Successfully');
            })
            .addCase(saveProduct.fulfilled, (state, action) => {
                state.push(action.payload);
            });
        builder
            .addCase(updateProduct.rejected, (state, action) => {
                console.log('Product reject Successfully');
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.findIndex((product: Product) => product.batchCode === action.payload.batchCode);
                state[index] = action.payload;
                alert("Product Updated Successfully");
            });
        builder
            .addCase(deleteProduct.rejected, (state, action) => {
                console.log('Product reject Successfully');
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                const index = state.findIndex((product: Product) => product.batchCode === action.payload);
                state.slice(index,1);
                alert("Product Deleted Successfully");
            });
        builder
            .addCase(getAllProducts.rejected, (state, action) => {
                console.log('Product reject Successfully');
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                action.payload.forEach((product: Product) => {
                    state.push(product);
                    alert("product Fetched Successfully");
                });
            })
            .addCase(getAllProducts.pending, (state, action) => {
                console.log('Product reject Successfully');
            });

    }
});

export default productSlice.reducer;