"use client";

import { ChevronRight } from "lucide-react";
import Select, { components } from "react-select";
import { useState } from "react";
import addressData from "../../public/bangladesh-data.json";

/* eslint-disable */

export default function AddressSelect({
  selectedDistrict,
  setSelectedDistrict,
  selectedCity,
  setSelectedCity,
}) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [expandedState, setExpandedState] = useState(null);

  // Build options list
  const options = Object.entries(addressData.country_states).flatMap(
    ([stateId, stateName]) => {
      const stateOption = {
        value: stateId,
        label: stateName,
        type: "state",
        stateId,
        stateName,
      };

      const cities =
        Object.entries(addressData.country_cities[stateId] || {}).map(
          ([cityId, cityName]) => ({
            value: `${stateId}-${cityId}`,
            label: `${stateName} → ${cityName}`,
            type: "city",
            stateId,
            cityId,
            stateName,
            cityName,
          })
        );

      return [stateOption, ...cities];
    }
  );

  // Custom option renderer
  const Option = (props) => (
    <components.Option {...props}>
      {props.data.type === "state" ? (
        <div className="flex w-full items-center justify-between">
          <span>{props.data.label}</span>
          <ChevronRight size={16} />
        </div>
      ) : (
        <span>{props.data.label}</span>
      )}
    </components.Option>
  );

  // Handle selection
  const handleChange = (selectedOptions) => {
    const last = selectedOptions?.[selectedOptions.length - 1];

    if (!last) {
      setSelectedDistrict(null);
      setSelectedCity(null);
      setExpandedState(null);
      return;
    }

    // When district is clicked — expand cities
    if (last.type === "state") {
      setSelectedDistrict(last.stateName);
      setSelectedCity(null);
      setExpandedState(last.stateId === expandedState ? null : last.stateId);
      setMenuIsOpen(true);
    }

    // When city is clicked
    if (last.type === "city") {
      setSelectedDistrict(last.stateName);
      setSelectedCity(last.cityName);
      setExpandedState(null);
      setMenuIsOpen(false);
    }
  };

  // Filter: show states OR the expanded state's cities
  const filterOption = (option, input) => {
    const data = option.data;

    if (input) return option.label.toLowerCase().includes(input.toLowerCase());

    if (expandedState) {
      if (data.type === "state") return data.stateId === expandedState;
      if (data.type === "city") return data.stateId === expandedState;
      return false;
    }

    return data.type === "state"; // default view: only states
  };

  // Format controlled value for Select
  const getValue = () => {
    if (selectedDistrict && selectedCity) {
      return [
        {
          value: `${selectedDistrict}-${selectedCity}`,
          label: `${selectedDistrict} → ${selectedCity}`,
          type: "combined",
        },
      ];
    }

    if (selectedDistrict) {
      return [
        {
          value: selectedDistrict,
          label: selectedDistrict,
          type: "state",
        },
      ];
    }

    return [];
  };

  return (
    <div className="cursor-pointer z-[99999]">
      <label className="mb-2 block text-sm font-medium text-gray-700">
        Select Address *
      </label>

      <Select
        className="text-black"
        options={options}
        components={{ Option }}
        value={getValue()}
        onChange={handleChange}
        isMulti
        isClearable
        menuIsOpen={menuIsOpen}
        onMenuOpen={() => setMenuIsOpen(true)}
        onMenuClose={() => setMenuIsOpen(false)}
        closeMenuOnSelect={false}
        placeholder={
          selectedDistrict
            ? selectedCity
              ? `${selectedDistrict} → ${selectedCity}`
              : `${selectedDistrict} → Select City`
            : "Select District → City"
        }
        filterOption={filterOption}
      />
    </div>
  );
}
