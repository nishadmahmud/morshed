"use client";

import { useEffect, useState } from "react";

const PersonalInfo = () => {
  const [email, setEmail] = useState(null);
  const [user, setUser] = useState(null);
  const [reload, setReload] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));

    if (userInfo) {
      setUser(userInfo);
      setEmail(userInfo?.email);
      setReload(false);

      // Ensure name is a valid string before splitting
      const fullName = userInfo?.name || "";
      const nameParts = fullName.split(" ");
      setFirstName(nameParts[0] || ""); // First word
      setLastName(nameParts.slice(1).join(" ") || ""); // Rest of the name
    }
  }, [reload]);

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
            value={user?.phone || "N/A"}
            disabled
            className="w-full p-2 border rounded bg-gray-100 text-black"
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email || "email"}
            disabled
            className="w-full p-2 border rounded bg-gray-100 text-black"
          />
        </div>
        <button className="mt-6 px-4 py-2 bg-[#F16724] text-white rounded hover:bg-[#c54403]">
          Update
        </button>
      </div>
    </>
  );
};

export default PersonalInfo;
