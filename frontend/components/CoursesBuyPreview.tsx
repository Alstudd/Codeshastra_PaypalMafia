import Navbar from '@/components/Navbar'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const CoursesBuyPreview = () => {
  return (
    <div>
        <Navbar/>
        <div className="grid gap-7 md:grid-cols-3">
          <div className="rounded-md">
            <Image
              src="/Download.png"
              height={500}
              width={1000}
              alt="certificate"
              className="border-2 rounded-md border-white"
            />
          </div>
          <div className="col-span-2">
            <h3 className="mb-1 text-2xl font-bold tracking-tight text-white ">
              Course Name
            </h3>
            <h3 className="mb-3 tracking-tight text-md text-white ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptate, reprehenderit! Deleniti, vitae dignissimos cumque illum
              et nemo alias quia culpa ad asperiores saepe ducimus iste modi
              voluptatem voluptatibus rerum magni?
            </h3>
            <div className="flex my-2 mb-4 gap-3">
              <div className="my-auto flex flex-row gap-3 py-1 px-4 rounded-full border border-gray-600 text-black">
                <p className="text-gray-400 text-xs my-auto">
                  Time to complete :
                </p>
                <p className="text-gray-400 text-sm">2:04:00</p>
              </div>
              <div className="my-auto flex flex-row gap-3 py-1 px-4 rounded-full border border-gray-600 text-black">
                <p className="text-gray-400 text-xs my-auto">
                  No of Chapters :
                </p>
                <p className="text-gray-400 text-sm">4</p>
              </div>
            </div>

            <div className="flex justify-between border-t border-gray-600 pt-2">
              <h3 className="ml-3 mb-3 my-auto text-3xl font-bold tracking-tight text-white ">
                10 ETH
              </h3>
              <button
                type="button"
                // onClick={submit}
                className="inline-flex items-center gap-2 rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-lbpink/90 focus:outline-none "
              >
                <ShoppingCart /> Buy Course
              </button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default CoursesBuyPreview