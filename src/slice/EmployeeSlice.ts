
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {Employee} from "../model/Employee.ts";
import  axios from "axios";



const initialState: Employee[]=[];

const  api = axios.create({
    baseURL: "http://localhost:3000/employees"
});


export const saveEmployee = createAsyncThunk(
    'employees/saveEmployee',
    async (employee:Employee)=>{
        console.log("Slice",employee);
        try {
            const response = await api.post('/add',employee);
            return response.data;
        }catch (error){
            return console.log('error',error)
        }
    }
);

export const updateEmployee = createAsyncThunk(
    'employees/updateEmployee',
    async (employee:Employee)=>{
        try {
            const response = await api.put(`/update/${employee.employeeID}`,employee);
            return response.data;
        }catch (error){
            return console.log('error',error)
        }
    }
);

export const deleteEmployee = createAsyncThunk(
    'employees/removeEmployee',
    async (id:string)=>{
        try {
            const response = await api.delete(`/remove/${id}`);
            return response.data;
        }catch (error){
            return console.log('error',error)
        }
    }
);

export const getAllEmployees = createAsyncThunk(
    'employees/getAllEmployees',
    async ()=>{
        try {
            const response = await api.get('/all');
            return response.data;
        }catch (error){
            return console.log('error',error)
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