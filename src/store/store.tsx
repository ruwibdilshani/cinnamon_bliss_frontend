import {configureStore} from "@reduxjs/toolkit";
import employeeSlice from "../slice/EmployeeSlice.ts";
import supplierSlice from "../slice/SupplierSlice.ts";


export const store = configureStore({
    reducer: {
        employee: employeeSlice,
        supplier: supplierSlice,


    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),

});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;