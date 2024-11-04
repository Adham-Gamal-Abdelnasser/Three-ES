import axios from 'axios';
import { Button, Card } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaShoppingCart } from "react-icons/fa";

export default function RoomByUnit() {
    let {id} = useParams()
    let [rooms,setRooms] = useState([])
    async function getRooms() {
        try {
            const response = await axios.get(
              `${process.env.REACT_APP_BASE_URL}room`
            );
            console.log(response);
            
          } catch (error) {
            console.error("Error fetching categories:", error);
          }
    }
    useEffect(()=>{
        getRooms()
    },[id])
  return (
    <>
        <div className="grid px-2">
            <div className="w-full col-span-12">
            <div className="flex flex-wrap -mx-1 overflow-y-auto">
                {rooms.map((room, index) => {
                return (
                    <div key={index} className="w-3/12 p-1">
                    <Card
                        className="max-w-md p-2"
                        imgAlt={room.name}
                        imgSrc={room.imageCover}
                    >
                        <div className="w-full flex items-center justify-between flex-wrap">
                        <h5 className="w-full text-lg font-semibold tracking-tight text-gray-900 ">
                            {room.title}
                        </h5>
                        <div className="w-full flex justify-between">
                            <span className=" font-bold text-gray-900 dark:text-white border-2 border-black p-2 rounded-2xl">
                            ${room.price}
                            </span>
                            <Button className="text-sm font-normal bg-black flex items-center">
                            Add to cart <FaShoppingCart className="" />
                            </Button>
                        </div>
                        </div>
                    </Card>
                    </div>
                );
                })}
            </div>
            </div>
        </div>
    </>
  )
}
