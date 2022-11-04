import Navbar from "../components/Navbar";
import Subscribe from "../components/Subscribe";
import Login from "../components/Login";

import { useState } from "react";
import { GrLocation } from "react-icons/gr"
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs"
import { AiOutlineCloseCircle } from "react-icons/ai"
import useFetch from "../hooks/useFetch.js"
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import { AuthContext } from "../context/authContext";
import Book from "../components/Book";
import Loader from "../components/Loader";

const Hotel = () => {
  const location = useLocation()
  const id = location.pathname.split("/")[2]

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const [openBook, setOpenBook] = useState(false)

  const { data, loading } = useFetch(`/hotels/find/${id}`)

  const { dates, options } = useContext(SearchContext)
  const { user } = useContext(AuthContext)

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 34;
  function dayDiff(date1, date2) {
    const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDiff(dates[0]?.endDate, dates[0]?.startDate)

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? data?.photos.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === data?.photos.length - 1 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };

  const [openLogin, setOpenLogin] = useState(false);
  const handleClick = () => {
    if (user) {
      setOpenBook(true)
    }else{
      setOpenLogin(true)
    }
  }

  return (
    <div>
      <Navbar />
      {open && (
        <div className="hidden md:flex fixed top-0 h-screen w-[99vw] z-10 bg-[rgba(0,0,0,0.2)]">

          <AiOutlineCloseCircle
            className="absolute top-[10px] right-[10px] w-[50px] h-[50px] cursor-pointer color-gray-800"
            onClick={() => setOpen(false)}
          />
          <BsFillArrowLeftCircleFill
            className="m-auto w-[50px] h-[50px] cursor-pointer"
            onClick={() => handleMove("l")}
          />
          <div className="w-[100%] h-[100%] flex justify-center items-center select-none">
            <img src={data?.photos[slideNumber]} alt="slider" className="w-[80%] md:h-[80vh] h-fit" />
          </div>
          <BsFillArrowRightCircleFill
            className="m-auto w-[50px] h-[50px] cursor-pointer"
            onClick={() => handleMove("r")}
          />
        </div>
      )}
      {loading ? (
        <div className="m-auto">
          <Loader />
        </div>
      ) : <div className="flex flex-col mt-[2%] w-[90vw] md:w-[70vw] m-auto">
        <div className="w-[100%] flex flex-col">
          <button className="whitespace-nowrap hover:opacity-80 duration-500 min-w-fit ml-auto absolute top-30 md:right-[14.7%] right-[5%] w-[20%] bg-blue-500 text-white font-serif text-xl p-[1%] rounded"
            onClick={handleClick}
          >
            Book Now!
          </button>
          <h1 className="md:text-4xl text-2xl font-serif">{data?.name}</h1>
          <div className="flex flex-row mt-[1%]">
            <GrLocation className="my-auto"/>
            <span className="font-serif text-gray-600">{data?.address}</span>
          </div>
          <span className="mt-[0.3%] font-serif text-blue-600 md:text-xl">
            Excellent location – {data?.distance}m from center
          </span>
          <span className="text-green-600 font-serif mb-[2%]">
            Book a stay over ${data?.cheapestPrice} at this property and get a free airport taxi
          </span>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
            {data?.photos?.map((photo, i) => (
              <div className="" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo}
                  alt=""
                  className=""
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col mt-[2vh] border-t-2 border-[#000080]">
            <div className="m-auto text-center">
              <h1 className="md:text-4xl text-2xl mt-[4%] font-serif">{data?.title}</h1>
              <p className="font-serif mt-[1%]">
                {data?.desc}
              </p>
            </div>
            <div className="mt-[2vh] m-auto w-full h-fit bg-blue-100 p-[2%] text-center">
              <h1 className="whitespace-nowrap text-xl font-serif mb-[3%]">Perfect for a {days}-night stay!</h1>
              <h2 className="text-xl md:text-2xl font-serif my-[3%]">
                <b>${days * data?.cheapestPrice * options?.room}</b> ({days} nights)
              </h2>
              <button className="w-[70%] bg-blue-600 hover:opacity-80 duration-700 text-white rounded m-auto p-[2%] font-serif text-xl"
                onClick={handleClick}
              >
                Book Now!
              </button>
            </div>
          </div>
        </div>

      </div>}

      <div className="">
        <Subscribe />
      </div>
      {openBook && (
        <Book setOpen={setOpenBook} hotelId={id} price={days * data?.cheapestPrice * options?.room} />
      )}
      {openLogin && (
        <Login />
      )}
    </div>
  );
};

export default Hotel;
