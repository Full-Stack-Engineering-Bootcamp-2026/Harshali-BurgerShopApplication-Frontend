

import React, { useState, useEffect } from "react";
import API from "../services/api";

export default function Orders() {

  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {

    try {
      const res = await API.get("/orders");
      setOrders(res.data);
     
    } catch (err) {
    
      setError("Failed to load orders");
    } 
  };

  

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>

      {orders.length === 0 ? (<p>No orders found</p>) : (
        <div >
          <table className="w-full border border-gray-200 rounded-lg ">
            
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left"> Name</th>
                <th className="p-3 text-left">  Email</th>
                <th className="p-3">  Actual Bill</th>
                <th className="p-3"> Optimized Bill </th>
                <th className="p-3"> Savings</th>
                <th className="p-3 text-left"> Combos </th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id}
                  className="border-t hover:bg-gray-50 transition" >

                  <td className="p-3">  {order.name}  </td>
                  <td className="p-3">  {order.email} </td>

                  <td className="p-3 text-center  text-gray-500">
                    {order.actualAmount}
                  </td>

                  <td className="p-3 text-center text-green-600 font-semibold">
                    {order.optimizedAmount}
                  </td>

                  <td className="p-3 text-center text-green-700 font-medium">
                    {order.actualAmount - order.optimizedAmount}
                  </td>

                  <td className="p-3">
                    {order.appliedCombos?.length > 0 ? (  order.appliedCombos.map((combo, i) => (
                        <div key={i} className="text-sm">
                           {combo.name} {combo.quantity}
                        </div>
                      ))
                    ) : (
                      <span className="text-gray-400">None</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}



