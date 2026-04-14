
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cart, increaseQty, decreaseQty, removeItem } = useCart();

  if (cart.length === 0) {
    return <h2 className="p-6 text-lg">Cart is empty</h2>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Cart</h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Item</th>
              <th className="p-3 text-center">Quantity</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {cart.map((item) => (
              <tr key={item.id} className="border-t text-center">

                <td className="p-3 text-left">{item.name}</td>

                <td className="p-3">
                  <div className="flex justify-center items-center gap-2">
                    <button onClick={() => decreaseQty(item.id)}
                      className="px-2 py-1 bg-gray-200 rounded"  >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() => increaseQty(item.id)}
                      className="px-2 py-1 bg-gray-200 rounded"  > +
                    </button>
                  </div>
                </td>

                <td className="p-3">
                  <button onClick={() => removeItem(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                    Remove
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      <Link to="/checkout">
        <button className="bg-yellow-400 hover:bg-orange-600 text-white px-5 py-2 mt-6 rounded">
          Checkout
        </button>
      </Link>
    </div>
  );
}

