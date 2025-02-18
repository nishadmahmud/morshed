import { FaMapMarkerAlt, FaPhone, FaClock, FaStore } from "react-icons/fa";

const stores = [
  {
    name: "Jamuna Future Park",
    address: "Basement 2, Shop 26",
    phone: "09678148148",
    hours: "11AM - 8PM (Wed-Mon)",
    closed: "Tuesday Closed",
  },
  {
    name: "Bashundhara City Shopping Complex",
    address: "Level 6, Block D, Shop 72-73",
    phone: "09678148148",
    hours: "11AM - 8PM (Wed-Mon)",
    closed: "Tuesday Closed",
  },
  {
    name: "Bashundhara City Shopping Complex",
    address: "Level 6, Block D, Shop 72-73",
    phone: "09678148148",
    hours: "11AM - 8PM (Wed-Mon)",
    closed: "Tuesday Closed",
  },
];

export default function Page() {
  return (
    <div className="mt-16 lg:pt-36">

        <div className="w-10/12 mb-4 mx-auto text-black">
        <h1 className="text-4xl font-semibold ">Find Our Stores</h1>
        <p>Visit our outlets today!</p>
        </div>

        <div className="flex flex-wrap justify-around gap-6 p-4 w-10/12 mx-auto">
      {stores.map((store, index) => (
        <div
          key={index}
          className="w-96 bg-white p-6 shadow-lg rounded-2xl border border-gray-200"
        >
          <h2 className="text-xl font-semibold text-orange-600 flex items-center gap-2">
            <FaStore /> {store.name}
          </h2>
          <p className="text-gray-600 flex items-center gap-2 mt-2">
            <FaMapMarkerAlt className="text-orange-500" /> {store.address}
          </p>
          <p className="text-gray-600 flex items-center gap-2 mt-2">
            <FaPhone className="text-orange-500" /> {store.phone}
          </p>
          <p className="text-gray-600 flex items-center gap-2 mt-2">
            <FaClock className="text-orange-500" /> {store.hours}
          </p>
          <hr className="my-4" />
          <p className="text-gray-500">{store.closed}</p>
          <div className="mt-4 flex gap-2">
            <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-orange-600">
              <FaMapMarkerAlt /> Show Map
            </button>
            <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-orange-600">
              <FaStore /> Show Details
            </button>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}
