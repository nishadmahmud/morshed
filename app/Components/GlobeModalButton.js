// components/GlobeModalButton.js
"use client";

import React, { useContext, useState } from "react";
import countries from "world-countries";
import { Globe } from "lucide-react";
import RegionModal from "./RegionModal";
import { storeContext } from "../StoreContext/store";

const GlobeModalButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedCountry, setSelectedCountry } = useContext(storeContext);

  console.log(selectedCountry);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)} className="py-2">
        <Globe />
      </button>

      <RegionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Select a Country</h2>
        <div className="h-[300px] overflow-y-auto space-y-1">
          {countries.map((country) => (
            <div
              key={country.cca2}
              className="p-2 hover:bg-gray-100 cursor-pointer rounded"
              onClick={() => {
                setSelectedCountry(country.name.common);
                setIsModalOpen(false);
              }}
            >
              {country.flag} {country.name.common}
            </div>
          ))}
        </div>
      </RegionModal>
    </div>
  );
};

export default GlobeModalButton;
