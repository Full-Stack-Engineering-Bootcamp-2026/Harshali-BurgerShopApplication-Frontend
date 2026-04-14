import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {

  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">

      <img
        src={product.image}
        className="h-40 w-full object-cover rounded-lg"
        alt={product.name} />

      <h2 className="font-semibold mt-2">{product.name}</h2>

      <p className="text-gray-500 text-sm">
        {product.category} | {product.type}
      </p>

      <p className="text-orange-600 font-bold text-lg">
        {product.price}
      </p>

    
      <button
        onClick={() => addToCart(product)}
        className="bg-yellow-500 text-white w-full py-2 rounded mt-2 hover:bg-orange-600" >
        Add
      </button>

    </div>
  );
}

