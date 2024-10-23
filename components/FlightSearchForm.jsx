// components/FlightSearchForm.js
"use client";
import { useState } from "react";

const FlightSearchForm = () => {
  const [tripType, setTripType] = useState("one-way");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);

 const handleSubmit = async (e) => {
   e.preventDefault();

   const response = await fetch("/api/flights", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({
       tripType,
       fromLocation,
       toLocation,
       departureDate,
       returnDate,
       passengers,
     }),
   });

   const flightData = await response.json();
   console.log(flightData);
 };


  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Trip Type Selection */}
        <div className="flex space-x-4">
          <button
            type="button"
            className={`py-2 px-4 rounded ${
              tripType === "one-way"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setTripType("one-way")}
          >
            One-way
          </button>
          <button
            type="button"
            className={`py-2 px-4 rounded ${
              tripType === "round-trip"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setTripType("round-trip")}
          >
            Round-trip
          </button>
        </div>

        {/* From Location */}
        <div>
          <label htmlFor="fromLocation" className="block text-gray-700">
            From
          </label>
          <input
            type="text"
            id="fromLocation"
            value={fromLocation}
            onChange={(e) => setFromLocation(e.target.value)}
            placeholder="Enter city or airport"
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* To Location */}
        <div>
          <label htmlFor="toLocation" className="block text-gray-700">
            To
          </label>
          <input
            type="text"
            id="toLocation"
            value={toLocation}
            onChange={(e) => setToLocation(e.target.value)}
            placeholder="Enter city or airport"
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Departure Date */}
        <div>
          <label htmlFor="departureDate" className="block text-gray-700">
            Departure Date
          </label>
          <input
            type="date"
            id="departureDate"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Return Date (for round trip) */}
        {tripType === "round-trip" && (
          <div>
            <label htmlFor="returnDate" className="block text-gray-700">
              Return Date
            </label>
            <input
              type="date"
              id="returnDate"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
        )}

        {/* Number of Passengers */}
        <div>
          <label htmlFor="passengers" className="block text-gray-700">
            Passengers
          </label>
          <input
            type="number"
            id="passengers"
            value={passengers}
            min="1"
            max="9"
            onChange={(e) => setPassengers(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Search Flights
        </button>
      </form>
    </div>
  );
};

export default FlightSearchForm;
