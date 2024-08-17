import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";



const Card = () => {

    const axiosPublic = useAxiosPublic();
    const [filteredProduct, setFilteredProduct] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortOption, setSortOption] = useState('priceAsc');
    const itemsPerPage = 6;

    // Fetch products with search, pagination, filters, and sorting
    const { data, isLoading, error } = useQuery({
        queryKey: ['products', currentPage, searchTerm, selectedBrand, selectedCategory, minPrice, maxPrice, sortOption],
        queryFn: async () => {
            const res = await axiosPublic.get('/products', {
                params: {
                    page: currentPage,
                    limit: itemsPerPage,
                    search: searchTerm,
                    brand: selectedBrand,
                    category: selectedCategory,
                    minPrice: minPrice || undefined,
                    maxPrice: maxPrice || undefined,
                    sort: sortOption,
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

    const handleSearch = e => {
        e.preventDefault();
        const searchText = e.target.search.value;
        setSearchTerm(searchText);
    };
   

    return (
        <div className="mx-[10px] lg:mx-[60px]">
            <div>
                <h1 className="text-center font-bold text-3xl text-red-600">Our Products</h1>
            </div>

            <div className="text-center my-4">
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        name="search"
                        placeholder="Search products..."
                        className="input input-bordered w-full max-w-xs"
                    />
                    <input type="submit" value="Search" className="btn" />
                </form>
            </div>

            <div className="my-4">
                {/* Brand Filter */}
                <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="select select-bordered mr-4"
                >
                    <option value="">All Brands</option>
                    <option value="BrandA">Brand A</option>
                    <option value="BrandB">Brand B</option>
                    <option value="BrandC">Brand C</option>
                    <option value="BrandD">Brand D</option>
                    <option value="BrandE">Brand E</option>
                    {/* Add more brands as needed */}
                </select>

                {/* Category Filter */}
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="select select-bordered mr-4"
                >
                    <option value="">All Categories</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Bags">Bags</option>
                    <option value="Jewelry">Jewelry</option>
                    <option value="Footwear">Footwear</option>
                    {/* Add more categories as needed */}
                </select>

                {/* Price Range Filter */}
                <select
                    value={`${minPrice}-${maxPrice}`}
                    onChange={(e) => {
                        const [min, max] = e.target.value.split('-').map(Number);
                        setMinPrice(min || '');
                        setMaxPrice(max || '');
                    }}
                    className="select select-bordered mr-4"
                >
                     <option value="">All Prices</option>
    <option value="0-25">Under $25</option>
    <option value="25-50">$25 - $50</option>
    <option value="50-100">$50 - $100</option>
    <option value="100-150">$100 - $150</option>
    <option value="150-Infinity">Above $150</option>
                    
                </select>

                {/* Sort Option */}
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="select select-bordered"
                >
                    <option value="priceAsc">Price: Low to High</option>
                    <option value="priceDesc">Price: High to Low</option>
                    <option value="dateAsc">Date Added: Oldest First</option>
                    <option value="dateDesc">Date Added: Newest First</option>
                </select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-[16px]">
                {filteredProduct.map(product => (
                    <div className="card bg-base-100 shadow-xl" key={product._id}>
                        <figure className="px-10 pt-10">
                            <img
                                src={product.productImage}
                                alt={product.productName}
                                className="rounded-xl h-[150px] w-full"
                            />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{product.productName}</h2>
                            <p>{product.description}</p>
                            <p><span className="font-bold">Price:</span> ${product.price}</p>
                            <p><span className="font-bold">Category:</span> {product.category}</p>
                            <p><span className="font-bold">Ratings:</span> {product.ratings}</p>
                            <p><span className="font-bold">Brand:</span> {product.brandName}</p>
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


//59.99
//29.99
//75.99
//49.99
//39.99
//64.99
//129.99
//19.99
//24.99
//149.99
//34.99
//25.99
//19.99
//45
//89.99
//39.99
//59.99
//29.99
//49.99
//24.99
//129.99
//59.99
//89.99
//19.99
//49.99
//149.99
//24.99
//299.99
//39.99
//89.99
//29.99
//79.99
//54.99
//34.99
//44.99
//29.99
//19.99
//99.99
//149.99
//129.99

