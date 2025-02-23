import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {UserAdmin} from "../model/UserAdmin.ts";


const initialState = {
    jwt_token: null,
    refresh_token : null,
    email: null,
    isAuthenticated: false,
    loading: false,
    error: '',
};

const api = axios.create({
    baseURL : "http://localhost:3000"
})

export const registerUser= createAsyncThunk(
    'user/register',
    async (user : UserAdmin)=>{
        try{

            const response = await api.post('/auth/register', {user},{withCredentials: true});

            return response.data;


        }catch(err){
            console.log(err);
        }
    }
)

export const loginUser= createAsyncThunk(

    'user/login',
    async (user : UserAdmin)=>{
        try{
            const response = await api.post('/auth/login', {user},{withCredentials: true});
            return response.data;


        }catch(err){
            console.log(err);
        }
    }
)


export const refreshAuthToken = createAsyncThunk(
    'user/refreshToken',
    async (refreshToken : any)=>{
        try{
            const response = await api.post('/auth/refresh-token', {refreshToken},{withCredentials: true});
            return response.data;
        }catch(err){
            console.log(err);
        }
    }
)

const authUserSlice = createSlice({
    name: 'userReducer',
    initialState,
    reducers:{
        logOutUser(state){
            state.isAuthenticated = false;
        }
    },
    extraReducers(builder){
        builder
            .addCase(registerUser.pending,(state, action)=>{
                console.log('Hello World');
            })
            .addCase(registerUser.fulfilled,(state, action)=>{
                console.log('User Registered Successfully');

            })
            .addCase(registerUser.rejected,(state, action)=>{
                state.error = action.payload as string;
            });
        builder
            .addCase(loginUser.rejected,(state, action)=>{
                state.error = action.payload as string;
                state.isAuthenticated = false;
            })
            .addCase(loginUser.fulfilled,(state, action)=>{
                state.jwt_token = action.payload.accessToken;
                state.refresh_token = action.payload.refreshToken;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.pending,(state, action)=>{
                state.isAuthenticated = false;
            })
        builder
            .addCase(refreshAuthToken.fulfilled,(state, action)=>{
                state.jwt_token = action.payload.accessToken;
                state.refresh_token = action.payload.refreshToken;
                state.isAuthenticated = true;
            })
            .addCase(refreshAuthToken.rejected,(state, action)=>{
                state.error = action.payload as string;
                state.isAuthenticated = false;
            })
            .addCase(refreshAuthToken.pending,(state, action)=>{
                state.isAuthenticated = false;
            })

    }
});
export const {logOutUser} = authUserSlice.actions;
export default authUserSlice.reducer;