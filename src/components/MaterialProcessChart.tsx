import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {useDispatch, useSelector} from "react-redux";

import {AppDispatch, RootState} from "../store/store.tsx";
import {CinnamonStock} from "../model/CinnamonStock.ts";
import {Product} from "../model/Product.ts";
// import {useEffect} from "react";
// import {getAllCinnamonStock} from "../slice/StockSlice.ts";
// import {getAllProducts} from "../slice/ProductSlice.ts";

interface MaterialProcessChartProps {
    isModel : string
    isType: string
}

function MaterialProcessChart({isModel,isType}:MaterialProcessChartProps) {
    const cinnamonStock: CinnamonStock[] = useSelector((state: RootState) => state.cinnamonStock);
    const product: Product[] = useSelector((state: RootState) => state.product);
 //   const dispatch = useDispatch<AppDispatch>();
    //
    // useEffect(() => {
    //     if (!cinnamonStock || cinnamonStock.length === 0) {
    //         dispatch(getAllCinnamonStock());
    //     }
    // }, [dispatch,cinnamonStock]);
    //
    // useEffect(() => {
    //     if (!product || product.length === 0) {
    //         dispatch(getAllProducts());
    //     }
    // }, [dispatch,product]);



   if (isType === 'stock') {
       // Group crops by category and calculate counts
       const cropCategoryData = cinnamonStock.reduce<{ [key: string]: number }>((acc, material) => {
           acc[material.batchCode] = (acc[material.batchCode] || 0) + 10;
           return acc;
       }, {});

       // Convert grouped data to the Highcharts series format
       const chartData = Object.entries(cropCategoryData).map(([category, count]) => ({
           name: category,
           y: count,

       }));

       const options = {
           chart: {
               type: isModel,
               backgroundColor: "#FCD34D",
               borderRadius: 22,
               style: {
                   fontFamily: "Poppins", // Set global font family

               },


           },
           title: {
               text: 'Stock Available',

           },
           tooltip: {
               pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",

           },
           accessibility: {
               point: {
                   valueSuffix: "%",

               },
           },
           plotOptions: {
               pie: {
                   allowPointSelect: true,
                   cursor: "pointer",

                   dataLabels: {
                       enabled: true,

                       style: {
                           fontFamily: "Poppins", // Set font for data labels
                           fontSize: "10px",

                       },
                       format: "<b>{point.name}</b>: {point.percentage:.1f} %",

                   },
               },
           },
           series: [
               {
                   name: "Raw Material",
                   colorByPoint: true,
                   data: chartData,

               },
           ],
       };

       return <HighchartsReact highcharts={Highcharts} options={options} />;
   }


   if (isType === 'product') {
       // Group crops by category and calculate counts
       const productDta = product.reduce<{ [key: string]: number }>((acc, material) => {
           acc[material.name] = (acc[material.price] || 0) + 10;
           return acc;
       }, {});

       // Convert grouped data to the Highcharts series format
       const chartData = Object.entries(productDta).map(([category, count]) => ({
           name: category,
           y: count,

       }));

       const options = {
           chart: {
               type: isModel,
               backgroundColor: "#FCD34D",
               borderRadius: 22,
               style: {
                   fontFamily: "Poppins", // Set global font family
               },
           },
           title: {
               text: ' Product Category',
           },
           tooltip: {
               pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
           },
           accessibility: {
               point: {
                   valueSuffix: "%",
               },
           },
           plotOptions: {
               pie: {
                   allowPointSelect: true,
                   cursor: "pointer",
                   dataLabels: {
                       enabled: true,
                       style: {
                           fontFamily: "Poppins", // Set font for data labels
                           fontSize: "10px",
                       },
                       format: "<b>{point.name}</b>: {point.percentage:.1f} %",
                   },
               },
           },
           series: [
               {
                   name: "Raw Material",
                   colorByPoint: true,
                   data: chartData,
               },
           ],
       };

       return <HighchartsReact highcharts={Highcharts} options={options} />;
   }


}

export default MaterialProcessChart;
