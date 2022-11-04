import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai"
import useFetch from "../hooks/useFetch"
import { SearchContext } from "../context/SearchContext.js"
import axios from 'axios'
import StripeCheckout from'react-stripe-checkout'
import stripeImg from '../assets/bookingLogo.svg'
import { AuthContext } from '../context/authContext';


function Book({setOpen, hotelId, price}) {
  const { user } = useContext(AuthContext)

  const { data } = useFetch("/hotels/room/" + hotelId)
  const [selectedRooms, setSelectedRooms] = useState([])
  const { dates } = useContext(SearchContext)

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some(date => 
      allDates.includes(new Date(date).getTime())
    )
    return !isFound
  }

  const handleSelect = (e) => {
    const checked = e.target.checked
    const value = e.target.value
    setSelectedRooms(checked
      ? [...selectedRooms, value] 
      : selectedRooms.filter((item) => item !== value)
    )
  }

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)

    const date = new Date(start.getTime())
    let list = []
    while (date <= end) {
      list.push(new Date(date).getTime())
      date.setDate(date.getDate()+1)
    }
    return list
  }
  const allDates = getDatesInRange(dates[0]?.startDate, dates[0]?.endDate)

  const navigate = useNavigate()

  const handleClick = async () => {
    try{
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`http://localhost:8800/api/rooms/availability/${roomId}`, {
            dates: allDates,
          });
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    }catch(err){
      console.log("Error on click");
    }
  }

  // Stripe stuff
  const KEY = 'pk_test_51LvfOMGUYVibWiwZnH9RACuSUGfHH7ClJCozIhRwwEnZJGVBXsuer3LhkScqd7mvsfZXsIaBtC1YpGElq4HYJX0R00gWYBlhhf'
  const [stripeToken, setStripeToken] = useState(null);
  const onToken = (token) => {
      setStripeToken(token)
  }
  useEffect(() => {
    const makeRequest = async () => {
        try{
            const res = await axios.post("/checkout/payment", {
                tokenId: stripeToken.id,
                amount: price * 100,
            },
            {
              headers: {token: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjRmYzEwM2QxZGEwMDZmN2FjYzcxNyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2Njc1NjU2NTl9.VNTSeoWGjh7y5PTnuyt-W3_WfqPWeDyRHgJIlmE0OV0`}
            })
        } catch(err){}
    }
    stripeToken &&  
    makeRequest()

}, [stripeToken, price])



  return (
    <div className="w-[100vw] h-[100vh] bg-black/[.2] fixed top-0 left-0 flex">
      <div className="flex flex-col m-auto bg-white max-h-[60%] w-[60%] overflow-auto relative">
        <AiOutlineCloseCircle
          className="absolute top-0 md:top-4 right-0 w-[10%] h-[10%] m-auto cursor-pointer color-gray-800"
          onClick={() => setOpen(false)}
        />
        <span className="font-serif md:text-2xl text-xl m-[2%] border-b-2 border-sky-400 w-fit">
          Select your rooms:
        </span>
        <div className="overflow-auto">
          {data.map((item) => (
            <div key={item?._id} className="flex flex-row whitespace-nowrap justify-between mx-[6%] my-[4%] border-2 border-gray-300 p-[1%]">
              <div className="w-fit">
                <div className="font-serif font-bold">{item?.title}</div>
                <div className="font-serif">Max people: <b>{item?.maxPeople}</b></div>
                <div className="font-serif font-bold">${item?.price}</div>
              </div>
              <div className="w-[90%] flex">
                <div className="flex flex-row ml-auto my-auto">
                  {item?.roomNumbers?.map((roomNumber) => (
                    <div key={roomNumber._id} className="flex flex-col m-2">
                      <label className="font-serif">{roomNumber?.number}</label>
                      <input type="checkbox" value={roomNumber?._id} onChange={handleSelect}
                        disabled={!isAvailable(roomNumber)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <StripeCheckout className='w-1/2 m-auto'
          name="GS Booking"
          image={stripeImg}
          billingAddress
          shippingAddress
          description={`Your cart total is $${price}`}
          amount={price * 100}
          token={onToken}
          stripeKey={KEY}>
            <button className="w-full h-full md:text-2xl text-white hover:opacity-80 duration-500 text-xl bg-sky-500 rounded font-serif px-[10%] py-[2%] cursor-pointer mb-[4%]"
              onClick={handleClick}
            >Book Now
            </button>
        </StripeCheckout>
      </div>
    </div>
  )
}

export default Book