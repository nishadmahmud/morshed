"use client"

import { useState, useEffect } from "react"
import useStore from "../CustomHooks/useStore"



const CurrencyConverter = ({ baseBDT }) => {
  const {selectedCountry, setSelectedCountry, countries, setConvertedPrice, convertedPrice} = useStore()

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
      <div>
       
      </div>
      <div className="p-5">
        

        <div className="space-y-2">
          <label htmlFor="currency-select" className="text-sm font-medium">
           Select the country
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

      
      </div>
    </div>
  )
}

export default CurrencyConverter
