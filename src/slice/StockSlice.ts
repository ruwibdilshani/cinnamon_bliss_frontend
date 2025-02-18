import {CinnamonStock} from "../model/CinnamonStock.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState: CinnamonStock[] = [];

const api = axios.create({
    baseURL: "http://localhost:3000/cinnamonStock"
});

export const saveCinnamonStock = createAsyncThunk(
    'cinnamonStock/saveCinnamonStock',
    async (cinnamonStock: CinnamonStock) => {
        console.log("Slice", cinnamonStock);
        try {
            const response = await api.post('/add', cinnamonStock);
            return response.data;
        } catch (error) {
            return console.log('error', error)
        }
    }
);

export const updateCinnamonStock = createAsyncThunk(
    'cinnamonStock/updateCinnamonStock',
    async (cinnamonStock: CinnamonStock) => {
        try {
            const response = await api.put(`/update/${cinnamonStock.stockID}`, cinnamonStock);
            return response.data;
        } catch (error) {
            return console.log('error', error)
        }
    }
);

export const deleteCinnamonStock = createAsyncThunk(
    'cinnamonStock/removeCinnamonStock',
    async (stockID: string) => {
        try {
            const response = await api.delete(`/remove/${stockID}`);
            return response.data;
        } catch (error) {
            return console.log('error', error)
        }
    }
);

export const getAllCinnamonStock = createAsyncThunk(
    'cinnamonStock/getAllCinnamonStock',
    async () => {
        try {
            const response = await api.get('/all');
            return response.data;
        } catch (error) {
            return console.log('error', error)
        }
    }
)
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
                alert("Cinnamon Stock Added Successfully");
            })
            .addCase(saveCinnamonStock.rejected, (state, action) => {
                alert("Stock Update Failed");
            });
        builder
            .addCase(updateCinnamonStock.fulfilled, (state, action) => {
                const index = state.findIndex((stock: CinnamonStock) => stock.stockID === action.payload.stockID);
                state[index] = action.payload;
            })
            .addCase(updateCinnamonStock.rejected, (state, action) => {
                alert("Stock Update Failed");
            })
            .addCase(updateCinnamonStock.pending, (state, action) => {
                alert("Stock Updating...");
            });
        builder
            .addCase(deleteCinnamonStock.fulfilled, (state, action) => {
                const index = state.findIndex((stock: CinnamonStock) => stock.stockID === action.payload);
                state.slice(index,1);
                alert("Stock Deleted Successfully");
            })
            .addCase(deleteCinnamonStock.rejected, (state, action) => {
                alert("Stock Delete Failed");
            })
            .addCase(deleteCinnamonStock.pending, (state, action) => {
                alert("Stock Deleting...");
            });
        builder
            .addCase(getAllCinnamonStock.fulfilled, (state, action) => {
                action.payload.forEach((stock: CinnamonStock) => {
                    state.push(stock);
                    alert("Stock Fetched Successfully");
                });
            })
            .addCase(getAllCinnamonStock.rejected, (state, action) => {
                alert("Stock Fetch Failed");
            })
            .addCase(getAllCinnamonStock.pending, (state, action) => {
                alert("Stock Fetching...");
            });
    }
});

export default cinnamonStockSlice.reducer;

