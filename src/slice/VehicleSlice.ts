import {Vehicle} from "../model/Vehicle.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../store/store.tsx";


const initialState : Vehicle[] = [];

const api = axios.create({
    baseURL: "http://localhost:3000/vehicle"
});

export const saveVehicle = createAsyncThunk(
    'vehicle/saveVehicle',
    async (vehicle: Vehicle, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState; // Get Redux state
            const token = state.userReducer.jwt_token; // Access the JWT token from Redux state

            if (!token) {
                alert("Please log in to save vehicle");
                return rejectWithValue("Please log in to save vehicle");
            }

            const response = await api.post('/add', vehicle, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the request headers
                },
            });

            return response.data;
        } catch (error: any) {
            return console.log('Error:', error);
        }
    }
);

export const updateVehicle = createAsyncThunk(
    'vehicle/updateVehicle',
    async (vehicle: Vehicle, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const token = state.userReducer.jwt_token;

            if (!token) {
                alert("Please log in to update vehicle");
                return rejectWithValue("Please log in to update vehicle");
            }

            const response = await api.put(`/update/${vehicle.licensePlate}`, vehicle, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the request headers
                },
            });

            return response.data;
        } catch (error: any) {
            return console.log('Error:', error);
        }
    }
);

export const deleteVehicle = createAsyncThunk(
    'vehicle/removeVehicle',
    async (licensePlate: string, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const token = state.userReducer.jwt_token;

            if (!token) {
                alert("Please log in to delete vehicle");
                return rejectWithValue("Please log in to delete vehicle");
            }

            const response = await api.delete(`/remove/${licensePlate}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the request headers
                },
            });

            return response.data;
        } catch (error: any) {
            return console.log('Error:', error);
        }
    }
);

export const getAllVehicles = createAsyncThunk(
    'vehicle/getAllVehicles',
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const token = state.userReducer.jwt_token;

            if (!token) {
                alert("Please log in to view vehicles");
                return rejectWithValue("Please log in to view vehicles");
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
            return console.log('Error:', error);
        }
    }
);



const vehicleSlice = createSlice({
    name: 'vehicle',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveVehicle.fulfilled, (state, action) => {
           state.push(action.payload);
            })
            .addCase(saveVehicle.rejected, (state, action) => {
            console.log('Vehicle reject Successfully');
            })
            .addCase(saveVehicle.pending, (state, action) => {
                alert("Vehicle Added Successfully");
            });
        builder
            .addCase(updateVehicle.fulfilled, (state, action) => {
                const index = state.findIndex(vehicle => vehicle.vehicleID === action.payload.vehicleID);
                if (index !== -1) {
                    state[index] = action.payload;
                }
            })
            .addCase(updateVehicle.rejected, (state, action) => {
                console.log('Vehicle Update Failed');
            })
            .addCase(updateVehicle.pending, (state, action) => {
                alert("Vehicle Updated Successfully");
            });
        builder
            .addCase(deleteVehicle.fulfilled, (state, action) => {
                return state.filter((vehicle) => vehicle.vehicleID !== action.payload.vehicleID);
            })
            .addCase(deleteVehicle.rejected, (state, action) => {
                console.log('Vehicle Delete Failed');
            })
            .addCase(deleteVehicle.pending, (state, action) => {
                alert("Vehicle Deleted Successfully");
            });

        builder
            .addCase(getAllVehicles.fulfilled, (state, action) => {
                action.payload.forEach((vehicle: Vehicle) => {
                    state.push(vehicle);
                    alert("Vehicle Fetched Successfully");
                });
            })
            .addCase(getAllVehicles.rejected, (state, action) => {
                console.log('Vehicle reject Successfully');
            })
            .addCase(getAllVehicles.pending, (state, action) => {
                alert("Vehicle Fetched Successfully");
            });


    }
});

export default vehicleSlice.reducer;