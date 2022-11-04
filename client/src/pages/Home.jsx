import React from 'react';

import Navbar from "../components/Navbar.jsx";
import SearchBar from "../components/SearchBar.jsx";
import FeaturedLocations from "../components/FeaturedLocations.jsx";
import BrowseTypes from "../components/BrowseTypes.jsx";
import FeatProps from "../components/FeatProps.jsx";
import Subscribe from "../components/Subscribe.jsx";

function Home() {
  return (
    <div>
      <Navbar />
      <SearchBar />
      <FeaturedLocations />
      <BrowseTypes />
      <FeatProps />
      <Subscribe />
    </div>
  )
}

export default Home
