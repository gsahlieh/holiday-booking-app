import React from 'react'

function Subscribe() {

  return (
    <div className="w-full h-fit bg-[#000080]">
      
      <div className="py-[5vh] mt-[4vh] text-white md:w-[70vw] w-[90vw] m-auto">
        
        <div className="flex flex-col">
          <div className="text-center mb-[4vh]">
            <h1 className="font-serif font-bold md:text-4xl text-2xl mb-[1vh]">
              Save on your trip!
            </h1>
            <p>
              Sign up to receive great deals
            </p>
          </div>
          
          <div className="flex flex-row m-auto text-black">
            <div className="w-[20vw] min-w-[160px]">
              <input className="w-full h-full rounded-md px-[1vw] outline-0"
                type="email" placeholder="Your Email"
              />
            </div>
            <div>
              <button className="rounded-md p-4 mx-[1vh] bg-sky-500">
                Subscribe
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Subscribe
