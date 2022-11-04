import React from 'react'

import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.css';
import SwiperCore, { Autoplay, Pagination } from 'swiper';

import useFetch from '../hooks/useFetch';
import Loader from './Loader';

function FeatProps() {

  const { data, loading } = useFetch(
    "/hotels?featured=true&limit=3"
  );

  SwiperCore.use([Autoplay, Pagination]);

  return (
    <div className="text-black md:w-[70vw] w-[90vw] mt-[6vh] pt-[2vh] m-auto border-t-4 border-blue-700">
      
      <div className="">

          <div>
            <h1 className="text-center md:text-left font-serif md:text-3xl text-xl pb-[2vh]">
              Popular
            </h1>
          </div>
          {loading ? (
            <div className="m-auto">
              <Loader />
            </div>
          ) : (
            <Swiper id="main"
              spaceBetween={3}
              slidesPerView={3}
              autoplay={{disableOnInteraction: true, delay: 5000}}
            >
              {data.map((item) => (
                <SwiperSlide key={item._id}>
                  <div className="">
                    <div>
                      <img className="rounded-xl m-auto"
                        src={item.photos[0]} alt={item.name}
                      />
                    </div>
                    <div className="">
                      <div className="text-left pb-3">
                        <h1 className="font-bold md:text-xl font-serif min-h-[6vh] md:min-h-0">{item.name}</h1>
                        <p className="font-serif">{item.city.toUpperCase()}</p>
                        <p className="hidden md:flex font-seriff font-bold">${item.cheapestPrice}</p>

                        {item.rating && (
                          <div className="flex flex-row">
                            <p className="font-bold text-white bg-blue-800 px-1 mr-2">What</p>
                            <p className="hidden md:flex font-serif">{item.rating}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )
        }
        </div>
    </div>
  )
}

export default FeatProps
