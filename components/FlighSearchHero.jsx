"use client";

import React, { useState } from "react";
import { ArrowLeftRight, Plane } from "lucide-react";

const FlightSearchHero = () => {
  const [tripType, setTripType] = useState("oneWay");
  const [fromLocation, setFromLocation] = useState("Dhaka");
  const [fromCode, setFromCode] = useState(
    "DAC, Hazrat Shahjalal International Ai..."
  );
  const [toLocation, setToLocation] = useState("Cox's Bazar");
  const [toCode, setToCode] = useState("CXB, Cox's Bazar Airport");
  const [journeyDate, setJourneyDate] = useState("2024-10-28");
  const [returnDate, setReturnDate] = useState("2024-10-31");
  const [travelers, setTravelers] = useState(1);
  const [multiCityLocations, setMultiCityLocations] = useState([
    { from: "", fromCode: "", to: "", toCode: "" },
  ]);

  const handleSwapLocations = () => {
    const tempLocation = fromLocation;
    const tempCode = fromCode;
    setFromLocation(toLocation);
    setFromCode(toCode);
    setToLocation(tempLocation);
    setToCode(tempCode);
  };

  const handleAddMultiCity = () => {
    setMultiCityLocations([
      ...multiCityLocations,
      { from: "", fromCode: "", to: "", toCode: "" },
    ]);
  };

  const handleSubmit = () => {
    const searchParams = {
      tripType,
      fromLocation,
      toLocation,
      journeyDate,
      returnDate: tripType === "roundWay" ? returnDate : null,
      travelers,
      multiCityLocations: tripType === "multiCity" ? multiCityLocations : [],
    };

    // You'd typically send the searchParams to your flight API or route handler
    console.log("Searching with parameters:", searchParams);
  };

  const handleLocationChange = (value, type, index = null) => {
    if (tripType === "multiCity" && index !== null) {
      const updatedLocations = [...multiCityLocations];
      if (type === "from") {
        updatedLocations[index].from = value;
        updatedLocations[index].fromCode = `Code for ${value}`;
      } else if (type === "to") {
        updatedLocations[index].to = value;
        updatedLocations[index].toCode = `Code for ${value}`;
      }
      setMultiCityLocations(updatedLocations);
    } else {
      if (type === "from") {
        setFromLocation(value);
        setFromCode(`Code for ${value}`);
      } else if (type === "to") {
        setToLocation(value);
        setToCode(`Code for ${value}`);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        {/* Navigation Tabs */}
        <div className="bg-white rounded-t-2xl w-full max-w-7xl mx-auto p-4 flex gap-8">
          <div className="flex items-center gap-2 border-b-4 border-yellow-400 pb-2">
            <Plane className="h-5 w-5 text-blue-900" />
            <span className="text-blue-900 font-semibold">Flight</span>
          </div>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-b-2xl w-full max-w-5xl mx-auto p-6">
          {/* Trip Type Selection */}
          <div className="flex gap-6 mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="tripType"
                checked={tripType === "oneWay"}
                onChange={() => setTripType("oneWay")}
                className="w-4 h-4 text-blue-900"
              />
              <span className="text-blue-900 font-semibold">One Way</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="tripType"
                checked={tripType === "roundWay"}
                onChange={() => setTripType("roundWay")}
                className="w-4 h-4 text-blue-900"
              />
              <span className="text-blue-900 font-semibold">Round Way</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="tripType"
                checked={tripType === "multiCity"}
                onChange={() => setTripType("multiCity")}
                className="w-4 h-4 text-blue-900"
              />
              <span className="text-blue-900 font-semibold">Multi City</span>
            </label>
          </div>

          {/* Search Fields */}
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex gap-2 relative">
              {/* From */}
              <div className="border-2 rounded-md px-4 py-2">
                <label className="text-xs text-gray-600 uppercase">FROM</label>
                <input
                  type="text"
                  value={fromLocation}
                  onChange={(e) => handleLocationChange(e.target.value, "from")}
                  className="text-blue-900 font-semibold w-full border-none"
                />
                <div className="text-xs text-gray-500 w-full ">{fromCode}</div>
              </div>

              {/* Swap Icon */}
              <div className="absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-4 ">
                <button
                  onClick={handleSwapLocations}
                  className="p-2 hover:bg-gray-100 rounded-full bg-white border"
                >
                  <ArrowLeftRight size={18} />
                </button>
              </div>

              {/* To */}
              <div className="border-2 rounded-md px-4 py-2">
                <label className="text-xs text-gray-600 uppercase">FROM</label>
                <input
                  type="text"
                  value={toLocation}
                  onChange={(e) => handleLocationChange(e.target.value, "from")}
                  className="text-blue-900 font-semibold w-full border-none"
                />
                <div className="text-xs text-gray-500 w-full ">{toCode}</div>
              </div>
            </div>

            {/* Journey Date */}
            <div className="border-2 rounded-md px-4 py-2">
              <label className="text-xs text-gray-600 uppercase">
                JOURNEY DATE
              </label>
              <input
                type="date"
                value={journeyDate}
                onChange={(e) => setJourneyDate(e.target.value)}
                className="text-blue-900 font-semibold w-full "
              />
            </div>

            {/* Return Date */}

            {tripType === "roundWay" || tripType === "oneWay" ? (
              <div className="border-2 rounded-md px-4 py-2">
                <label className="text-xs text-gray-600 uppercase">
                  RETURN DATE
                </label>
                {tripType === "roundWay" ? (
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="text-blue-900 font-semibold w-full "
                  />
                ) : (
                  <p className="text-sm text-gray-500 ">
                    Save more on return flight
                  </p>
                )}
              </div>
            ) : null}
          </div>

          {/* Multi-City Inputs */}
          {tripType === "multiCity" &&
            multiCityLocations.map((location, index) => (
              <div key={index} className="flex gap-2 mt-4">
                <div className="flex gap-2 relative">
                  {/* From (For multicity) */}
                  <div className="border-2 rounded-md px-4 py-2">
                    <label className="text-xs text-gray-600 uppercase">
                      FROM
                    </label>
                    <input
                      type="text"
                      value={location.from}
                      onChange={(e) =>
                        handleLocationChange(e.target.value, "from", index)
                      }
                      className="text-blue-900 font-semibold w-full border-none"
                    />
                    <div className="text-xs text-gray-500 w-full ">
                      {fromCode}
                    </div>
                  </div>

                  {/* Swap Icon */}
                  <div className="absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-4 ">
                    <button
                      onClick={handleSwapLocations}
                      className="p-2 hover:bg-gray-100 rounded-full bg-white border"
                    >
                      <ArrowLeftRight size={18} />
                    </button>
                  </div>

                  {/* To (For multicity) */}
                  <div className="border-2 rounded-md px-4 py-2">
                    <label className="text-xs text-gray-600 uppercase">
                      FROM
                    </label>
                    <input
                      type="text"
                      value={location.to}
                      onChange={(e) =>
                        handleLocationChange(e.target.value, "to", index)
                      }
                      className="text-blue-900 font-semibold w-full border-none"
                    />
                    <div className="text-xs text-gray-500 w-full ">
                      {toCode}
                    </div>
                  </div>
                </div>
                <div className="border-2 rounded-md px-4 py-2">
                  <label className="text-xs text-gray-600 uppercase">
                    JOURNEY DATE
                  </label>
                  <input
                    type="date"
                    value={journeyDate}
                    onChange={(e) => setJourneyDate(e.target.value)}
                    className="text-blue-900 font-semibold w-full "
                  />
                </div>
              </div>
            ))}

          {/* Add Multi-City Button */}
          {tripType === "multiCity" && (
            <div className="mt-4">
              <button
                onClick={handleAddMultiCity}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Add More City
              </button>
            </div>
          )}

          {/* Travelers Input */}
          <div className="mt-6">
            <div className="flex gap-4 items-center">
              <label className="text-xs text-gray-600 uppercase">
                TRAVELERS
              </label>
              <input
                type="number"
                min="1"
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
                className="text-blue-900 font-semibold w-16 border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              onClick={handleSubmit}
              className="bg-yellow-500 text-white px-6 py-3 rounded-md font-semibold"
            >
              Search Flights
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSearchHero;
