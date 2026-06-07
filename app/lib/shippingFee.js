import addressData from "../../public/bangladesh-data.json";

export const FEES = {
  insideDhaka: 70,
  dhakaOutskirts: 90,
  outsideDhaka: 130,
};

const DHAKA_DISTRICT = "Dhaka";
const GAZIPUR_DISTRICT = "Gazipur";
const DHAKA_DISTRICT_ID = "BD-13";

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function normalize(text) {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function matchesLocation(text, term) {
  if (!term || term.length < 2) return false;
  if (term.includes(" ")) {
    return text.includes(term);
  }
  const pattern = new RegExp(`\\b${escapeRegex(term)}\\b`, "i");
  return pattern.test(text);
}

const allCities = Object.entries(addressData.country_cities).flatMap(
  ([stateId, cities]) => {
    const districtName = addressData.country_states[stateId];
    return Object.entries(cities).map(([cityId, cityName]) => ({
      stateId,
      districtName,
      cityId,
      cityName,
      normalized: normalize(cityName),
    }));
  }
);

allCities.sort((a, b) => b.normalized.length - a.normalized.length);

const allDistricts = Object.entries(addressData.country_states)
  .map(([id, name]) => ({
    id,
    name,
    normalized: normalize(name),
  }))
  .sort((a, b) => b.normalized.length - a.normalized.length);

function resolveCityMatch(combined) {
  const matches = allCities.filter((city) =>
    matchesLocation(combined, city.normalized)
  );

  if (matches.length === 0) return null;

  const dhakaMatch = matches.find((m) => m.stateId === DHAKA_DISTRICT_ID);
  return dhakaMatch || matches[0];
}

function resolveDistrictMatch(combined) {
  for (const district of allDistricts) {
    if (matchesLocation(combined, district.normalized)) {
      return district;
    }
  }
  return null;
}

export function resolveFromText(address, address2) {
  const combined = normalize(`${address || ""} ${address2 || ""}`);
  if (!combined) {
    return { district: null, city: null, confidence: "none" };
  }

  const cityMatch = resolveCityMatch(combined);
  if (cityMatch) {
    return {
      district: cityMatch.districtName,
      city: cityMatch.cityName,
      confidence: "high",
    };
  }

  const districtMatch = resolveDistrictMatch(combined);
  if (districtMatch) {
    return {
      district: districtMatch.name,
      city: null,
      confidence: "high",
    };
  }

  return { district: null, city: null, confidence: "none" };
}

export function resolveFromSelect(selectedDistrict, selectedCity) {
  if (!selectedDistrict || typeof selectedDistrict !== "string") {
    return null;
  }

  return {
    district: selectedDistrict,
    city: selectedCity || null,
    confidence: "high",
  };
}

function isOutskirtsArea(district, city) {
  const cityNorm = normalize(city || "");

  if (cityNorm.includes("savar") || cityNorm.includes("demra")) {
    return true;
  }

  if (district === GAZIPUR_DISTRICT) {
    return true;
  }

  return false;
}

export function applyFeeRules(district, city) {
  if (!district) {
    return { fee: FEES.outsideDhaka, zoneLabel: "Outside Dhaka" };
  }

  if (isOutskirtsArea(district, city)) {
    return { fee: FEES.dhakaOutskirts, zoneLabel: "Dhaka outskirts" };
  }

  if (district === DHAKA_DISTRICT) {
    return { fee: FEES.insideDhaka, zoneLabel: "Inside Dhaka" };
  }

  return { fee: FEES.outsideDhaka, zoneLabel: "Outside Dhaka" };
}

export function calculateShippingFee({
  address,
  address2,
  selectedDistrict,
  selectedCity,
}) {
  if (selectedCity && selectedDistrict) {
    const { fee, zoneLabel } = applyFeeRules(selectedDistrict, selectedCity);
    return {
      fee,
      zoneLabel,
      district: selectedDistrict,
      city: selectedCity,
      source: "select",
      confidence: "high",
    };
  }

  const textResult = resolveFromText(address, address2);
  if (textResult.confidence === "high") {
    const { fee, zoneLabel } = applyFeeRules(
      textResult.district,
      textResult.city
    );
    return {
      fee,
      zoneLabel,
      district: textResult.district,
      city: textResult.city,
      source: "text",
      confidence: "high",
    };
  }

  if (selectedDistrict) {
    const { fee, zoneLabel } = applyFeeRules(selectedDistrict, null);
    return {
      fee,
      zoneLabel,
      district: selectedDistrict,
      city: null,
      source: "select",
      confidence: "high",
    };
  }

  return {
    fee: FEES.outsideDhaka,
    zoneLabel: "Outside Dhaka",
    district: null,
    city: null,
    source: "text",
    confidence: "none",
  };
}
