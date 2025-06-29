"use client";

import React, { useContext, useEffect, useState } from "react";
import { Globe } from "lucide-react";
import RegionModal from "./RegionModal";
import { storeContext } from "../StoreContext/store";
import Select from "react-select";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import useStore from "../CustomHooks/useStore";

countries.registerLocale(enLocale);

const GlobeModalButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedCountry, setSelectedCountry } = useContext(storeContext);

  const {country, setCountry} = useStore()
  const [countryOptions, setCountryOptions] = useState([]);

  // Load countries
  useEffect(() => {
    const countryNames = countries.getNames("en", { select: "official" });
    const formattedCountries = Object.entries(countryNames).map(([code, name]) => ({
      value: code,
      label: name,
    }));
    setCountryOptions(formattedCountries);
  }, []);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("selectedCountry");
    if (stored) {
      try {
        setSelectedCountry(JSON.parse(stored));
      } catch (e) {
        console.error("Invalid stored country format");
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (selectedCountry) {
      localStorage.setItem("selectedCountry", JSON.stringify(selectedCountry));
      setCountry(selectedCountry)
    }
  }, [selectedCountry]);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)} className="py-2 md:text-black text-teal-700">
        <Globe />
      </button>

      <RegionModal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
        <h2 className="text-xl font-semibold mb-4">Select a Country</h2>

        <Select
          options={countryOptions}
          onChange={(option) => {
            setSelectedCountry(option);
            setIsModalOpen(false);
          }}
          value={selectedCountry}
          className="text-black"
        />
      </RegionModal>
    </div>
  );
};

export default GlobeModalButton;
