import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";



const Card = () => {

    const axiosPublic = useAxiosPublic();
    const [filteredProduct, setFilteredProduct] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; 

    const { data, isLoading, error } = useQuery({
        queryKey: ['products', currentPage],
        queryFn: async () => {
            const res = await axiosPublic.get('/products', {
                params: {
                    page: currentPage,
                    limit: itemsPerPage,
                },
            });
            return res.data;
        },
    });

    useEffect(() => {
        if (data) {
            setFilteredProduct(data.products);
        }
    }, [data]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetching products: {error.message}</p>;

    const totalPages = data?.totalPages || 1;

    // Pagination handlers
    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const goToPage = (page) => {
        setCurrentPage(page);
    };

   

    return (
        <div className="mx-[10px] lg:mx-[60px]">
        <div>
            <h1 className="text-center font-bold text-3xl text-red-600">Our Products</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[16px]">
            {filteredProduct.map(product => (
                <div className="card bg-base-100 shadow-xl" key={product._id}>
                    <figure className="px-10 pt-10">
                        <img
                            src={product.productImage}
                            alt={product.productName}
                            className="rounded-xl h-[150px] w-full" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">{product.productName}</h2>
                        <p>{product.description}</p>
                        <p><span className="font-bold">Price:</span> ${product.price}</p>
                        <p><span className="font-bold">Category:</span> {product.category}</p>
                        <p><span className="font-bold">Ratings:</span> {product.ratings}</p>
                        <p><span className="font-bold">Creation Date:</span> {new Date(product.creationDate).toLocaleDateString()}</p>
                        <div className="card-actions">
                            <button className="btn bg-red-400 text-white">Buy Now</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
            <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="btn bg-gray-300 text-black mx-1"
            >
                Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index + 1}
                    onClick={() => goToPage(index + 1)}
                    className={`btn mx-1 ${currentPage === index + 1 ? 'bg-red-500 text-white' : 'bg-gray-300 text-black'}`}
                >
                    {index + 1}
                </button>
            ))}
            <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="btn bg-gray-300 text-black mx-1"
            >
                Next
            </button>
        </div>
    </div>
    );
};

export default Card;