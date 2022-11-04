import Navbar from "../components/Navbar";
import Subscribe from "../components/Subscribe";
import SearchBar from "../components/SearchBar";
import SearchItem from "../components/SearchItem";

import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";


function List() {
  const location = useLocation();
  const [destination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [dateOpen, setDateOpen] = useState(false);
  const [options, setOptions] = useState(location.state.options);

  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, reFetch } = useFetch(
    `/hotels?city=${destination}&min=${min || 0}&max=${max || 9999}`)

  const handleClick = () => {
    reFetch()
  }

  function handleOptions(name, op) {
    setOptions(prev => {
      return{
      ...prev, [name]: op === "i" ? options[name] + 1 : options[name] - 1,
    }})
  }

  return (
    <div>
      <Navbar />
      {/* <Header /> */}
      <div className="md:hidden">
        <SearchBar />
      </div>

      <div className="flex flex-row justify-between md:w-[70vw] w-[90vw] m-auto mt-[2%]">
        <div className="sticky top-2 hidden md:flex flex-col h-fit w-[25%] p-[1%] mr-[1vw] min-w-fit shadow-md shadow-black rounded-xl bg-yellow-400">
          <div>
            <h1 className="text-2xl font-serif">Search</h1>
          </div>
          <div className="pt-[8%]">
            <p className="font-serif">Destination</p>
            <input className="font-serif w-full py-[3%] px-[1%] rounded" 
              type="text" placeholder={destination} />
          </div>
          <div className="pt-[8%]">
            <p className="font-serif">Check-in Date</p>
            <div className="w-full bg-white py-[3%] rounded">
              <span className="h-full cursor-pointer select-none"
                onClick={() => (
                  setDateOpen(!dateOpen)
                )}
              >
                {`${format(dates[0].startDate, "MM/dd/yy")} to ${format(dates[0].endDate, "MM/dd/yy")}`}
              </span>
              {dateOpen && (
                <div className="shadow-2xl shadow-black z-20 absolute"
                  onClick={(e) => (
                    e.stopPropagation()
                  )}
                >
                  <DateRange
                    className=""
                    editableDateInputs={true}
                    onChange={item => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                  />
                </div>
              )}
            </div>
          </div>
          <div>

            <div className="w-full cursor-default flex flex-col bg-yellow-400 text-black pt-[8%]">
                <h1 className="font-serif">Options</h1>
                
                <div className="flex flex-row justify-between pl-[10%] mt-[2%]">
                  <span className="text-gray-500 font-serif">Min price</span>
                  <div className="w-[40%]">
                    <input placeholder={min} type="number" 
                      className="w-[86%] p-[1%] rounded"
                      onChange={(e) => setMin(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-row justify-between pl-[10%] mt-[2%]">
                  <span className="text-gray-500 font-serif">Max price</span>
                  <div className="w-[40%]">
                    <input placeholder={max} type="number" 
                      className="w-[86%] p-[1%] rounded"
                      onChange={(e) => setMax(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-row justify-between pl-[10%] mt-[2%]">
                  <span className="text-gray-500 font-serif">Adult</span>
                  <div className="w-[40%]">
                    <button className="border-2 border-blue-600 w-[30%]"
                      disabled={options.adult <= 1}
                      onClick={() => (
                        handleOptions("adult", "d")
                      )}
                    >-</button>
                    <span className="px-[8%]">{`${options.adult}`}</span>
                    <button className="border-2 border-blue-600 w-[30%]"
                      onClick={() => (
                        handleOptions("adult", "i")
                      )}
                    >+</button>
                  </div>
                </div>

                <div className="flex flex-row justify-between pl-[10%] mt-[2%]">
                  <span className="text-gray-500 font-serif">Children</span>
                  <div className="w-[40%]">
                    <button className="border-2 border-blue-600 w-[30%]"
                      disabled={options.children <= 0}
                      onClick={() => (
                        handleOptions("children", "d")
                      )}
                    >-</button>
                    <span className="px-[8%]">{`${options.children}`}</span>
                    <button className="border-2 border-blue-600 w-[30%]"
                      onClick={() => (
                        handleOptions("children", "i")
                      )}
                    >+</button>
                  </div>
                </div>

                <div className="flex flex-row justify-between pl-[10%] mt-[2%]">
                  <span className="text-gray-500 font-serif">Room</span>
                  <div className="w-[40%]">
                    <button className="border-2 border-blue-600 w-[30%]"
                      disabled={options.room <= 1}
                      onClick={() => (
                        handleOptions("room", "d")
                      )}
                    >-</button>
                    <span className="px-[8%]">{`${options.room}`}</span>
                    <button className="border-2 border-blue-600 w-[30%]"
                      onClick={() => (
                        handleOptions("room", "i")
                      )}
                    >+</button>
                  </div>
                </div>
              </div>

              <div className="flex mt-[8%] w-[100%]">
                <button className="m-auto w-[100%] py-[4%] bg-blue-600 rounded text-white"
                  onClick={handleClick}
                >
                  Search 
                </button>
              </div>
            </div>
          </div>

        <div className="md:flex-1 m-auto pt-[110px] md:pt-0">
          {loading ? (
            <div className="m-auto">
              <Loader />
            </div>
          ) :
          <div>
            {data?.map((item) => (
              <SearchItem item={item} key={item._id} />
            ))}
          </div>
          }     
        </div>

      </div>
      <div className="">
        <Subscribe />
      </div>
    </div>
  );
};

export default List