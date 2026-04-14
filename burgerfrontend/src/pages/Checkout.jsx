import { useState } from "react";
import API from "../services/api";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, clearCart } = useCart();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const placeOrder = async () => {
    try {
      if (!isValidEmail(email)) {
        setError("Invalid email format");
        return;
      }

      const items = cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      const res = await API.post("/checkout", { name, email, items });

      setResult(res.data);
      clearCart();
      setError("");
    } catch (err) {
      setError("Failed to place order");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 block mb-3 " />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (e.target.value && !isValidEmail(e.target.value)) {
            setError("Invalid email");
          } else {
            setError("");
          }
        }}
        className="border p-2 block mb-3 " />

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <button
        onClick={placeOrder}
        className="bg-green-500 text-white px-4 py-2 rounded ">
        Place Order
      </button>

      {result && (
        <div className="mt-6 p-4 bg-white rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-3">Bill Summary</h3>

          <p className="text-gray-500">
            Actual Bill: {result.actual}
          </p>

          <p className="text-green-600 font-bold">
            Optimized Bill: {result.optimized}
          </p>

          <p className="text-green-700 mb-3">
            You Saved {result.actual - result.optimized}
          </p>

          <hr className="my-3" />

          <h4 className="font-semibold mb-2">Applied Combos</h4>

          {result.appliedCombos && result.appliedCombos.length > 0 ? (
            result.appliedCombos.map((combo) => (
              <div
                key={combo.comboId}
                className="flex justify-between mb-1"
              >
                <span>
                  {combo.name} x {combo.quantity}
                </span>
                <span>
                  {combo.price * combo.quantity}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No combos applied</p>
          )}

          <hr className="my-3" />

          <h4 className="font-semibold mb-2">Products</h4>

          {result.remainingItems && result.remainingItems.length > 0 ? (
            result.remainingItems.map((item) => (
              <div
                key={item.productId}
                className="flex justify-between mb-1"
              >
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>
                  {item.price * item.quantity}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No individual items</p>
          )}
        </div>
      )}
    </div>
  );
}

