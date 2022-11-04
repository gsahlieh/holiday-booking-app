import React, { useContext } from 'react'
import { motion } from "framer-motion";
import {
  BiBed,
} from "react-icons/bi"
import {
  AiOutlineCalendar
} from "react-icons/ai"
import {
  BsPerson
} from "react-icons/bs"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from "react-date-range"
import { format } from "date-fns"

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../context/SearchContext';

function SearchBar() {

  const navigate = useNavigate()

  const {dispatch} = useContext(SearchContext)
  function handleSearch() {
    dispatch({type: "NEW_SEARCH", payload: {destination, dates, options}})
    navigate("/hotels", { state: {destination, dates, options}})
  }

  const [destination, setDestination] = useState("")
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection"
    }
  ])
  const [dateOpen, setDateOpen] = useState(false);

  const [optionsOpen, setOptionsOpen] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1
  })
  function handleOptions(name, op) {
    setOptions(prev => {
      return{
      ...prev, [name]: op === "i" ? options[name] + 1 : options[name] - 1,
    }})
  }

  return (
    <div className="h-[8vh] flex flex-col justify-end items-center -bg-[#2F2FA2] bg-[#000080]">
      <div className="md:min-w-[750px] md:w-[70vw] w-[90vw] h-full relative top-1/2 grid md:grid-cols-4 grid-cols-1 bg-white text-gray-800">

        <div className="flex flex-row border-4 md:border-r-0 border-b-0 md:border-b-4 px-[1vw] border-[#F64C72]">
          <div className="flex mr-2">
            <BiBed className="h-[30px] w-[30px] m-auto" />
          </div>
          <input className="outline-0 overflow-hidden"
            type="text" placeholder="Where are you going?"
            onChange={(e) => (
              setDestination(e.target.value.toLowerCase())
            )}
          />
        </div>

        <div className="cursor-pointer flex flex-row border-4 md:border-r-0 border-b-0 md:border-b-4 px-[1vw] border-[#F64C72]"
          onClick={() => (
            setDateOpen(!dateOpen)
          )}
        >
          <div className="flex mr-2">
            <AiOutlineCalendar className="h-[30px] w-[30px] m-auto" />
          </div>
          <div className="w-full my-auto">
            <span className="h-full">
              {`${format(dates[0].startDate, "MM/dd/yy")} to ${format(dates[0].endDate, "MM/dd/yy")}`}
            </span>
            {dateOpen && (
              <div className="shadow-2xl shadow-black z-20 absolute md:top-[100%] md:left-[25%] top-[195%] left-[8%]"
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

        <div className="cursor-pointer flex flex-row border-4 md:border-r-0 border-b-0 md:border-b-4 px-[1vw] border-[#F64C72]"
          onClick={() => (
            setOptionsOpen(!optionsOpen)
          )}
        >
          <div className="flex mr-2">
            <BsPerson className="h-[30px] w-[30px] m-auto"/>
          </div>
          <div className="w-full my-auto">
            <span className="">
              {`${options.adult} adult · ${options.children} children · ${options.room} room`}
            </span>
            {optionsOpen && (
            <div className="shadow-2xl shadow-black cursor-default flex flex-col md:w-[25%] w-[100%] bg-white text-black z-20 absolute md:top-[100%] top-[195%] left-[0%] md:left-[50%]"
              onClick={(e) => (
                e.stopPropagation()
              )}
            >
              <div className="flex flex-row justify-between p-[5%] pr-0">
                <span>Adult</span>
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

              <div className="flex flex-row justify-between p-[5%] pr-0">
                <span>Children</span>
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

              <div className="flex flex-row justify-between p-[5%] pr-0">
                <span>Room</span>
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
            )}
          </div>
        </div>


        <div className="flex border-4 text-white font-semibold text-xl border-[#F64C72] bg-blue-500">
          <motion.button className="m-auto w-full h-full"
            onClick={handleSearch}
            whileHover={{opacity: 0.7}}
          >
            Search
          </motion.button>
        </div>

      </div>
    </div>

  )
}

export default SearchBar