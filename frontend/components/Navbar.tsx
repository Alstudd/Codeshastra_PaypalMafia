import { Mail, Phone, Scroll } from "lucide-react";
import React from "react";
import logo  from '../public/LearnBlocksLogo.png'
import Image from "next/image";

const Navbar = () => {
  return (
    <div>
      <nav className="bg-black opacity-90 border-gray-200 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/"
            className="flex items-center text-white space-x-3 rtl:space-x-reverse"
          >
            <Image
              src={logo}
              height={30}
              width={30}
              alt="logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              Learn <span className="text-lb-pink">Blocks</span>
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
              <a
                href="AlvinDsouza_Resume.pdf"
                target="blank"
                className="block py-2 px-3 text-gray-100 rounded hover:bg-gray-400 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                <Scroll />
              </a>
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
                <a
                  href="mailto:alvindsouza2204@gmail.com"
                  className="block py-2 px-3 text-gray-100 rounded hover:bg-gray-400 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                >
                  <Mail />
                </a>
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
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
