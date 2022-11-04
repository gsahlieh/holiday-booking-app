import React from 'react'

import Loader from "./Loader.js"
import useFetch from '../hooks/useFetch'

function FeaturedLocations() {

  const { data, loading } = useFetch(
    "/hotels/countByCity?cities=berlin,paris,london"
  );

  const locs = [
    {
      id: 1,
      src: "https://theplanetd.com/images/places-to-visit-in-berlin-germany.jpg",
      title: "Berlin",
      ps: data[0] + " properties"
    },
    {
      id: 2,
      src: 'https://s1.1zoom.me/prev/521/Sky_Evening_France_Eiffel_Tower_Paris_From_above_520603_600x400.jpg',
      title: "Paris",
      ps: data[1] + " properties"
    },
    {
      id: 3,
      src: "https://thumbs.dreamstime.com/b/big-ben-london-autumn-leaves-32915756.jpg",
      title: "London",
      ps: data[2] + " properties"
    }
  ]

  return (

    <div className="text-white h-fit">
      {loading ? (
        <div className="m-auto">
          <Loader />
        </div>
        ) : (
          <div className="grid grid-cols-3 gap-1 md:w-[70vw] w-[90vw] m-auto min-h-[200px]">
            
            {locs.map((item) => (
              <div key={item.id} className="relative top-[65%] md:top-[30%]">
                <div>
                  <img className="rounded-xl h-full md:min-h-[200px]"
                    src={item.src} alt={item.title}
                  />
                </div>
                <div className="absolute md:top-1/2 top-[25%]">
                  <h1 className="md:text-6xl text-2xl font-serif">{item.title}</h1>
                  <p className="hidden md:flex md:text-2xl font-serif text-white font-bold">{item.ps}</p>
                </div>
              </div>
            ))}

          </div>
        )
      }
    </div>
  )
}

export default FeaturedLocations