"use client";

import React, { useState, useRef } from "react";
import { ArrowLeftRight, Calendar, Plane, X } from "lucide-react";
import TravelerSelector from "./TravelerSelector";

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
    { from: "", fromCode: "", to: "", toCode: "", date: "" },
  ]);

  // Create refs for date inputs
  const primaryJourneyDateRef = useRef(null);
  const returnDateRef = useRef(null);
  const multiCityDateRefs = useRef([]);

  // Initialize refs for multi-city dates
  React.useEffect(() => {
    multiCityDateRefs.current = multiCityLocations.map(() => React.createRef());
  }, [multiCityLocations.length]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear().toString().slice(2);
    const weekday = date.toLocaleString("default", { weekday: "long" });
    return `${day} ${month}'${year} ${weekday}`;
  };

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
      { from: "", fromCode: "", to: "", toCode: "", date: "" },
    ]);
  };

  const handleDeleteLocation = (index) => {
    if (multiCityLocations.length > 1) {
      const updatedLocations = multiCityLocations.filter((_, i) => i !== index);
      setMultiCityLocations(updatedLocations);
    }
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
      } else if (type === "date") {
        updatedLocations[index].date = value;
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
    console.log("Searching with parameters:", searchParams);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Navigation Tabs */}
      <div className="bg-white rounded-t-2xl p-4">
        <div className="flex items-center gap-2 border-b-4 border-[#FDCC02] pb-2 w-fit">
          <Plane className="h-5 w-5 text-blue-900" />
          <span className="text-blue-900 font-semibold">Flight</span>
        </div>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-b-2xl p-6 space-y-6">
        {/* Trip Type Selection */}
        <div className="flex flex-wrap gap-6">
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

        {/* Main Search Grid */}
        <div className="space-y-6">
          {/* First Row - Common for all trip types */}
          <div
            className={`grid gap-4 ${
              tripType === "multiCity"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-1"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-5"
            }`}
          >
            {/* From/To Container */}
            <div className="md:col-span-2 grid grid-cols-2 gap-2 relative">
              {/* From */}
              <div className="border-2 rounded-md py-3 px-6 bg-white">
                <label className="text-xs text-gray-600 uppercase block mb-1">
                  FROM
                </label>
                <input
                  type="text"
                  value={fromLocation}
                  onChange={(e) => handleLocationChange(e.target.value, "from")}
                  className="text-blue-900 font-semibold w-full outline-none"
                />
                <div className="text-xs text-gray-500 truncate">{fromCode}</div>
              </div>

              {/* Swap Button */}
              <button
                onClick={handleSwapLocations}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full bg-white border shadow-sm z-10"
              >
                <ArrowLeftRight size={18} />
              </button>

              {/* To */}
              <div className="border-2 rounded-md py-3 px-6 bg-white">
                <label className="text-xs text-gray-600 uppercase block mb-1">
                  TO
                </label>
                <input
                  type="text"
                  value={toLocation}
                  onChange={(e) => handleLocationChange(e.target.value, "to")}
                  className="text-blue-900 font-semibold w-full outline-none"
                />
                <div className="text-xs text-gray-500 truncate">{toCode}</div>
              </div>
            </div>

            {/* Journey Date */}
            <button
              onClick={() => primaryJourneyDateRef.current?.showPicker()}
              className="border-2 rounded-md py-3 px-6 bg-white text-left relative hover:border-blue-500 transition-colors"
            >
              <label className="text-xs text-gray-600 uppercase block mb-1">
                JOURNEY DATE
              </label>
              <div className="text-blue-900 font-semibold">
                {formatDate(journeyDate)}
              </div>

              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="date"
                ref={primaryJourneyDateRef}
                value={journeyDate}
                onChange={(e) => setJourneyDate(e.target.value)}
                className="hidden"
              />
            </button>

            {/* Return Date - Only show for non-multiCity */}
            {tripType !== "multiCity" &&
              (tripType === "roundWay" ? (
                <button
                  onClick={() => returnDateRef.current?.showPicker()}
                  className="border-2 rounded-md py-3 px-6 bg-white text-left relative hover:border-blue-500 transition-colors"
                >
                  <label className="text-xs text-gray-600 uppercase block mb-1">
                    RETURN DATE
                  </label>
                  <div className="text-blue-900 font-semibold">
                    {formatDate(returnDate)}
                  </div>
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="date"
                    ref={returnDateRef}
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="hidden"
                  />
                </button>
              ) : (
                <div className="border-2 rounded-md py-3 px-6 bg-white text-left relative">
                  <label className="text-xs text-gray-600 uppercase block mb-1">
                    RETURN DATE
                  </label>
                  <p className="text-xs text-gray-500">
                    Save more on return flight
                  </p>
                </div>
              ))}

            {/* Travelers */}
            <TravelerSelector
              travelers={travelers}
              onTravelersChange={setTravelers}
            />
          </div>

          {/* Additional Multi-City Locations */}
          {tripType === "multiCity" && (
            <div className="space-y-4">
              {multiCityLocations.map((location, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4"
                >
                  <div className="grid grid-cols-2 md:col-span-2 gap-2">
                    {/* From */}
                    <div className="border-2 rounded-md py-3 px-6 bg-white">
                      <label className="text-xs text-gray-600 uppercase block mb-1">
                        FROM
                      </label>
                      <input
                        type="text"
                        value={location.from}
                        placeholder="Select a city"
                        onChange={(e) =>
                          handleLocationChange(e.target.value, "from", index)
                        }
                        className="text-blue-900 font-semibold w-full outline-none"
                      />
                      <div className="text-xs text-gray-500">
                        Click to choose an airport
                      </div>
                    </div>

                    {/* To */}
                    <div className="border-2 rounded-md py-3 px-6 bg-white">
                      <label className="text-xs text-gray-600 uppercase block mb-1">
                        TO
                      </label>
                      <input
                        type="text"
                        value={location.to}
                        placeholder="Select a city"
                        onChange={(e) =>
                          handleLocationChange(e.target.value, "to", index)
                        }
                        className="text-blue-900 font-semibold w-full outline-none"
                      />
                      <div className="text-xs text-gray-500">
                        Click to choose an airport
                      </div>
                    </div>
                  </div>

                  {/* Journey Date */}
                  <button
                    onClick={() =>
                      multiCityDateRefs.current[index]?.current?.showPicker()
                    }
                    className="border-2 rounded-md py-3 px-6 bg-white text-left relative hover:border-blue-500 transition-colors"
                  >
                    <label className="text-xs text-gray-600 uppercase block mb-1">
                      JOURNEY DATE
                    </label>
                    <div className="text-blue-900 font-semibold">
                      {formatDate(location.date)}
                    </div>
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="date"
                      ref={multiCityDateRefs.current[index]}
                      value={location.date}
                      onChange={(e) =>
                        handleLocationChange(e.target.value, "date", index)
                      }
                      className="hidden"
                    />
                  </button>

                  {/* Action Column */}
                  <div className="flex items-center border-2 rounded-md py-3 px-6 bg-white justify-center">
                    {index === multiCityLocations.length - 1 ? (
                      <button
                        onClick={handleAddMultiCity}
                        className="text-blue-900 font-semibold w-full h-full"
                      >
                        Add Another City
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDeleteLocation(index)}
                        className="p-2 hover:bg-red-50 text-red-500 rounded-full"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={handleSubmit}
            className="bg-[#FDCC02] hover:bg-[#FDCC02]/80 text-blue-900 px-8 py-3 rounded-md font-semibold transition-colors"
          >
            Search Flights
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightSearchHero;
