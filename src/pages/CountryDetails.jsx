import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CountryDetails() {
  const { code } = useParams();
  const [data, setData] = useState(null);

  const API = `https://restcountries.com/v3.1/alpha/${code}?fields=name,capital,region,subregion,population,languages,flags,maps`;

  useEffect(() => {
    async function loadCountry() {
      try {
        const res = await fetch(API);
        if (!res.ok) throw new Error("API error");

        const json = await res.json();
        const country = Array.isArray(json) ? json[0] : json;

        setData(country);
      } catch (err) {
        console.error("Failed to load:", err);
      }
    }
    loadCountry();
  }, [code]);

  if (!data) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Link to="/" className="text-blue-600 underline">← Back</Link>

      <h1 className="text-3xl font-bold mt-4">{data.name.common}</h1>

      <img
        src={data.flags.png}
        alt={data.name.common}
        className="w-64 rounded my-4"
      />

      <p><strong>Capital:</strong> {data.capital?.[0]}</p>
      <p><strong>Region:</strong> {data.region}</p>
      <p><strong>Subregion:</strong> {data.subregion}</p>
      <p><strong>Population:</strong> {data.population.toLocaleString()}</p>
      <p><strong>Languages:</strong> {Object.values(data.languages).join(", ")}</p>

      <a
        href={data.maps.googleMaps}
        target="_blank"
        className="text-blue-600 underline block mt-4"
      >
        🌍 View on Google Maps
      </a>
    </div>
  );
}
