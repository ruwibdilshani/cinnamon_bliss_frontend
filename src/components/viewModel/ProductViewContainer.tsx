
import {Product} from "../../model/Product.ts";



interface ProductViewContainerProps {
    onCardClick: (product: Product) => void;
    products: Product[];
}

function ProductViewContainer({ products,onCardClick }: Readonly<ProductViewContainerProps>) {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6" id="logContainer">
            {products.map((product, index) => (
                <div
                    key={index}
                    className="bg-amber-100 border border-gray-200 rounded-xl h-96 shadow-lg hover:shadow-xl transition-shadow cursor-pointer flex flex-col relative"
                    onClick={() => onCardClick(product)}
                >
                    {product.observedImage && (
                        <img
                            src={product.observedImage}
                            alt="Observation"
                            className="w-full h-56 object-cover rounded-t-xl"
                        />
                    )}
                    <div
                        className={`p-4 px-6 bg-amber-200 flex flex-col flex-grow ${!product.observedImage ? "rounded-t-xl" : ""}`}
                    >
                        {/* Batch Code: Left-Top Brown Box */}
                        <div
                            className=" bg-amber-400 p-2 absolute top-4 left-4 bg-brown-600 text-white px-3 py-1 rounded-lg text-xl font-semibold    ">
                            Batch Code: {product.batchCode}
                        </div>

                        {/* Product Details */}
                        <div className="flex flex-col gap-4 h-full">
                            {/* Name: Left Side */}
                            <p className=" text-2xl rounded text-black  font-semibold text-left "><span
                                className={"text-gray-500"}>Category : </span>{product.name}</p>

                            {/* Quality: Centered */}

                            <p className="text-xl rounded   font-semibold text-left"><span className={"text-gray-500"}>Des : </span>{product.quality}</p>

                            {/* Price: Right Bottom */}
                            <p className="text-sm font-semibold text-right absolute bottom-12 right-6">
                                price
                            </p>
                            <p className="text-2xl font-semibold text-right absolute bottom-4 right-6">
                                Rs : {product.price}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    );
}

export default ProductViewContainer;
