import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";


export default function Navbar() {
  const { cart } = useCart();


  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);


  return (
    <div className="flex justify-between px-6 py-4 bg-white shadow items-center">


      <Link to="/" className="text-xl font-bold text-orange-500">
        Combos&Calories
      </Link>


      <div className="flex gap-6 items-center">
        <Link to="/orders" className="font-semibold text-gray-700 hover:text-black">
          Orders History
        </Link>


        <Link to="/cart" className="font-semibold text-gray-700 hover:text-black">
          Cart ({totalItems})
        </Link>
      </div>


    </div>
  );
}


