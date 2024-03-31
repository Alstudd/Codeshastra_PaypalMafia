"use client";
import { Mail, Phone, Scroll, User2 } from "lucide-react";
import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import logo from "../public/LearnBlocksLogo.png";
import stud from "../public/stud.png";
import teach from "../public/teach.png";
import Image from "next/image";
import { getSession, signIn } from "next-auth/react";
import { db } from "~/server/db";
import { getServerAuthSession } from "~/server/auth";
import { ConnectWalletButton } from "./ConnectWalletButton";

const Navbar = () => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function studentLogin() {
    signIn("google", { callbackUrl: "/student" });
  }

  function teacherLogin() {
    signIn("google", { callbackUrl: "/teacher" });
  }

  return (
    <div>
      <nav className="border-gray-200 bg-black ">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <a
            href="/"
            className="flex items-center space-x-3 text-white rtl:space-x-reverse"
          >
            <Image
              src="/LearnBlocksLogo.png"
              height={30}
              width={30}
              alt="logo"
            />
            <span className="self-center whitespace-nowrap text-2xl font-semibold text-white">
              Learn <span className="text-lbpink">Blocks</span>
            </span>
          </a>

					<ul className="flex bg-black flex-row md:hidden">
						<li>
							<a
								href="tel:9820257477"
								className="block py-2 px-3 text-gray-100 rounded hover:bg-gray-400 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
							>
								<Phone />
							</a>
						</li>
						<li>
							<button
								onClick={openModal}
								className="block py-2 px-3 text-gray-100 rounded hover:bg-gray-400 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
							>
								<User2 />
							</button>
						</li>
						<li className="text-white">
							<ConnectWalletButton />
						</li>
					</ul>

					<div
						className="hidden bg-black w-full  md:block md:w-auto"
						id="navbar-default"
					>
						<ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-900 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-black ">
							<li>
								<a
									href="tel:9820257477"
									className="block py-2 px-3 text-gray-100 rounded hover:bg-gray-400 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
								>
									<Phone />
								</a>
							</li>
							<li>
								<button
									onClick={openModal}
									className="block py-2 px-3 text-gray-100 rounded hover:bg-gray-400 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
								>
									<User2 />
								</button>
							</li>
							<li className="text-white">
								<ConnectWalletButton />
							</li>
							<li>
								<a
									href="/login"
									className="block py-2 px-3 text-gray-100 rounded hover:bg-gray-400 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
								>
									SignUp / Login
								</a>
							</li>
						</ul>
					</div>

          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Select your Role
                      </Dialog.Title>
                      <div className="mt-2">
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={studentLogin}
                            className="flex flex-col items-center rounded-lg text-center hover:cursor-pointer"
                          >
                            <Image
                              src="/stud.png"
                              width={150}
                              height={150}
                              className="mb-4 rounded-full"
                              alt="Student"
                            />
                            <p className="text-black">Student</p>
                          </button>
                          <button
                            onClick={teacherLogin}
                            className="flex flex-col items-center rounded-lg text-center hover:cursor-pointer"
                          >
                            <Image
                              src="/teach.png"
                              width={150}
                              height={150}
                              className="mb-4 rounded-full"
                              alt="Teacher"
                            />
                            <p className="text-black">Teacher</p>
                          </button>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
