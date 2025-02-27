import {CinnamonStock} from "../model/CinnamonStock.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../store/store.tsx";

const initialState: CinnamonStock[] = [];

const api = axios.create({
    baseURL: "http://localhost:3000/cinnamonStock"
});


export const saveCinnamonStock = createAsyncThunk(
    'cinnamonStock/saveCinnamonStock',
    async (cinnamonStock: CinnamonStock, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState; // Get state from Redux
            const token = state.userReducer.jwt_token; // Access JWT token from Redux state

            if (!token) {

                return rejectWithValue("Please log in to save cinnamon stock");
            }

            const response = await api.post('/add', cinnamonStock, {
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

export const updateCinnamonStock = createAsyncThunk(
    'cinnamonStock/updateCinnamonStock',
    async (cinnamonStock: CinnamonStock, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const token = state.userReducer.jwt_token;

            if (!token) {

                return rejectWithValue("Please log in to update cinnamon stock");
            }

            const response = await api.put(`/update/${cinnamonStock.stockID}`, cinnamonStock, {
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

export const deleteCinnamonStock = createAsyncThunk(
    'cinnamonStock/removeCinnamonStock',
    async (stockID: string, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const token = state.userReducer.jwt_token;

            if (!token) {
                return rejectWithValue("Please log in to delete cinnamon stock");
            }

            const response = await api.delete(`/remove/${stockID}`, {
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

export const getAllCinnamonStock = createAsyncThunk(
    'cinnamonStock/getAllCinnamonStock',
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const token = state.userReducer.jwt_token;

            if (!token) {
                return rejectWithValue("Please log in to view cinnamon stock");
            }

            const response = await api.get('/all', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;
        } catch (error: any) {
            if (error.response?.status === 401) {

            }
            return console.log('Error:', error);
        }
    }
);


export const cinnamonStockSlice = createSlice({
    name: 'cinnamonStock',
    initialState,
    reducers: {},
    extraReducers:(builder)=> {
        builder
            .addCase(saveCinnamonStock.pending, (state, action) => {
                console.log('Hello World');
            })
            .addCase(saveCinnamonStock.fulfilled, (state, action) => {
                state.push(action.payload);

            })
            .addCase(saveCinnamonStock.rejected, (state, action) => {

            });
        builder
            .addCase(updateCinnamonStock.fulfilled, (state, action) => {
                const index = state.findIndex((stock: CinnamonStock) => stock.stockID === action.payload.stockID);
                state[index] = action.payload;
            })
            .addCase(updateCinnamonStock.rejected, (state, action) => {

            })
            .addCase(updateCinnamonStock.pending, (state, action) => {

            });
        builder
            .addCase(deleteCinnamonStock.fulfilled, (state, action) => {
                return state.filter((stock) => stock.stockID !== action.payload.stockID);
            })
            .addCase(deleteCinnamonStock.rejected, (state, action) => {

            })
            .addCase(deleteCinnamonStock.pending, (state, action) => {

            });
        builder
            .addCase(getAllCinnamonStock.fulfilled, (state, action) => {
                action.payload.forEach((stock: CinnamonStock) => {
                    state.push(stock);

                });
            })
            .addCase(getAllCinnamonStock.rejected, (state, action) => {

            })
            .addCase(getAllCinnamonStock.pending, (state, action) => {

            });
    }
});

export default cinnamonStockSlice.reducer;

