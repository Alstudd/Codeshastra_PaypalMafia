"use client";
import Navbar from "./Navbar";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { buyCourse } from "../../../Web3/utils";
import { collection, getDocs } from "firebase/firestore";
import { db } from "lib/firebase";

const CoursesBuyPreview = (props: { courseId: string }) => {
  const { courseId: id } = props;
  const myId = id.params.courseId;

  const [arr, setArr] = useState([]);

  const buyBestCourse = async () => {
    const res = await buyCourse("0.0005", 5);
    console.log(res.hash);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const colRef = collection(db, "Course");
        const snapshot = await getDocs(colRef);
        let course = [];
        snapshot.docs.forEach((doc) => {
          if (doc.id == myId) {
            course.push({ ...doc.data(), id: doc.id });
          }
        });
        setArr(course);
        console.log(course);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchData();
  }, [myId]);

  return (
    <div>
      <Navbar />
      <div className="mx-auto md:w-[80%] my-10">
      <h1 className="font-bold text-2xl mt-3 m-2">
          Course Details
        </h1>
        {arr.map((values, index) => {
          return (
            <div key={index}>
              <div className="grid gap-7 md:grid-cols-3">
                <div className="rounded-md">
                  <Image
                    src="/Download.png"
                    height={500}
                    width={1000}
                    alt="certificate"
                    className="rounded-md border-2 border-white"
                  />
                </div>
                <div className="col-span-2">
                  <h3 className="mb-1 text-2xl font-bold tracking-tight text-black ">
                    {values.name}
                  </h3>
                  <h3 className="text-md mb-3 tracking-tight text-black ">
                    {values.desc}
                  </h3>
                  <div className="my-2 mb-4 flex gap-3">
                    <div className="my-auto flex flex-row gap-3 rounded-full border border-gray-600 px-4 py-1 text-black">
                      <p className="my-auto text-xs text-gray-400">
                        Time to complete :
                      </p>
                      <p className="text-sm text-gray-400">2:04:00</p>
                    </div>
                    <div className="my-auto flex flex-row gap-3 rounded-full border border-gray-600 px-4 py-1 text-black">
                      <p className="my-auto text-xs text-gray-400">
                        No of Chapters :
                      </p>
                      <p className="text-sm text-gray-400">2</p>
                    </div>
                  </div>

                  <div className="flex justify-between border-t border-gray-600 pt-2">
                    <h3 className="my-auto mb-3 ml-3 text-3xl font-bold tracking-tight text-black ">
                      {values.price}
                    </h3>
                    <button
                      type="button"
                      onClick={buyBestCourse}
                      className="inline-flex items-center gap-2 rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-lbpink/90 focus:outline-none "
                    >
                      <ShoppingCart /> Buy Course
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CoursesBuyPreview;
