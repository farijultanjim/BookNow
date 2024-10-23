import FlightSearchHero from "@/components/FlighSearchHero";
import FlightSearchForm from "@/components/FlightSearchForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen bg-[url('/bg.jpg')] bg-cover bg-center">
      <div className="flex items-center justify-center">
        {/* <FlightSearchForm /> */}
        <FlightSearchHero />
      </div>
    </div>
  );
}
