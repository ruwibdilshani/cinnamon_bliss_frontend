
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {Employee} from "../model/Employee.ts";
import  axios from "axios";
import {RootState} from "../store/store.tsx";



const initialState: Employee[]=[];

const  api = axios.create({
    baseURL: "http://localhost:3000/employees"
});


 // Make sure to import the RootState

export const saveEmployee = createAsyncThunk(
    'employees/saveEmployee',
    async (employee: Employee, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState; // Get state from Redux
            const token = state.userReducer.jwt_token; // Access JWT token from Redux state

            if (!token) {
                alert("Please log in to save employee");
                return rejectWithValue("Please log in to save employee");
            }

            const response = await api.post('/add', employee, {
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

export const updateEmployee = createAsyncThunk(
    'employees/updateEmployee',
    async (employee: Employee, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const token = state.userReducer.jwt_token;

            if (!token) {
                alert("Please log in to update employee");
                return rejectWithValue("Please log in to update employee");
            }

            const response = await api.put(`/update/${employee.employeeID}`, employee, {
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

export const deleteEmployee = createAsyncThunk(
    'employees/removeEmployee',
    async (id: string, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const token = state.userReducer.jwt_token;

            if (!token) {
                alert("Please log in to delete employee");
                return rejectWithValue("Please log in to delete employee");
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

export const getAllEmployees = createAsyncThunk(
    'employees/getAllEmployees',
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const token = state.userReducer.jwt_token;

            if (!token) {
                alert("Please log in to view employees");
                return rejectWithValue("Please log in to view employees");
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






const employeeSlice =  createSlice({
    name: 'employees',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveEmployee.fulfilled, (state, action) => {
                state.push(action.payload);
                alert("Employee Added Successfully")
            })
            .addCase(saveEmployee.rejected, (state, action) => {
                alert("Error Occurred")
            })
            .addCase(saveEmployee.pending, (state, action) => {
                alert("Saving Employee")
            });
        builder
            .addCase(updateEmployee.fulfilled, (state, action) => {
                const index = state.findIndex(emp => emp.employeeID === action.payload.employeeID);
                if (index !== -1) {
                    state[index] = action.payload;
                }
            })
            .addCase(updateEmployee.rejected, (state, action) => {
                alert("Error Occurred")
            })
            .addCase(updateEmployee.pending, (state, action) => {
                alert("Updating Employee")
            });
        builder
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                return state.filter((employee) => employee.employeeID !== action.payload.employeeID);
            })
            .addCase(deleteEmployee.rejected, (state, action) => {
                 alert("Error Occurred")
            })
            .addCase(deleteEmployee.pending, (state, action) => {
                 alert("Deleting Employee")
            });

        builder
            .addCase(getAllEmployees.fulfilled, (state, action) => {
                action.payload.forEach((employee: Employee) => {
                    state.push(employee);
                    alert("Employees Fetched Successfully")
                });
            })
            .addCase(getAllEmployees.rejected, (state, action) => {
                alert("Error fetching employees");
            })
            .addCase(getAllEmployees.pending, (state, action) => {
                alert("Fetching employees...");
            });
    }
});

export default employeeSlice.reducer;