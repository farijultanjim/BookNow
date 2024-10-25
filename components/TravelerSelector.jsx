"use client";

import React, { useState, useRef, useEffect } from "react";
import { Minus, Plus } from "lucide-react";

const TravelerSelector = ({ onTravelersChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localTravelers, setLocalTravelers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    class: "Economy",
  });

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Constants for passenger limits
  const LIMITS = {
    adults: { min: 1, max: 5 },
    children: { min: 0, max: 4 },
    infants: { min: 0, max: 4 },
  };

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCountChange = (type, increment) => {
    const newCount = localTravelers[type] + (increment ? 1 : -1);

    // Validation rules
    if (newCount < LIMITS[type].min || newCount > LIMITS[type].max) return;
    
    setLocalTravelers((prev) => ({
      ...prev,
      [type]: newCount,
    }));
  };

  const handleClassChange = (selectedClass) => {
    setLocalTravelers((prev) => ({
      ...prev,
      class: selectedClass,
    }));
  };

  const handleDone = () => {
    onTravelersChange(localTravelers);
    setIsOpen(false);
  };

  const totalTravelers =
    localTravelers.adults + localTravelers.children + localTravelers.infants;

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="border-2 rounded-md py-3 px-6 bg-white text-left w-full h-full"
      >
        <label className="text-xs text-gray-600 uppercase block mb-1">
          TRAVELER, CLASS
        </label>
        <div className="text-blue-900 font-semibold">
          {totalTravelers} {totalTravelers === 1 ? "Traveler" : "Travelers"}
        </div>
        <div className="text-xs text-gray-500">{localTravelers.class}</div>
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full right-0  mt-1 bg-white rounded-lg shadow-lg border p-3 w-60 z-50"
        >
          <div className="space-y-6">
            {/* Adults */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-xs">Adults</h3>
                <p className="text-xs text-gray-500">12 years and above</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleCountChange("adults", false)}
                  className="w-6 h-6 rounded-full border flex items-center justify-center disabled:opacity-50"
                  disabled={localTravelers.adults <= LIMITS.adults.min}
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-4 text-center text-sm">
                  {localTravelers.adults}
                </span>
                <button
                  onClick={() => handleCountChange("adults", true)}
                  className="w-6 h-6 rounded-full border flex items-center justify-center disabled:opacity-50"
                  disabled={localTravelers.adults >= LIMITS.adults.max}
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-xs">Children</h3>
                <p className="text-xs text-gray-500">2-11 years</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleCountChange("children", false)}
                  className="w-6 h-6 rounded-full border flex items-center justify-center disabled:opacity-50"
                  disabled={localTravelers.children <= LIMITS.children.min}
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-4 text-center text-sm">
                  {localTravelers.children}
                </span>
                <button
                  onClick={() => handleCountChange("children", true)}
                  className="w-6 h-6 rounded-full border flex items-center justify-center disabled:opacity-50"
                  disabled={localTravelers.children >= LIMITS.children.max}
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Infants */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-xs">Infant</h3>
                <p className="text-xs text-gray-500">Below 2 years</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleCountChange("infants", false)}
                  className="w-6 h-6 rounded-full border flex items-center justify-center disabled:opacity-50"
                  disabled={localTravelers.infants <= LIMITS.infants.min}
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-4 text-center text-sm">
                  {localTravelers.infants}
                </span>
                <button
                  onClick={() => handleCountChange("infants", true)}
                  className="w-6 h-6 rounded-full border flex items-center justify-center disabled:opacity-50"
                  disabled={localTravelers.infants >= LIMITS.infants.max}
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Class Selection */}
            <div className="space-y-2">
              <h3 className="font-medium text-xs">Class</h3>
              <div className="flex gap-4 text-xs">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="class"
                    checked={localTravelers.class === "Economy"}
                    onChange={() => handleClassChange("Economy")}
                    className="w-4 h-4"
                  />
                  <span>Economy</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="class"
                    checked={localTravelers.class === "Business"}
                    onChange={() => handleClassChange("Business")}
                    className="w-4 h-4"
                  />
                  <span>Business</span>
                </label>
              </div>
            </div>

            <button
              onClick={handleDone}
              className="w-full bg-[#FDCC02] text-blue-900 py-2 rounded-md font-bold text-xs"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelerSelector;
