import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddUnit from '../AddUnit/AddUnit';
import { Button } from 'flowbite-react';
import { Link, Outlet } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function Units() {
  const [units, setUnits] = useState([]);
  const notify = (type,msg) => toast[type](msg);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}unit`);
        setUnits(response.data.allUnits);
      } catch (error) {
        console.error("Error fetching units:", error);
      }
    };

    fetchUnits();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <h2 className="border-b-2 border-green-500 my-6 text-2xl font-bold text-center text-gray-800">
        Units
      </h2>
      <div className="flex">
        <Link className='w-2/6 py-4 flex items-center justify-center' to="/addUnit">
            <Button color="black" className='bg-transparent border-2 border-black rounded-2xl text-black hover:bg-black hover:text-white'>
                <span className='flex items-center justify-center'>Add Unit <FaPlus className='ms-2' /></span>
            </Button>
        </Link>
        <Link className='w-2/6 py-4 flex items-center justify-center' to="/addRoom">
                <Button color="black" className='bg-transparent border-2 border-black rounded-2xl text-black hover:bg-black hover:text-white'>
                    <span className='flex items-center justify-center'>Add Room <FaPlus className='ms-2' /></span>
                </Button>
        </Link>
      </div>
      <div className="grid grid-cols-12">
        <div className="w-full col-span-3">
          <div className="flex flex-wrap -mx-1 overflow-y-auto">
            {units.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-6">
                {units.map((unit) => {
                    localStorage.setItem("unitId",unit._id)
                    return <Link key={unit._id} to={unit._id}>
                    <div  id={unit._id} className="w-3/3 max-w-xs flex flex-col p-4 shadow-lg rounded-lg bg-white">
                      <h3 className="text-xl font-semibold mb-2 text-gray-900">{unit.unitName}</h3>
                      <p className="text-gray-700 mb-1"><strong>Floor Number:</strong> {unit.floorNum}</p>
                      {/* <p className="text-gray-700 mb-1"><strong>Room Name:</strong> {unit.roomName}</p> */}
                      {/* <p className="text-gray-700 mb-1"><strong>Client ID:</strong> {unit.client}</p> */}
                      <p className="text-gray-500"><strong>Created At:</strong> {new Date(unit.createdAt).toLocaleDateString()}</p>
                      <p className="text-gray-500"><strong>Updated At:</strong> {new Date(unit.updatedAt).toLocaleDateString()}</p>
                    </div>
                  </Link>
                })}
              </div>
            ) : (
              <p className="text-center text-gray-600">No units available.</p>
          )}
          </div>
        </div>
        <div className="w-full col-span-9">
          
          <Outlet></Outlet>
        </div>
      </div>     
    </div>
  );
}
