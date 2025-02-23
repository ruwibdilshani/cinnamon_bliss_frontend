import {Product} from "../model/Product.ts";
import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {RootState} from "../store/store.tsx";


const initialState: Product[] = [];

const api = axios.create({
    baseURL: "http://localhost:3000/products"
});


export const saveProduct = createAsyncThunk(
    'products/saveProduct',
    async (product: Product, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState; // Get state from Redux
            const token = state.userReducer.jwt_token; // Access JWT token from Redux state

            if (!token) {
                alert("Please log in to save product");
                return rejectWithValue("Please log in to save product");
            }

            const response = await api.post('/add', product, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the headers
                },
            });

            return response.data;
        } catch (error: any) {
            return console.log('Error:', error);
        }
    }
);

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async (product: Product, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const token = state.userReducer.jwt_token;

            if (!token) {
                alert("Please log in to update product");
                return rejectWithValue("Please log in to update product");
            }

            const response = await api.put(`/update/${product.batchCode}`, product, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;
        } catch (error: any) {
            return console.log('Error:', error);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'products/removeProduct',
    async (batchCode: string, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const token = state.userReducer.jwt_token;

            if (!token) {
                alert("Please log in to delete product");
                return rejectWithValue("Please log in to delete product");
            }

            const response = await api.delete(`/remove/${batchCode}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;
        } catch (error: any) {
            return console.log('Error:', error);
        }
    }
);

export const getAllProducts = createAsyncThunk(
    'products/getAllProducts',
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const token = state.userReducer.jwt_token;

            if (!token) {
                alert("Please log in to view products");
                return rejectWithValue("Please log in to view products");
            }

            const response = await api.get('/all', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;
        } catch (error: any) {
            if (error.response?.status === 401) {
                alert("Session expired. Please log in again.");
            }
            return console.log('Error:', error);
        }
    }
);


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

            .addCase(updateProduct.pending, (state, action) => {
                toast.success('Waiting for update confirmation');
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
            .addCase(deleteProduct.pending, (state, action) => {
                alert("Product Delete Failed");
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                return state.filter((product) => product.batchCode !== action.payload.batchCode);
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