"use client";
import {
  ArrowLeft,
  ArrowRight,
  MailCheck,
  Pencil,
  Plus,
  ShoppingCart,
  Trash,
  UploadCloud,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Switch, Transition } from "@headlessui/react";
import { redirect } from "next/navigation";
// import { getSession } from "next-auth/react";
// import { getServerAuthSession } from "~/server/auth";
// import { AddCourse } from "./db/AddCourse";
import { useAccount } from "wagmi";
import { db } from "~/server/db";
import { getServerAuthSession } from "~/server/auth";
import { AddCourse } from "./db/AddCourse";

const CreateCourse = () => {
  // const { address, isConnecting, isDisconnected } = useAccount();
  // console.log(address)
  const [sessionValue, setSessionValue] = useState<string | null>(null);

  const chapArr = [
    {
      chpName: "Chap Name",
      chpDesc: "Chap Desc",
      chpVid: "",
      id: "",
    },
  ];
  let [isOpen, setIsOpen] = useState(false);

  const submit = () => {
    const id = toast.loading("Please wait...", {
      theme: "dark",
    });
    toast.update(id, {
      render: "Chapter Added",
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
    closeModal();
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    toggle(2);

    // try {
    //   const newCourse = await AddCourse(
    //     cName,
    //     cDesc,
    //     price, // Assuming price is stored as an integer
    //     sessionValue,
    //     // Add other necessary fields here
    //   )

    //   console.log('Course created successfully:', newCourse);
    //   // Reset form fields after successful course creation
    //   setCName('');
    //   setCDesc('');
    //   setPrice('');
    // }
    // catch (error) {
    //   console.error('Error creating course:', error);
    // }

    try {
      // const session = await getServerAuthSession();
      // console.log(session)

      // if (!session) {
      //   console.error('User is not authenticated');
      //   return;
      // }
      // const newCourse = await db.teachercourse.create({
      //   data: {
      //     title: cName,
      //     description: cDesc,
      //     price: parseInt(price), // Assuming price is stored as an integer
      //     userId: "123",
      //     // Add other necessary fields here
      //   },
      // });

      const newCourse = await AddCourse(cName, cDesc, price, "123");

      console.log("Course created successfully:", newCourse);
      // Reset form fields after successful course creation
      setCName("");
      setCDesc("");
      setPrice("");
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const [toggletab, setToggletab] = useState(1);
  const [chpName, setChpName] = useState("");
  const [chpDesc, setChpDesc] = useState("");
  const [cName, setCName] = useState("");
  const [cDesc, setCDesc] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState(false);

  const [enabled, setEnabled] = useState(false);

  const toggle = (i: number) => {
    setToggletab(i);
  };

  const fileChange = () => {
    setStatus(true);
  };

  return (
    <div className="mx-auto w-[95%] md:w-[80%]">
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
      <h1 className="m-2 mt-3 text-xl font-bold">Course Creator</h1>
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul
          className="-mb-px flex flex-wrap text-center text-sm font-medium"
          id="myTab"
          data-tabs-toggle="#myTabContent"
          role="tablist"
        >
          <li className="mr-2" role="presentation">
            <button
              className={
                toggletab === 1
                  ? "inline-block rounded-t-lg border-b-2 border-lbpink p-4"
                  : "inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-lbpink dark:hover:text-gray-300"
              }
              type="button"
              onClick={() => toggle(1)}
            >
              Create Course
            </button>
          </li>
          <li className="mr-2" role="presentation">
            <button
              className={
                toggletab === 2
                  ? "inline-block rounded-t-lg border-b-2 border-lbpink p-4"
                  : "inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-lbpink dark:hover:text-gray-300"
              }
              type="button"
              onClick={() => toggle(2)}
            >
              Add Content
            </button>
          </li>
          <li className="mr-2" role="presentation">
            <button
              className={
                toggletab === 3
                  ? "inline-block rounded-t-lg border-b-2 border-lbpink p-4"
                  : "inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-lbpink dark:hover:text-gray-300"
              }
              type="button"
              onClick={() => toggle(3)}
            >
              Publish
            </button>
          </li>
        </ul>
      </div>

      <div className={toggletab === 1 ? "block" : "hidden"}>
        {/* <form
        onSubmit={handleSubmit}
        > */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-black dark:text-white"
          >
            Enter Course Name
          </label>
          <input
            type="text"
            id="Name"
            className="mb-5 block w-full rounded-lg border border-gray-300 bg-transparent p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="eg. Python in 3 Hrs"
            value={cName}
            onChange={(e) => setCName(e.target.value)}
            required
          />

          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-black dark:text-white"
          >
            Enter Course Desc
          </label>
          <textarea
            id="Name"
            rows={3}
            className="mb-5 block w-full rounded-lg border border-gray-300 bg-transparent p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            value={cDesc}
            onChange={(e) => setCDesc(e.target.value)}
            required
          />

          {/* <div className="flex gap-3">
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`${enabled ? "bg-teal-900" : "bg-teal-700"}
          relative inline-flex h-[28px] w-[48px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${enabled ? "translate-x-5" : "translate-x-0"}
            pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
              <label
                htmlFor="email"
                className="block my-auto text-sm font-medium text-black dark:text-white"
              >
                Enable as Pro Content
              </label>
            </div> */}

          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-black"
          >
            Enter Course Price <span className="text-gray-600">(In ETH)</span>
          </label>
          <input
            type="text"
            id="Name"
            className="block w-full rounded-lg border border-gray-300 bg-transparent p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="eg. 5"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="inline-flex items-center gap-2 rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-lbpink/90 focus:outline-none "
        >
          <ArrowRight size={22} /> Next Step
        </button>
        {/* </form> */}
      </div>

      <div className={toggletab === 2 ? "block" : "hidden"}>
        {chapArr.map((values, i) => {
          return (
            <div key={i} className="rounded-lg border border-gray-600">
              <div className="flex flex-row justify-between p-4 px-5">
                <div className="my-auto">
                  {values.chpName}
                  <p className="text-gray-400">{values.chpDesc}</p>
                </div>
                <div className="my-auto flex flex-row gap-3 text-black">
                  <a href={values.id} className="rounded-md bg-gray-100 p-2">
                    <Pencil />
                  </a>
                  <a className="rounded-md bg-gray-100 p-2">
                    <Trash />
                  </a>
                </div>
              </div>
            </div>
          );
        })}

        <div className="items-end">
          <button
            type="button"
            onClick={openModal}
            className="my-5 inline-flex items-center gap-2 rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-lbpink/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 dark:focus:ring-gray-500 "
          >
            <Plus size={22} />
            Add Chapter
          </button>
        </div>

        <div className="mt-16 flex justify-end gap-3 border-t border-gray-600">
          <button
            type="button"
            onClick={() => toggle(1)}
            className="my-2 inline-flex items-center gap-2 rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-lbpink/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 dark:focus:ring-gray-500 "
          >
            <ArrowLeft size={22} />
            Previous Step
          </button>

          <button
            type="button"
            onClick={() => toggle(3)}
            className="my-2 inline-flex items-center gap-2 rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-lbpink/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 dark:focus:ring-gray-500 "
          >
            <ArrowRight size={22} />
            Next Step
          </button>
        </div>
      </div>

      <div className={toggletab === 3 ? "block" : "hidden"}>
        <h1 className="m-2 mt-3 text-xl font-bold text-black">
          Preview Course
        </h1>
        <div className="grid gap-7 text-black md:grid-cols-3">
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
              Course Name
            </h3>
            <h3 className="text-md mb-3 tracking-tight text-black ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptate, reprehenderit! Deleniti, vitae dignissimos cumque illum
              et nemo alias quia culpa ad asperiores saepe ducimus iste modi
              voluptatem voluptatibus rerum magni?
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
                <p className="text-sm text-gray-400">4</p>
              </div>
            </div>

            <div className="flex justify-between border-t border-gray-600 pt-2">
              <h3 className="my-auto mb-3 ml-3 text-3xl font-bold tracking-tight text-black ">
                10 ETH
              </h3>
              <button
                type="button"
                onClick={submit}
                className="inline-flex items-center gap-2 rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-lbpink/90 focus:outline-none "
              >
                <ShoppingCart /> Buy Course
              </button>
            </div>
          </div>
        </div>
        {/* <div className="my-2">
          <div className="border mb-3 border-gray-600 rounded-lg">
            <div className="p-4 px-5 flex flex-row justify-between">
              <div className="my-auto">Chapter Name</div>
              <div className="my-auto flex flex-col text-black">
                <p className="text-gray-400 text-xs">Time to complete</p>
                <p className="text-gray-400 text-sm">1:04:00</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-[80%] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                    Add Your Chapter Content
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="grid gap-3 md:grid-cols-3">
                      <div className="col-span-2 rounded-md">
                        {!status ? (
                          <label
                            htmlFor="dropzone-file"
                            className="dark:hover:bg-bray-800 my-2 flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-600 bg-transparent hover:border-gray-500"
                          >
                            <div className="flex flex-col items-center justify-center py-16">
                              <UploadCloud />
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
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
                            className="rounded-md border-2 border-white"
                          />
                        )}
                      </div>
                      <div>
                        <h3 className="mb-3 text-2xl font-bold tracking-tight text-white dark:text-black ">
                          Enter Topic Details
                        </h3>
                        <form onSubmit={() => {}}>
                          <div className="mb-4">
                            <label
                              htmlFor="email"
                              className="mb-2 block text-sm font-medium text-white dark:text-black"
                            >
                              Enter Chapter Name
                            </label>
                            <input
                              type="text"
                              id="Name"
                              className="mb-5 block w-full rounded-lg border border-gray-300 bg-transparent p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                              placeholder="eg. Python in 3 Hrs"
                              value={chpName}
                              onChange={(e) => setChpName(e.target.value)}
                              required
                            />

                            <label
                              htmlFor="email"
                              className="mb-2 block text-sm font-medium text-white dark:text-black"
                            >
                              Enter Chapter Desc
                            </label>
                            <textarea
                              id="Name"
                              rows={3}
                              className="mb-5 block w-full rounded-lg border border-gray-300 bg-transparent p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                              value={chpDesc}
                              onChange={(e) => setChpDesc(e.target.value)}
                              required
                            />

                            <div className="flex gap-3">
                              <Switch
                                checked={enabled}
                                onChange={setEnabled}
                                className={`${enabled ? "bg-teal-900" : "bg-teal-700"}
          relative inline-flex h-[28px] w-[48px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                              >
                                <span className="sr-only">Use setting</span>
                                <span
                                  aria-hidden="true"
                                  className={`${enabled ? "translate-x-5" : "translate-x-0"}
            pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                />
                              </Switch>
                              <label
                                htmlFor="email"
                                className="my-auto block text-sm font-medium text-white dark:text-black"
                              >
                                Enable as Pro Content
                              </label>
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="inline-flex items-center gap-2 rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#24292F]/90 focus:outline-none "
                          >
                            <Plus /> Add Chapter
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default CreateCourse;
