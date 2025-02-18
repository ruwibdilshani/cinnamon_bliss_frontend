import {Log} from "../model/Log.ts";
import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


const initialState : Log[] = [];

const api = axios.create({
    baseURL: "http://localhost:3000/log"
});

export const saveLog = createAsyncThunk(
    'log/saveLog',
    async (log: Log) => {
        try {
            const response = await api.post('/add', log);
            return response.data;
        } catch (error) {
            return console.log('error', error)
        }
    }
);

export const updateLog = createAsyncThunk(
    'log/updateLog',
    async (log: Log) => {
        try {
            const response = await api.put(`/update/${log.logID}`, log);
            return response.data;
        } catch (error) {
            return console.log('error', error)
        }
    }
);

export const deleteLog = createAsyncThunk(
    'log/removeLog',
    async (logID: string) => {
        try {
            const response = await api.delete(`/remove/${logID}`);
            return response.data;
        } catch (error) {
            return console.log('error', error)
        }
    }
);

export const getAllLogs = createAsyncThunk(
    'log/getAllLogs',
    async () => {
        try {
            const response = await api.get('/all');
            return response.data;
        } catch (error) {
            return console.log('error', error)
        }
    });

const logsSlice = createSlice({
    name: 'log',
    initialState,
    reducers: {},
    extraReducers:(builder)=> {
        builder
            .addCase(saveLog.fulfilled, (state, action) => {
                state.push(action.payload);
                alert("Logs Update sucess");
            })
            .addCase(saveLog.rejected, (state, action) => {
                alert("Logs Update Failed");
            })
            .addCase(saveLog.pending, (state, action) => {
                alert("Logs Update Failed");
            });
        builder
            .addCase(updateLog.fulfilled, (state, action) => {
                const index = state.findIndex((logs: Log) => logs.logID === action.payload.logID);
                state[index] = action.payload;
                alert("Logs Update sucess");
            })
            .addCase(updateLog.rejected, (state, action) => {
                alert("Logs Update Failed");
            })
            .addCase(updateLog.pending, (state, action) => {
                alert("Logs Update Failed");
            });
        builder
            .addCase(deleteLog.fulfilled, (state, action) => {
                const index = state.findIndex((logs: Log) => logs.logID === action.payload);
                state.splice(index, 1);
                alert("Logs Deleted Successfully");
            })
            .addCase(deleteLog.rejected, (state, action) => {
                alert("Logs Delete Failed");
            })
            .addCase(deleteLog.pending, (state, action) => {
                alert("Logs Deleting...");
            });
        builder
            .addCase(getAllLogs.fulfilled, (state, action) => {
                action.payload.forEach((logs: Log) => {
                    state.push(logs);
                    alert("Log Fetched Successfully");
                });
            })
            .addCase(getAllLogs.rejected, (state, action) => {
                alert("Failed to fetch Logs");
            })
            .addCase(getAllLogs.pending, (state, action) => {
                alert("Fetching Logs");
            });

    }});
export default logsSlice.reducer;


