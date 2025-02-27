
import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Supplier} from "../model/Supplier.ts";
import {RootState} from "../store/store.tsx";



const  initialState: Supplier[]=[];

const api = axios.create({
    baseURL: "http://localhost:3000/suppliers"
});


export const saveSupplier = createAsyncThunk(
    'suppliers/saveSupplier',
    async (supplier: Supplier, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState; // Get state from Redux
            const token = state.userReducer.jwt_token; // Access JWT token from Redux state

            if (!token) {

                return rejectWithValue("Please log in to save supplier");
            }

            const response = await api.post('/add', supplier, {
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

export const updateSupplier = createAsyncThunk(
    'suppliers/updateSupplier',
    async (supplier: Supplier, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const token = state.userReducer.jwt_token;

            if (!token) {

                return rejectWithValue("Please log in to update supplier");
            }

            const response = await api.put(`/update/${supplier.supplierID}`, supplier, {
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

export const deleteSupplier = createAsyncThunk(
    'suppliers/removeSupplier',
    async (id: string, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const token = state.userReducer.jwt_token;

            if (!token) {
                return rejectWithValue("Please log in to delete supplier");
            }

            const response = await api.delete(`/remove/${id}`, {
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

export const getAllSuppliers = createAsyncThunk(
    'suppliers/getAllSuppliers',
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const token = state.userReducer.jwt_token;

            if (!token) {
                return rejectWithValue("Please log in to view suppliers");
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




const supplierSlice = createSlice({
    name: 'suppliers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(saveSupplier.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(saveSupplier.rejected, (state, action) => {
            })
            .addCase(saveSupplier.pending, (state, action) => {
            });
        builder
            .addCase(updateSupplier.fulfilled, (state, action) => {
            const index = state.findIndex((supplier:Supplier) => supplier.supplierID === action.payload.supplierID);
            state[index] = action.payload;
            })
            .addCase(updateSupplier.rejected, (state, action) => {
            })
            .addCase(updateSupplier.pending, (state, action) => {
            });
        builder
            .addCase(deleteSupplier.fulfilled, (state, action) => {
                const index = state.findIndex((supplier: Supplier) => supplier.supplierID === action.payload);
                state.splice(index, 1);
            })
            .addCase(deleteSupplier.rejected, (state, action) => {
            })
            .addCase(deleteSupplier.pending, (state, action) => {
            });
        builder
            .addCase(getAllSuppliers.fulfilled, (state, action) => {
                action.payload.forEach((supplier: Supplier) => {
                    state.push(supplier);
                });
            })
            .addCase(getAllSuppliers.rejected, (state, action) => {
            })
            .addCase(getAllSuppliers.pending, (state, action) => {
            });
    }
});

export default supplierSlice.reducer;
