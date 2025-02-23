
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
                alert("Please log in to save supplier");
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
                alert("Please log in to update supplier");
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
                alert("Please log in to delete supplier");
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
                alert("Please log in to view suppliers");
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
                alert("Supplier Added Successfully");
            })
            .addCase(saveSupplier.rejected, (state, action) => {
                alert("Supplier Added Failed");
            })
            .addCase(saveSupplier.pending, (state, action) => {
                alert("Supplier Adding...");
            });
        builder
            .addCase(updateSupplier.fulfilled, (state, action) => {
            const index = state.findIndex((supplier:Supplier) => supplier.supplierID === action.payload.supplierID);
            state[index] = action.payload;
            alert("Supplier Updated Successfully");
            })
            .addCase(updateSupplier.rejected, (state, action) => {
                alert("Supplier Update Failed");
            })
            .addCase(updateSupplier.pending, (state, action) => {
                alert("Supplier Updating...");
            });
        builder
            .addCase(deleteSupplier.fulfilled, (state, action) => {
                const index = state.findIndex((supplier: Supplier) => supplier.supplierID === action.payload);
                state.splice(index, 1);
                alert("Supplier Deleted Successfully");
            })
            .addCase(deleteSupplier.rejected, (state, action) => {
                alert("Supplier Delete Failed");
            })
            .addCase(deleteSupplier.pending, (state, action) => {
                alert("Supplier Deleting...");
            });
        builder
            .addCase(getAllSuppliers.fulfilled, (state, action) => {
                action.payload.forEach((supplier: Supplier) => {
                    state.push(supplier);
                    alert("Supplier Loaded Successfully");
                });
            })
            .addCase(getAllSuppliers.rejected, (state, action) => {
                    alert("Supplier Loading Failed");
            })
            .addCase(getAllSuppliers.pending, (state, action) => {
                    alert("Supplier Loading...");
            });
    }
});

export default supplierSlice.reducer;
