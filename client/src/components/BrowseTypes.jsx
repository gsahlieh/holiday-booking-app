import React from 'react'

import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.css';
import SwiperCore, { Autoplay } from 'swiper';

import hotel from "../assets/hotel.webp"
import useFetch from '../hooks/useFetch';
import Loader from './Loader';
import Browse3d from './three/Browse3d';

function BrowseTypes() {

  const { data, loading } = useFetch(
    "/hotels/countByType"
  );

  SwiperCore.use([Autoplay]);

  const types = [
    {
      id: 1,
      title: "Hotels",
      text: data[0] + " properties",
      src: hotel
    },
    {
      id: 2,
      title: "Aparments",
      text: data[1] + " properties",
      src: "https://rimh2.domainstatic.com.au/fbQCVfLfbPAXH3yUioF2xcDEh2Q=/660x440/filters:format(jpeg):quality(80)/2017834074_1_1_220623_060416-w1620-h1080"    },
    {
      id: 3,
      title: "Resorts",
      text: data[2] + " properties",
      src: "https://www.jaypeehotels.com/blog/wp-content/uploads/2021/09/Internal-blog-2-1.jpg"    
    },
    {
      id: 4,
      title: "Villas",
      text: data[3] + " properties",
      src: 'https://dqif0xfu9mg0a.cloudfront.net/imageCache/property/mh-pi-46710877_Crop_600_400.jpg'
    },
    {
      id: 5,
      title: "Cabins",
      text: data[4] + " properties",
      src: "https://www.thespruce.com/thmb/WxtYOJJdXYMYjmXbIl4VE01owrs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Escape-trvler-cabin-5912179f3df78c9283c758a7.jpg"    }
  ]

  return (
    <div className="text-black md:w-[70vw] w-[90vw] md:mt-[10%] mt-[14%] m-auto">
      
      <div className="md:flex md:flex-row justify-between">
        {loading ? (
          <div className="m-auto">
            <Loader />
          </div>
          ) : (
            <div className="md:w-[67%]">
              <div>
                <h1 className="font-serif md:text-3xl text-xl pb-[2vh] md:text-left text-center">
                  Browse by property type
                </h1>
              </div>

              <Swiper id="main"
                spaceBetween={3}
                slidesPerView={2}
                autoplay={{disableOnInteraction: true, delay: 4000}}
                className=""
              >
                {types.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div className="">
                      <div className="h-full">
                        <img className="rounded-xl"
                          src={item?.src} alt={item.title}
                        />
                      </div>
                      <div className="md:text-left text-center">
                        <h1 className="font-bold text-xl font-serif">{item.title}</h1>
                        <p className="font-serif">{item.text}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )
        }

        <div className="w-full">
          <Browse3d />
        </div>
      </div>
    </div>
  )
}

export default BrowseTypes