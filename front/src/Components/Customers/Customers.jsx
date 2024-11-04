import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Button } from 'flowbite-react';
import { Link } from "react-router-dom";

export default function Customers() {
  const [clients, setClients] = useState([]);
  const [activeClientId, setActiveClientId] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}client`);
        setClients(response.data.allClients);
        const storedClientId = localStorage.getItem("activeClientId");
        if (storedClientId) {
          setActiveClientId(storedClientId);
        }
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  const handleActivateClient = (clientId) => {
    localStorage.setItem("activeClientId", clientId);
    setActiveClientId(clientId);
  };

  return (
    <div className="min-h-screen flex flex-col rounded-2xl">
      <div className="flex-grow p-6">
        <h2 className="border-b-2 border-green-400 my-3 text-xl font-bold text-center">Clients</h2>
        <Link className='w-6/6 flex items-center justify-center' to="/addClient">
          <Button color="black" className='bg-transparent border-2 border-black rounded-2xl text-black hover:bg-black hover:text-white'>
              <span className='flex items-center justify-center'>Add Client</span>
          </Button>
        </Link>
        <div>
          {clients.length > 0 ? (
            clients.map((client) => (
              <div
                key={client._id}
                className="w-full flex justify-between items-center mb-2 p-4 shadow-lg rounded-2xl bg-white"
              >
                <Avatar
                  rounded={true}
                  alt={`${client.firstName} ${client.lastName}`}
                />
                <h2 className="text-lg font-medium">
                  {client.firstName} {client.lastName} 
                </h2>
                <Button
                  color={activeClientId === client._id ? "green" : "blue"}
                  onClick={() => handleActivateClient(client._id)}
                >
                  {activeClientId === client._id ? "Activated" : "Activate"}
                </Button>
              </div>
            ))
          ) : (
            <p className="text-center">No clients available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
