"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Link from "next/link";
import { ArrowRight, Search, ShoppingCart } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "lib/firebase";

const CoursesGrp = () => {

  const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const colRef = collection(db, "Course");
                const snapshot = await getDocs(colRef);
                let courses: any[] = [];
                snapshot.forEach((doc) => {
                    courses.push({ ...doc.data(), id: doc.id });
                });
                setData(courses);
                console.log(courses);
            } catch (err) {
                console.log(err.message);
            }
        };

        fetchData();
    }, []);
  return (
    <div>
      <Navbar />
      <section className="bg-white bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-gray-900 dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
        <div className="relative z-10 mx-auto max-w-screen-xl px-4 py-8 text-center lg:py-16">
          <h1 className="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            Take only the Best Courses in the Industry
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 dark:text-gray-200 sm:px-16 lg:px-48 lg:text-xl">
            Become the best by learning from the best!!
          </p>
        </div>
        {/* <div className="absolute left-0 top-0 z-0 h-full w-full bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900"></div> */}
      </section>

      <div className="mx-auto my-5 w-[80%]">
          <form className="w-full">
            <label
              htmlFor="default-search"
              className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Search
            </label>
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                <Search />
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full  rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="  Search for latest courses..."
                required
              />
              <button
                type="submit"
                className="absolute bottom-2.5 end-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
      </div>
      <div className="w-[80%] mx-auto gap-3">
        <h1 className="font-bold text-2xl mt-3 m-2">
          Get the latest courses here{" "}
        </h1>
        <div className="mb-10 mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          {data?.map((item) => (
            <div
              key={item.id}
              className="group relative w-full max-w-sm rounded-lg bg-white shadow dark:border-gray-700 dark:bg-gray-800"
            >
              <div>
                <embed
                  className="w-full group-hover:opacity-40 h-full rounded-lg p-1"
                  src={item.url}
                />
              </div>
             <span className="absolute text-white bg-yellow-500 rounded-l-lg rounded-t-none p-2 px-4 right-1 top-1 text-sm">₹{item.price}</span>
              <div className="w-full bottom-1">
                <div className="px-5 w-full">
                  <div>
                    {/* <h5 className="flex flex-col text-lg font-semibold tracking-tight group-hover:text-white text-gray-900">
                      {item.name}
                      <span className="text-sm">{item.desc}</span>
                    </h5> */}
                  </div>
                  <div className="mb-5 mt-1 flex items-center justify-between">
                  <h5 className="flex flex-col text-lg font-semibold tracking-tight text-gray-900">
                      {item.name}
                      <span className="text-sm">{item.desc}</span>
                    </h5>
                    {/* <p className="text-3xl font-semibold group-hover:text-white text-gray-900">
                      ₹{item.cost}
                    </p> */}
                    <Link
                      href={`/courses/${item.id}`}
                      className="rounded-full bg-yellow-500 p-3"
                    >
                      <ArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesGrp;
