import axios from "axios";

const { createContext } = require("react");

export let cartContext = createContext()
let activeClientId = localStorage.getItem("activeClientId")


export function CartContextProvider(props) {

    // todo send added product data to API 
    function addToCart(id) {
        return axios.post(`${process.env.REACT_APP_BASE_URL}cart/clients/${activeClientId}`,{
            product:id,
            quantity:1
        }).then(response=>response)
        .catch(error=>error)
    }

    // todo display product
    function getLoggedUserCart() {
        return axios.get(`${process.env.REACT_APP_BASE_URL}cart/clients/${activeClientId}`,).then(response=>response)
        .catch(error=>error)
    }

    //todo delete product
    function removeItem(id) {
        return axios.delete(`${process.env.REACT_APP_BASE_URL}cart/${activeClientId}/item/${id}`,).then(response=>response)
        .catch(error=>error)
    }

    //todo update cart
    function updateCart(id,quantity) {
        return axios.patch(`${process.env.REACT_APP_BASE_URL}cart/${activeClientId}/item/${id}`,
            {
                quantity:quantity
            }
        ).then(response=>response)
        .catch(error=>error)
    }

    //todo clear cart
    function clearCart() {
        return axios.delete(`${process.env.REACT_APP_BASE_URL}cart/${activeClientId}`).then(response=>response)
        .catch(error=>error)
    }


    return <cartContext.Provider value={{addToCart,getLoggedUserCart,removeItem,updateCart,clearCart}}>
        {props.children}
    </cartContext.Provider>
}