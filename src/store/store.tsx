import {configureStore} from "@reduxjs/toolkit";
import employeeSlice from "../slice/EmployeeSlice.ts";
import supplierSlice from "../slice/SupplierSlice.ts";
import vehicleSlice from "../slice/VehicleSlice.ts";
import cinnamonStockSlice from "../slice/StockSlice.ts";
import productSlice from "../slice/ProductSlice.ts";
import logsSlice from "../slice/LogsSlice.ts";


export const store = configureStore({
    reducer: {
        employee: employeeSlice,
        supplier: supplierSlice,
        vehicle: vehicleSlice,
        cinnamonStock: cinnamonStockSlice,
        product : productSlice,
        log : logsSlice,


    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),

});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;