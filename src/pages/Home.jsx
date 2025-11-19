import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  const API =
    "https://restcountries.com/v3.1/all?fields=name,cca3,capital,region,population,flags";

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  const filtered = countries.filter((c) =>
    c.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">🌍 Country Explorer</h1>

      <input
        type="text"
        placeholder="Search country..."
        className="w-full p-2 border rounded-xl mb-5"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {filtered.map((country) => (
          <Link key={country.cca3} to={`/country/${country.cca3}`}>
            <div className="bg-white shadow rounded-xl p-4 hover:scale-[1.02] transition">
              <img
                src={country.flags.png}
                alt={country.name.common}
                className="w-full h-32 object-cover rounded-lg"
              />

              <h2 className="text-lg font-semibold mt-2">
                {country.name.common}
              </h2>

              <p className="text-sm text-gray-600">
                Population: {country.population?.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">
                Region: {country.region}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
