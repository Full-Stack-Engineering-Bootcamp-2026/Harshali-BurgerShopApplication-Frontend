export default function ComboCard({ combo }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">

      <img
        src={combo.image}
        className="h-40 w-full object-cover rounded-lg"/>

      <h2 className="font-semibold mt-2">{combo.name}</h2>

      <p className="text-green-600 font-bold text-lg">
        {combo.price}
      </p>

      <p className="text-sm text-gray-500">
        Try combo!
      </p>
    </div>
  );
}

