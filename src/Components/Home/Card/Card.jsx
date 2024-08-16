import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";



const Card = () => {

    const axiosPublic = useAxiosPublic();
    const [filteredProduct, setFilteredProduct] = useState([]);

    const { data: products = [], isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosPublic.get('/products');
            setFilteredProduct(res.data);
            return res.data;
        }
    });

    useEffect(() => {
        // You can add any logic here if you want to manipulate the filtered products further
        setFilteredProduct(products);
    }, [products]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetching products: {error.message}</p>;

   

    return (
        <div className="mx-[60px]">
            <div>
                <h1 className="text-center font-bold text-3xl text-red-600">Our Products</h1>
            </div>

            <div>

            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-[16px]">
                {
                    filteredProduct.map(product=>
                        <div className="card bg-base-100  shadow-xl">
  <figure className="px-10 pt-10">
    <img
   
      src={product.productImage}
      alt="Shoes"
      className="rounded-xl h-[150px] w-full" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{product.productName}</h2>
    <p>{product.description}</p>
    <p><span className="font-bold">Price:</span>{product.price}</p>
    <p><span className="font-bold">Category:</span>{product.category}</p>
    <p><span className="font-bold">Ratings:</span>{product.ratings}</p>
    <p><span className="font-bold">CreationDate:</span>{product.creationDate}</p>
    <div className="card-actions">
      <button className=" btn bg-red-400 text-white">Buy Now</button>
    </div>
  </div>
</div>
                    )
                }
            </div>

        </div>
    );
};

export default Card;