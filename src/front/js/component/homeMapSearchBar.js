import React, { useState } from 'react';
import '../../styles/mapSearchBar.css';

export const HomeMapSearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [beds, setBeds] = useState('');
  const [baths, setBaths] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ location, beds, baths });
  };

  return (
    <div className="map-search-bar">
      <form className="" onSubmit={handleSubmit}>
        <div className="d-flex">
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input-field"
          />
          <input
            type="number"
            placeholder="Beds"
            value={beds}
            onChange={(e) => setBeds(e.target.value)}
            className="input-field"
            min="0"
          />   
          <input
            type="number"
            placeholder="Baths"
            value={baths}
            onChange={(e) => setBaths(e.target.value)}
            className="input-field"
            min="0"
          />
        </div>
        <button type="submit" className="search-button w-100">Search</button>
      </form>
    </div>
  );
};

export default HomeMapSearchBar;