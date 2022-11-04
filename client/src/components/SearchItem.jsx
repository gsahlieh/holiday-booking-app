import React from "react";
import { Link } from "react-router-dom"

const SearchItem = ({item}) => {
  return (
    <div className="border-2 border-gray-300 flex justify-between p-[2%]">
      <img
        src={item.photos[0]}
        alt={item.name}
        className="w-[35%] max-w-[220px] m-auto pr-[2%] rounded"
      />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}m from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siFeatures hidden md:flex">
          <b>{item.desc}</b>
        </span>
        <span className="siCancelOp">Free cancellation </span>
      </div>
      <div className="siDetails">
        {item.rating &&
          <div className="siRating">
            <span className="hidden md:flex">Excellent</span>
            <button className="ml-[65%] md:ml-0">{item.rating}</button>
          </div>
        }
        <div className="siDetailTexts">
          <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
            <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;