"use client"

import { useState, useEffect } from "react"

const countries = [
  { label: "United States", value: "USD", symbol: "$" },
  { label: "United Kingdom", value: "GBP", symbol: "£" },
  { label: "India", value: "INR", symbol: "₹" },
  { label: "Europe", value: "EUR", symbol: "€" },
  { label: "Bangladesh", value: "BDT", symbol: "৳" },
  { label: "Japan", value: "JPY", symbol: "¥" },
  { label: "Canada", value: "CAD", symbol: "C$" },
  { label: "Australia", value: "AUD", symbol: "A$" },
]

const CurrencyConverter = ({ baseBDT = 500 }) => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0])
  const [convertedPrice, setConvertedPrice] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [exchangeRate, setExchangeRate] = useState(null)

  const convertCurrency = async (targetCurrency) => {
    if (targetCurrency === "BDT") {
      setConvertedPrice(baseBDT)
      setExchangeRate(1)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/BDT`)

      if (!response.ok) {
        throw new Error("Failed to fetch exchange rates")
      }

      const data = await response.json()

      if (data.rates && data.rates[targetCurrency]) {
        const rate = data.rates[targetCurrency]
        const converted = baseBDT * rate
        setConvertedPrice(Number(converted.toFixed(2)))
        setExchangeRate(rate)
      } else {
        throw new Error(`Exchange rate not found for ${targetCurrency}`)
      }
    } catch (err) {
      console.error("Conversion error:", err)
      setError("Failed to convert currency. Please try again.")
      setConvertedPrice(null)
      setExchangeRate(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    convertCurrency(selectedCountry.value)
  }, [selectedCountry, baseBDT])

  const handleCountryChange = (e) => {
    const value = e.target.value
    const country = countries.find((c) => c.value === value)
    if (country) {
      setSelectedCountry(country)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white text-black rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="p-5 border-b border-gray-200">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
            <polyline points="17 6 23 6 23 12"></polyline>
          </svg>
          Currency Converter
        </h2>
      </div>
      <div className="p-5 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Base Amount</label>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
              BDT ৳{baseBDT}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="currency-select" className="text-sm font-medium">
            Convert to
          </label>
          <select
            id="currency-select"
            value={selectedCountry.value}
            onChange={handleCountryChange}
            className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {countries.map((country) => (
              <option key={country.value} value={country.value}>
                {country.symbol} {country.label} ({country.value})
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Converted Amount</label>
          <div className="p-4 bg-gray-50 rounded-lg">
            {loading ? (
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span className="text-sm text-gray-500">Converting...</span>
              </div>
            ) : error ? (
              <div className="text-sm text-red-500">{error}</div>
            ) : (
              <div className="space-y-1">
                <div className="text-2xl font-bold">
                  {selectedCountry.symbol}
                  {convertedPrice?.toLocaleString() ?? "N/A"}
                </div>
                {exchangeRate && (
                  <div className="text-xs text-gray-500">
                    1 BDT = {exchangeRate.toFixed(6)} {selectedCountry.value}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="text-xs text-gray-500 text-center">
          Exchange rates are updated regularly and may vary from actual market rates.
        </div>
      </div>
    </div>
  )
}

export default CurrencyConverter
