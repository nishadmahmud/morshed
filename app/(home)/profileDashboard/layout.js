"use client"

import useStore from "@/app/CustomHooks/useStore";
import { FileUser, ShoppingBag, KeyRound, CircleUser, LogOut, X, Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardLayout = ({ children }) => {
  const [email, setEmail] = useState(null);
  const [user, setUser] = useState(null);
  const [reload, setReload] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { setToken, setHasToken } = useStore();
  const route = useRouter();

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
       const nameParts = fullName?.split(" ");
       setFirstName(nameParts[0] || ""); // First word
       setLastName(nameParts.slice(1).join(" ") || ""); // Rest of the name
    }
  }, [email, reload]);

  console.log(firstName);


  const handleLogout = () => {
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setHasToken(false);
    setEmail(null);
    setUser(null); // Ensure user is set to null
    setReload(prev => !prev); // Trigger a re-render
    route.push('/')
};


  return (
    <div className="md:flex md:w-11/12 mx-auto relative lg:pt-5 md:pt-5 pt-1 pb-5">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-4 text-gray-700"
        onClick={() => setIsSidebarOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar Overlay for closing on outside click */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-gradient-to-t from-[#c03b2c] to-[#e14e04] px-6 shadow-md md:relative z-20 rounded-lg`}
      >
        <div className="flex justify-between items-center pt-5">
          <button
            className="md:hidden p-2 text-gray-100"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex items-center gap-1 text-gray-100">
          <CircleUser size={30} />
          <div>
            <h2 className="text-white text-lg font-semibold">{firstName}</h2>
            <p className="text-white text-sm">{email}</p>
          </div>
        </div>

        <nav className="mt-6 space-y-4">
          <Link
            href="/profileDashboard"
            className="text-white hover:text-gray-300 flex items-center gap-1"
          >
            <FileUser size={20} /> Personal Info
          </Link>
          <Link
            href="/profileDashboard/orders"
            className="text-white hover:text-gray-300 flex items-center gap-1"
          >
            <ShoppingBag size={20} /> My Orders
          </Link>
         
          <Link
            href="/profileDashboard/updatePassword"
            className="text-white hover:text-gray-300 flex items-center gap-1"
          >
            <KeyRound size={20} /> Change Password
          </Link>
          <div
            onClick={handleLogout}
            className="text-white hover:font-semibold transition ease-in-out flex items-center gap-1 hover:text-red-800 cursor-pointer"
          >
            <LogOut size={20} /> Logout
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:p-10 px-3 pb-10">{children}</div>
    </div>
  );
};

export default DashboardLayout;
