import React, { useState, useEffect, useContext } from 'react';
import { Avatar, Button, Card, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Customers from '../Customers/Customers.jsx';
import { categoryContext } from '../../Context/CategoryContext.js';
import { cartContext } from '../../Context/CartContext.js';
// ! icons
import { FaPlus, FaShoppingCart } from 'react-icons/fa';
import { RiSearch2Fill } from 'react-icons/ri';
import NavCategories from '../NavCategories/NavCategories.jsx';


export default function Products() {
    const [products, setProducts] = useState([]);
    

    const [categories,setCategories] = useState([])

    let {getCategories}= useContext(categoryContext)
    async function recieveCategories() {
        let response = await  getCategories()
        console.log(response.data.allCategories);
        setCategories(response.data.allCategories)        
    }
    useEffect(()=>{
        recieveCategories()
    },[])


    // todo add product to cart
    let {addToCart} = useContext(cartContext)
    async function addProductToCart(id) {
        let response = await addToCart(id)
        if (response.data.status==200) {
            
            // toast.success(response.message)
        }
        console.log(response);
    }

    // todo Fetch all products from API
    async function GetAllProducts() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}product`);
            setProducts(response.data.allProducts)
            console.log(response);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    // todo Call GetAllProducts when the component mounts
    useEffect(() => {
        GetAllProducts();
    },[]);

    return (
        <div className="min-h-screen flex flex-col rounded-2xl">
            <div className="flex-grow p-6 flex justify-center">
                <div className="w-full">
                    <div className="grid grid-cols-12">
                        <div className="w-full col-span-9">
                            <div className="flex flex-wrap -mx-1 overflow-y-auto">
                                {products.map((product, index) => (
                                    <div key={index} className="w-2/6 p-1">
                                        <Card
                                            className="max-w-md p-2"
                                            imgAlt={product.name}
                                            imgSrc={product.imageCover}
                                        >

                                            <div className="w-full flex items-center justify-between flex-wrap">
                                                <h5 className=" w-full text-lg font-semibold tracking-tight text-gray-900 ">
                                                    {product.title}
                                                </h5>
                                                <div className='w-full flex justify-between'>
                                                    <span className=" font-bold text-gray-900 dark:text-white border-2 border-black p-2 rounded-2xl">
                                                        ${product.price}
                                                    </span>
                                                    <Button onClick={()=>addProductToCart(product._id)} className="text-sm font-normal bg-black flex items-center">
                                                        Add to cart <FaShoppingCart />
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full col-span-3">
                            <Customers></Customers>
                        </div>
                    </div>
                    
                </div>

            </div>
        </div>
    );
}
