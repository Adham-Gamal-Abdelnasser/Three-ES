import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';


export default function AddRoom() {
    const navigate = useNavigate("")
    const notify = (type,msg) => toast[type](msg);
    const roomSchema = Yup.object({ 
        roomName: "",
        unitId: "",
        roomItems: [
            {
            item: "",
            quantity: 1
            },
        ]
    })
  return (
    <>
        
    </>
  )
}
