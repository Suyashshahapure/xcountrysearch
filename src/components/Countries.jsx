import React, { useState, useEffect } from "react";

const Tile = ({ flagUrl, name, altName }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "10px",
        padding: "10px",
        border: "1px solid black",
        borderRadius: "8px",
        flexDirection: "column",
        width: "200px",
      }}
    >
      <img src={flagUrl} alt={altName} style={{ width: "100px", height: "100px" }} />
      <h2>{name}</h2>
    </div>
  );
};

function Countries() {
  const url = "https://restcountries.com/v3.1/all";
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => console.error("Error Happening:", error));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <input
        type="text"
        placeholder="Search for  countries..."
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: "20px", width: "300px", padding: "10px" }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {filteredCountries.map((country) => (
          <Tile
            key={country.cca3}
            flagUrl={country.flags.png}
            name={country.name.common}
            altName={country.flags.svg}
          />
        ))}
      </div>
    </div>
  );
}

export default Countries;
