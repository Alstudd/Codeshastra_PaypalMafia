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
import { useAccount } from "wagmi";
import { getServerAuthSession } from "~/server/auth";
import { addDoc, collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "lib/firebase";
import axios from 'axios'
import {createCourse as utilCreateCourse} from '../../../Web3/utils'

const CreateCourse = () => {
  // const { address, isConnecting, isDisconnected } = useAccount();
  // console.log(address)
  const [sessionValue, setSessionValue] = useState<string | null>(null)

  let [isOpen, setIsOpen] = useState(false);

  const submit = async () => {
    const id = toast.loading("Please wait...", {
      theme: "dark",
    });

    const res = await utilCreateCourse(cName, price)
    console.log(res)

    try {
      const docRef = collection(db, "Course", sessionStorage.getItem("myId")); // Assuming "courses" is the name of your Firestore collection
      const wait = await updateDoc(docRef, {
        courseId: res
      }, { merge: true });
      alert("Course created successfully");
      toggle(2);
    } catch (error) {
      alert("Failed to create course");
      console.error(error);
    }

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
  }

  const fetchData = async () => {
    try {
      const myId = sessionStorage.getItem("myId");
      const colRef = collection(db, "Course", myId, "Chapter");
      const snapshot = await getDocs(colRef);
      let course: any[] = []; // Initialize course as an empty array
      snapshot.docs.forEach((doc) => {
          course.push({ ...doc.data(), id: doc.id });
      });
      setChapArr(course);
      console.log(course);
      console.log(chapArr);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {

    fetchData();
}, []);


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
  const [fileUrl, setFileUrl] = useState()
  const [enabled, setEnabled] = useState(false);
  const [frameSrc, setFrameSrc] = useState()
  const [chapArr, setChapArr]= useState([]);

  const toggle = (i: number) => {
    setToggletab(i);
  };

  const fileChange = async (event: any) => {
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      const file = event.target.files[0]
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert canvas to data URL and set as frame src
        setFrameSrc(canvas.toDataURL());
      };
  
      try {
        const response = await axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setFileUrl(response.data.url)
        console.log("Video uploaded successfully:", response.data);
        setStatus(true);
      } catch (error) {
        console.error("Error uploading video:", error);
      }
  };

  const createCourse = async (e: any) => {
    e.preventDefault();
    try {
      const docRef = collection(db, "Course"); // Assuming "courses" is the name of your Firestore collection
      const wait = await addDoc(docRef, {
        courseName: cName,
        desc: cDesc,
        price: price,
      });
      sessionStorage.setItem("myId", wait.id)
      alert("Course created successfully");
      toggle(2);
    } catch (error) {
      alert("Failed to create course");
      console.error(error);
    }
  };
  

  const createChapter = async (e: any) => {
    e.preventDefault();
    try {
        const courseId = sessionStorage.getItem("myId");
        const docRef = collection(db, "Course", courseId, "Chapter");
        await addDoc(docRef, {
            name: chpName,
            desc: chpDesc,
            pro: enabled,
            url: fileUrl ? fileUrl : '',
        });
        alert("Chapter created successfully");
        await fetchData()
        closeModal();
    } catch (error) {
        alert("Failed to create chapter");
        console.error(error);
    }
};


  return (
    <div className="md:w-[80%] w-[95%] mx-auto">
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
                  ? "inline-block p-4 border-b-2 rounded-t-lg border-lbpink"
                  : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-lbpink hover:border-gray-300 dark:hover:text-gray-300"
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
                  ? "inline-block p-4 border-b-2 rounded-t-lg border-lbpink"
                  : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-lbpink hover:border-gray-300 dark:hover:text-gray-300"
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
                  ? "inline-block p-4 border-b-2 rounded-t-lg border-lbpink"
                  : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-lbpink hover:border-gray-300 dark:hover:text-gray-300"
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
              className="block mb-2 text-sm font-medium text-black dark:text-white"
            >
              Enter Course Name
            </label>
            <input
              type="text"
              id="Name"
              className="bg-transparent border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="eg. Python in 3 Hrs"
              value={cName}
              onChange={(e) => setCName(e.target.value)}
              required
            />

            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-black dark:text-white"
            >
              Enter Course Desc
            </label>
            <textarea
              id="Name"
              rows={3}
              className="bg-transparent border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={cDesc}
              onChange={(e) => setCDesc(e.target.value)}
              required
            />

            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-black"
            >
              Enter Course Price <span className="text-gray-600">(In ETH)</span>
            </label>
            <input
              type="text"
              id="Name"
              className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="eg. 5"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <button
            type="button"
            onClick={createCourse}
            className="inline-flex items-center gap-2 rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-lbpink/90 focus:outline-none "
          >
            <ArrowRight size={22} /> Next Step
          </button>
        {/* </form> */}
      </div>

      <div className={toggletab === 2 ? "block" : "hidden"}>
        {chapArr?.map((values, i) => {
          return (
            <div key={i} className="border my-2 border-gray-600 rounded-lg">
              <div className="p-4 px-5 flex flex-row justify-between">
                <div className="my-auto">
                  {values.name}
                  <p className="text-gray-400">{values.desc}</p>
                </div>
                <div className="my-auto flex flex-row gap-3 text-black">
                  <a href={values.id} className="bg-gray-100 rounded-md p-2">
                    <Pencil />
                  </a>
                  <a className="bg-gray-100 rounded-md p-2">
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
            className="inline-flex my-5 items-center gap-2 rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-lbpink/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 dark:focus:ring-gray-500 "
          >
            <Plus size={22} />
            Add Chapter
          </button>
        </div>

        <div className="flex gap-3 justify-end border-t border-gray-600 mt-16">
          <button
            type="button"
            onClick={() => toggle(1)}
            className="inline-flex my-2 items-center gap-2 rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-lbpink/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 dark:focus:ring-gray-500 "
          >
            <ArrowLeft size={22} />
            Previous Step
          </button>

          <button
            type="button"
            onClick={() => toggle(3)}
            className="inline-flex my-2 items-center gap-2 rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-lbpink/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 dark:focus:ring-gray-500 "
          >
            <ArrowRight size={22} />
            Next Step
          </button>
        </div>
      </div>

      <div className={toggletab === 3 ? "block" : "hidden"}>
        <h1 className="font-bold text-black text-xl mt-3 m-2">Preview Course</h1>
        <div className="grid gap-7 text-black md:grid-cols-3">
          <div className="rounded-md">
            {/* <Image
              src={frameSrc}
              height={500}
              width={1000}
              alt="certificate"
              className="border-2 rounded-md border-white"
            /> */}
            <embed className="rounded-2xl w-full h-full p-4" src={fileUrl} type="" />
          </div>
          <div className="col-span-2">
            <h3 className="mb-1 text-2xl font-bold tracking-tight text-black ">
              {cName}
            </h3>
            <h3 className="mb-3 tracking-tight text-md text-black ">
              {cDesc}
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
                <p className="text-gray-400 text-sm">{chapArr.length}</p>
              </div>
            </div>

            <div className="flex justify-between border-t border-gray-600 pt-2">
              <h3 className="ml-3 mb-3 my-auto text-3xl font-bold tracking-tight text-black ">
                {price}
              </h3>
              <button
                type="button"
                onClick={submit}
                className="inline-flex items-center gap-2 rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-lbpink/90 focus:outline-none "
              >
                <UploadCloud /> Publish
              </button>
            </div>
          </div>
        </div>
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
                <Dialog.Panel className="w-[80%] text-black transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add Your Chapter Content
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="grid gap-3 md:grid-cols-3">
                      <div className="col-span-2 rounded-md">
                        {!fileUrl ? (
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
                          // <Image
                          //   src={frameSrc}
                          //   height={500}
                          //   width={1000}
                          //   alt="certificate"
                          //   className="border-2 rounded-md border-white"
                          // />
                          <embed className="rounded-2xl w-full h-full p-4 " src={fileUrl} type="" />
                        )}
                      </div>
                      <div>
                        <h3 className="mb-3 text-2xl font-bold tracking-tight text-black ">
                          Enter Topic Details
                        </h3>
                        <form onSubmit={createChapter}>
                          <div className="mb-4">
                            <label
                              htmlFor="email"
                              className="block mb-2 text-sm font-medium text-black"
                            >
                              Enter Chapter Name
                            </label>
                            <input
                              type="text"
                              id="Name"
                              className="bg-transparent border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                              placeholder="eg. Python in 3 Hrs"
                              value={chpName}
                              onChange={(e) => setChpName(e.target.value)}
                              required
                            />

                            <label
                              htmlFor="email"
                              className="block mb-2 text-sm font-medium text-black"
                            >
                              Enter Chapter Desc
                            </label>
                            <textarea
                              id="Name"
                              rows={3}
                              className="bg-transparent border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                                className="block my-auto text-sm font-medium text-black"
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
