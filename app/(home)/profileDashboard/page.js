"use client"

import { useEffect, useState } from "react"

const PersonalInfo = () => {
  const [email, setEmail] = useState(null);
  const [user, setUser] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));

    if (userInfo) {
      setUser(userInfo);
      setEmail(userInfo?.email);
      setReload(false);
    }
  }, [reload]); // Removed `email` from dependencies to avoid unnecessary re-renders

  console.log(user);

  // Ensure user is not null before accessing its properties
  const nameParts = user?.name?.trim().split(" ") || [];
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  return (
    <>
      <h2 className="text-xl font-bold mb-4 lg:mb-6 text-[#F16724]">Personal Info</h2>
      <div className="bg-white p-6 shadow-md rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              value={firstName}
              disabled
              className="w-full p-2 border rounded bg-gray-100 text-black"
            />
          </div>
          <div>
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              value={lastName}
              disabled
              className="w-full p-2 border rounded bg-gray-100 text-black"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-gray-700">Mobile Number</label>
          <input
            type="text"
            value={user?.mobile_number || ""}
            disabled
            className="w-full p-2 border rounded bg-gray-100 text-black"
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email || ""}
            disabled
            className="w-full p-2 border rounded bg-gray-100 text-black"
          />
        </div>
        <button className="mt-6 px-4 py-2 bg-[#F16724] text-white rounded hover:bg-[#c8561c]">
          Update
        </button>
      </div>
    </>
  );
};

export default PersonalInfo;
