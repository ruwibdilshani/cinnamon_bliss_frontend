import {configureStore} from "@reduxjs/toolkit";
import employeeSlice from "../slice/EmployeeSlice.ts";


export const store = configureStore({
    reducer: {
        employee: employeeSlice,


    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),

});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;