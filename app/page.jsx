import FlightSearchHero from "@/components/FlighSearchHero";
import FlightSearchForm from "@/components/FlightSearchForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen ">
      <div className="bg-[url('/bg.jpg')] bg-cover bg-center flex items-center justify-center p-10 min-h-screen">
        <FlightSearchHero />
      </div>
    </div>
  );
}
