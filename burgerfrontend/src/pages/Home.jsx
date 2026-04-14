import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import ComboCard from "../components/ComboCard";
import Cart from "../components/Cart";

export default function Home() {
  const [products, setProducts] = useState([]);

  const [combos, setCombos] = useState([]);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");

  const [type, setType] = useState("");

  const fetchProducts = async () => {
    const params = {};
    if (search) {
      params.search = search;
    }
    if (category) {
      params.category = category;
    }
    if (type) {
      params.type = type;
    }

    const res = await API.get("/products", {
      params: params,
    });

    setProducts(res.data);
  };

  const fetchCombos = async () => {
    const params = {};
    if (search) {
      params.search = search;
    }
    if (category) {
      params.category = category;
    }
    if (type) {
      params.type = type;
    }

    const res = await API.get("/combos", {
      params: params,
    });

    setCombos(res.data);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchProducts();
      fetchCombos();
    }, 800);
    return () => clearTimeout(delay);
  }, [search, category, type]);

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-3/4">
          <input
            placeholder="Search for items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 w-full mb-4 rounded-lg"
          />

          <div className="flex justify-between mb-6">
            <div className="flex gap-2">
              <button onClick={() => setType("VEG")}
                className="px-4 py-1 rounded-full bg-gray-200" >
                Veg
              </button>

              <button onClick={() => setType("NONVEG")}
                className="px-4 py-1 rounded-full bg-gray-200" >
                Non-Veg
              </button>
            </div>

            <div className="flex gap-2 flex-wrap justify-end">
              <button  onClick={() => {setCategory("");
                                         setType("");
              }}
                className="px-4 py-1 rounded-full bg-gray-200"  >
                All
              </button>

             <button onClick={() => setCategory("MEAL")}
                className="px-4 py-1 rounded-full bg-gray-200"  >
                Meals
              </button>

              <button onClick={() => setCategory("FRIES")}
                className="px-4 py-1 rounded-full bg-gray-200" >
                Fries
              </button>

              <button  onClick={() => setCategory("DRINK")}
                className="px-4 py-1 rounded-full bg-gray-200"  >
                Drinks
              </button>

              <button onClick={() => setCategory("SIDES")}
                className="px-4 py-1 rounded-full bg-gray-200" >
                Sides
              </button>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-3">Products</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
            {products.length === 0 ? (
              <p>No products found</p>
            ) : ( products.map((p) => < ProductCard key={p.id} product={p} />)
            )}
          </div>

          <h2 className="text-2xl font-semibold mb-3">Combos</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {combos.length === 0 ? (
              <p>No combos found</p>
            ) : (
              combos.map((c) => < ComboCard key={c.id} combo={c} />)
            )}
          </div>
        </div>

        <div className="w-full lg:w-1/4">
          <Cart />
        </div>
      </div>
    </div>
  );
}
