import {Log} from "../model/Log.ts";
import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store/store.tsx";


const initialState : Log[] = [];

const api = axios.create({
    baseURL: "http://localhost:3000/log"
});


export const saveLog = createAsyncThunk(
    'log/saveLog',
    async (log: Log, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState; // Get Redux state
            const token = state.userReducer.jwt_token; // Access the JWT token from Redux state

            if (!token) {
                alert("Please log in to save log");
                return rejectWithValue("Please log in to save log");
            }

            const response = await api.post('/add', log, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the request headers
                },
            });

            return response.data;
        } catch (error: any) {
            console.log('Error:', error);
        }
    }
);

export const updateLog = createAsyncThunk(
    'log/updateLog',
    async (log: Log, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const token = state.userReducer.jwt_token;

            if (!token) {
                alert("Please log in to update log");
                return rejectWithValue("Please log in to update log");
            }

            const response = await api.put(`/update/${log.logID}`, log, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the request headers
                },
            });

            return response.data;
        } catch (error: any) {
            console.log('Error:', error);
        }
    }
);

export const deleteLog = createAsyncThunk(
    'log/removeLog',
    async (logID: string, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const token = state.userReducer.jwt_token;

            if (!token) {
                alert("Please log in to delete log");
                return rejectWithValue("Please log in to delete log");
            }

            const response = await api.delete(`/remove/${logID}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the request headers
                },
            });

            return response.data;
        } catch (error: any) {
            console.log('Error:', error);
        }
    }
);

export const getAllLogs = createAsyncThunk(
    'log/getAllLogs',
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const token = state.userReducer.jwt_token;

            if (!token) {
                alert("Please log in to view logs");
                return rejectWithValue("Please log in to view logs");
            }

            const response = await api.get('/all', {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the request headers
                },
            });

            return response.data;
        } catch (error: any) {
            if (error.response?.status === 401) {
                alert("Session expired. Please log in again.");
            }
            console.log('Error:', error);
        }
    }
);


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


