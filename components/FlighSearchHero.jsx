"use client";

import React, { useState } from "react";
import { Plane } from "lucide-react";

const FlightSearchHero = () => {
  const [tripType, setTripType] = useState("oneWay");
  const [fromLocation, setFromLocation] = useState("Dhaka");
  const [fromCode, setFromCode] = useState(
    "DAC, Hazrat Shahjalal International Ai..."
  );
  const [toLocation, setToLocation] = useState("Cox's Bazar");
  const [toCode, setToCode] = useState("CXB, Cox's Bazar Airport");
  const [journeyDate, setJourneyDate] = useState("28 Oct'24");
  const [returnDate, setReturnDate] = useState("31 Oct'24");
  const [travelers, setTravelers] = useState("1 Traveler");
  const [travelClass, setTravelClass] = useState("Economy");

  const handleSwapLocations = () => {
    const tempLocation = fromLocation;
    const tempCode = fromCode;
    setFromLocation(toLocation);
    setFromCode(toCode);
    setToLocation(tempLocation);
    setToCode(tempCode);
  };

  const handleSubmit = () => {
    const searchParams = {
      tripType,
      fromLocation,
      toLocation,
      journeyDate,
      returnDate: tripType === "roundWay" ? returnDate : null,
      travelers,
      travelClass,
    };

    // Here you'd typically send the searchParams to your flight API or route handler
    console.log("Searching with parameters:", searchParams);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        {/* Navigation Tabs */}
        <div className="bg-white rounded-t-2xl w-full max-w-5xl mx-auto p-4 flex gap-8">
          <div className="flex items-center gap-2 border-b-4 border-yellow-400 pb-2">
            <Plane className="h-5 w-5 text-blue-900" />
            <span className="text-blue-900 font-semibold">Flight</span>
          </div>
          {/* ... Other tabs */}
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
                className="w-4 h-4 text-gray-400"
              />
              <span className="text-gray-400">Round Way</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="tripType"
                checked={tripType === "multiCity"}
                onChange={() => setTripType("multiCity")}
                className="w-4 h-4 text-gray-400"
              />
              <span className="text-gray-400">Multi City</span>
            </label>
          </div>

          {/* Search Fields */}
          <div className="grid grid-cols-5 gap-4">
            {/* From */}
            <div className="col-span-1">
              <div className="space-y-1">
                <label className="text-xs text-gray-600 uppercase">FROM</label>
                <div className="space-y-1">
                  <div className="text-blue-900 font-semibold">
                    {fromLocation}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {fromCode}
                  </div>
                </div>
              </div>
            </div>

            {/* Swap Icon */}
            <div className="flex items-center justify-center">
              <button
                onClick={handleSwapLocations}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </button>
            </div>

            {/* To */}
            <div className="col-span-1">
              <div className="space-y-1">
                <label className="text-xs text-gray-600 uppercase">TO</label>
                <div className="space-y-1">
                  <div className="text-blue-900 font-semibold">
                    {toLocation}
                  </div>
                  <div className="text-xs text-gray-500 truncate">{toCode}</div>
                </div>
              </div>
            </div>

            {/* Journey Date */}
            <div className="col-span-1">
              <div className="space-y-1">
                <label className="text-xs text-gray-600 uppercase">
                  JOURNEY DATE
                </label>
                <div className="space-y-1">
                  <div className="text-blue-900 font-semibold">
                    {journeyDate}
                  </div>
                  <div className="text-xs text-gray-500">Monday</div>
                </div>
              </div>
            </div>

            {/* Return Date / Travelers */}
            <div className="col-span-1">
              <div className="space-y-1">
                <label className="text-xs text-gray-600 uppercase">
                  {tripType === "roundWay" ? "RETURN DATE" : "TRAVELER, CLASS"}
                </label>
                <div className="space-y-1">
                  <div className="text-blue-900 font-semibold">
                    {tripType === "roundWay" ? "Select Return Date" : travelers}
                  </div>
                  <div className="text-xs text-gray-500">
                    {tripType === "roundWay" ? "" : travelClass}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleSubmit}
              className="bg-yellow-400 text-blue-900 font-semibold px-12 py-3 rounded-lg hover:bg-yellow-500 transition duration-200"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSearchHero;
