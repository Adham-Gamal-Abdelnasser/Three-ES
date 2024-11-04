import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/CartContext.js'
import { Button, Card } from 'flowbite-react'
import { productDetails } from '../../Context/DetailsContext.js'
export default function Cart() {
    const [cartProducts,setCartProducts] = useState([])
    const [cartDetails,setCartDetails] = useState(null)

    let {getLoggedUserCart,removeItem,updateCart,clearCart} = useContext(cartContext)

    // todo display cart products
    async function getCart() {
      let response = await getLoggedUserCart()
      setCartDetails(response?.data.cart);
      setCartProducts(response?.data.cart.cartItems)      
    }

    //todo do delete item 
    async function deleteItem(id) {
      let response = await removeItem(id)
      setCartDetails(response?.data.cart);
      setCartProducts(response?.data.cart.cartItems) 
      getCart()      
    }

    //todo update quantity 
    async function updateQuantity(id,quantity) {
      if (quantity<1) {
        return null
      }
      else {
        let response = await updateCart(id,quantity)
        setCartDetails(response?.data.cart);
        setCartProducts(response?.data.cart.cartItems) 
        getCart()
      }
    }

    //todo reset cart
    async function resetCart() {
      let response = await clearCart()
      setCartDetails(response?.data.cart);
      setCartProducts(response?.data.cart.cartItems) 
      getCart()
    }

    useEffect(()=>{
      getCart()
    },[])

  return (
    <>
      <h3 className='mx-6 text-xl capitalize'>total cart purchase : <span className='text-gray-800'>{cartDetails?.totalPrice} EGP</span></h3>
      <div className="flex p-5 flex-wrap overflow-y-auto">
      {
        cartProducts?.map((pro,index)=>{ 
          return <div key={index} className="w-2/6 p-1">
              <Card imgAlt={pro.product.name} imgSrc={pro.product.image} className="max-w-md p-2">
                  <div className="w-full flex items-center justify-between flex-wrap">
                      <h5 className=" w-full text-lg font-semibold tracking-tight text-gray-900 ">
                          {pro.product.name}
                      </h5>
                      <div className='w-full flex justify-between items-center'>
                        <p>Price : {pro.product.price}</p>
                        <div className='flex items-center'>
                            <Button onClick={()=>updateQuantity(pro._id,pro.quantity+1)} className="font-bold text-gray-900 dark:text-white border-2 border-black text-2xl px-1 py-0 rounded-2xl">+</Button>
                            <span className="text-4xl mx-3">{pro.quantity}</span>
                            <Button onClick={()=>updateQuantity(pro._id,pro.quantity-1)} className="font-bold text-gray-900 dark:text-white border-2 border-black text-2xl px-1 py-0 rounded-2xl">-</Button>
                        </div>
                      </div>
                      <Button onClick={()=>deleteItem(pro._id)}>Remove</Button>
                  </div>
              </Card>
            </div>
        })
      }
      <Button onClick={()=>resetCart()}>clear all</Button>
      </div>
    </>
  )
}
