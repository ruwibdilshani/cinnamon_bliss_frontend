import {Vehicle} from "../model/Vehicle.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


const initialState : Vehicle[] = [];

const api = axios.create({
    baseURL: "http://localhost:3000/vehicles"
});

export const saveVehicle = createAsyncThunk(
    'vehicles/saveVehicle',
    async (vehicle: Vehicle) => {
        console.log("Slice", vehicle);
        try {
            const response = await api.post('/add', vehicle);
            return response.data;
        } catch (error) {
            return console.log('error', error)
        }
    }
);

export const updateVehicle = createAsyncThunk(
    'vehicles/updateVehicle',
    async (vehicle: Vehicle) => {
        try {
            const response = await api.put(`/update/${vehicle.licensePlate}`, vehicle);
            return response.data;
        } catch (error) {
            return console.log('error', error)
        }
    }
);

export const deleteVehicle = createAsyncThunk(
    'vehicles/removeVehicle',
    async (licensePlate: string) => {
        try {
            const response = await api.delete(`/remove/${licensePlate}`);
            return response.data;
        } catch (error) {
            return console.log('error', error)
        }
    }
);

export const getAllVehicles = createAsyncThunk(
    'vehicles/getAllVehicles',
    async () => {
        try {
            const response = await api.get('/all');
            return response.data;
        } catch (error) {
            return console.log('error', error)
        }
    });

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
                const index = state.findIndex((vehicle:Vehicle) => vehicle.licensePlate === action.payload.licensePlate);
                state[index] = action.payload;
                alert("Vehicle Updated Successfully");
            })
            .addCase(updateVehicle.rejected, (state, action) => {
                console.log('Vehicle Update Failed');
            })
            .addCase(updateVehicle.pending, (state, action) => {
                alert("Vehicle Updated Successfully");
            });
        builder
            .addCase(deleteVehicle.fulfilled, (state, action) => {
                const index = state.findIndex((vehicle:Vehicle) => vehicle.licensePlate === action.payload);
                state.splice(index, 1);
                alert("Vehicle Deleted Successfully");
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