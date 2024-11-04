import "./App.css";
import Home from "./Components/Home/Home.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout.jsx";
import Products from "./Components/Products/Products.jsx";
import AddProduct from "./Components/AddProduct/AddProduct.jsx";
import Customers from "./Components/Customers/Customers.jsx";
import Categories from "./Components/Categories/Categories.jsx";
import AddCategory from "./Components/AddCategory/AddCategory.jsx";
import Units from "./Components/Units/Units.jsx";
import AddClient from "./Components/AddClient/AddClient.jsx";
import { CartContextProvider } from "./Context/CartContext.js";
import Cart from "./Components/Cart/Cart.jsx";
import { DetailsContextProvider } from "./Context/DetailsContext.js";
import { ToastContainer } from 'react-toastify';
import AddUnit from "./Components/AddUnit/AddUnit.jsx";
import ProductsLayout from "./Components/ProductsLayout/ProductsLayout.jsx";
import { CategoryContextProvider } from "./Context/CategoryContext.js";
import ProductByCategory from "./Components/ProductByCategory/ProductByCategory.jsx";
import RoomByUnit from "./Components/RoomByUnit/RoomByUnit.jsx";
import AddRoom from "./Components/AddRoom/AddRoom.jsx";

function App() {
  let routers = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Products /> },
        { path: "products", element: <ProductsLayout /> , children:[
          { path: "", element: <Products /> },
          { path: ":id", element: <ProductByCategory /> },
        ]},
        { path: "addProduct", element: <AddProduct /> },
        { path: "addClient", element: <AddClient /> },
        { path: "addUnit", element: <AddUnit /> },
        { path: "addRoom", element: <AddRoom /> },
        { path: "customers", element: <Customers /> },
        { path: "cart", element: <Cart /> },
        { path: "categories", element: <Categories /> },
        { path: "addCategory", element: <AddCategory /> },
        { path: "units", element: <Units /> , children:[
          {path:":unitId" , element: <RoomByUnit></RoomByUnit>}
        ] },
        
      ],
    },
  ]);

  return (
    <CartContextProvider>
      <CategoryContextProvider>
        <DetailsContextProvider>
          <ToastContainer></ToastContainer>
          <RouterProvider router={routers}></RouterProvider>
        </DetailsContextProvider>
        </CategoryContextProvider>
    </CartContextProvider>
  );
}

export default App;
