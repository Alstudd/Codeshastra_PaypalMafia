"use client";
import {
  ArrowRight,
  FileBarChart2,
  MailCheck,
  Plus,
  UploadCloud,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import React, { useState } from "react";

const CreateCourse = () => {
  const [toggletab, setToggletab] = useState(1);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState(false);

  const submit = async () => {
    const id = toast.loading("Please wait...", {
      theme: "dark",
    });
    toast.update(id, {
      render: "Video Uploaded",
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      isLoading: false,
      icon: ({ theme, type }) => <MailCheck className="text-[#bb86fc]" />,
    });
  };

  const toggle = (i: number) => {
    setToggletab(i);
  };

  const fileChange = () => {
    setStatus(true);
  };

  return (
    <div className="w-[80%] mx-auto">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <h1 className="font-bold text-xl mt-3 m-2">Course Creator</h1>
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          id="myTab"
          data-tabs-toggle="#myTabContent"
          role="tablist"
        >
          <li className="mr-2" role="presentation">
            <button
              className={
                toggletab === 1
                  ? "inline-block p-4 border-b-2 rounded-t-lg border-lb-pink"
                  : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-lb-pink hover:border-gray-300 dark:hover:text-gray-300"
              }
              type="button"
              onClick={() => toggle(1)}
            >
              How to Use
            </button>
          </li>
          <li className="mr-2" role="presentation">
            <button
              className={
                toggletab === 2
                  ? "inline-block p-4 border-b-2 rounded-t-lg border-lb-pink"
                  : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-lb-pink hover:border-gray-300 dark:hover:text-gray-300"
              }
              type="button"
              onClick={() => toggle(2)}
            >
              Videos
            </button>
          </li>
          <li className="mr-2" role="presentation">
            <button
              className={
                toggletab === 3
                  ? "inline-block p-4 border-b-2 rounded-t-lg border-lb-pink"
                  : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-lb-pink hover:border-gray-300 dark:hover:text-gray-300"
              }
              type="button"
              onClick={() => toggle(3)}
            >
              Brochures
            </button>
          </li>
        </ul>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="col-span-2 rounded-md shadow-md">
        {!status ? (
              <label
                htmlFor="dropzone-file"
                className="dark:hover:bg-bray-800 my-2 flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-600 bg-transparent hover:border-gray-500 hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center py-16">
                  <UploadCloud />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    MP4 (MAX. 1GB)
                  </p>
                </div>
                <input
                  onChange={fileChange}
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                />
              </label>
            ) : (
                <Image
                src="/Download.png"
                height={500}
                width={1000}
                alt="certificate"
                className="border-2 rounded-md border-white"
              />
            )}
        
        </div>
        <div>
          <h3 className="mb-3 text-2xl font-bold tracking-tight text-white">
            Enter Topic Details
          </h3>
          <form>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white"
              >
                Enter Chapter Name
              </label>
              <input
                type="text"
                id="Name"
                className="bg-transparent border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="eg. Python in 3 Hrs"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white"
              >
                Enter Chapter Desc
              </label>
              <textarea
                id="Name"
                rows={3}
                className="bg-transparent border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
              />

              {/* <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white"
              >
                Enter Course Price <span className="text-gray-600">(In ETH)</span>
              </label>
              <input
                type="text"
                id="Name"
                className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="eg. 5"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              /> */}
            </div>

            
            <button
              type="button"
              // onClick={submit}
              className="inline-flex items-center gap-2 rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#24292F]/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 dark:hover:bg-[#050708]/30 dark:focus:ring-gray-500 "
            >
              <Plus /> Add Chapter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
