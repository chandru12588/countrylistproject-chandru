import React from "react";
import { Link } from "react-router-dom";

export default function CountryCard({ country }) {
  if (!country) return null;

  const name = country.name?.common || "Unknown Country";
  const flag = country.flags?.svg || country.flags?.png || "";
  const population = country.population || 0;
  const region = country.region || "Unknown";

  return (
    <Link to={`/country/${country.cca3 || name}`}>
      <div className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition">
        <img
          src={flag}
          alt="flag"
          className="h-32 w-full object-cover"
        />

        <div className="p-3">
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="text-sm text-gray-600">
            Population: {population.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">Region: {region}</p>
        </div>
      </div>
    </Link>
  );
}
