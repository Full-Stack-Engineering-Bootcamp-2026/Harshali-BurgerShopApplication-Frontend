import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {

  const { cart, increaseQty, decreaseQty, removeItem } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce(  (sum, item) => sum + Number(item.price) * item.quantity,  0 );

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="font-bold mb-3">Cart</h2>

      {cart.length === 0 ? (<p>Cart is empty</p> ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="mb-3 border-b pb-2">


              <h4>{item.name}</h4>

              <p>{Number(item.price) * item.quantity}</p>

              <div className="flex gap-2">

                <button onClick={() => decreaseQty(item.id)}> - </button>
                <span>{item.quantity}</span>

                <button onClick={() => increaseQty(item.id)}> + </button>
              </div>

              <button onClick={() => removeItem(item.id)}>
                Remove
              </button>
            </div>
          ))}

          <h3 className="mt-2 font-bold">Total: {total}</h3>

          <button onClick={() => navigate("/cart")}
            className="bg-yellow-400 w-full mt-3 p-2 rounded"   >
            View Cart
          </button>
        </>
      )}
    </div>
  );
}
