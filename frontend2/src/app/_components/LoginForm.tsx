'use client';
import { useState } from 'react';
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../lib/firebase";
import { useRouter } from 'next/navigation';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const router = useRouter();

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(email, password);
      // console.log(res);
      // sessionStorage.setItem("user", true);
      setEmail('');
      setPassword('');
      router.push("/")
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogleSignIn = async (event: any) => {
    event.preventDefault();
    const provider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(auth, provider);
      // console.log(res);
      // sessionStorage.setItem("user", true);
      setEmail('');
      setPassword('');
      router.push("/")
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-center p-8">
      <div className="w-[400px] bg-white border border-gray-300 shadow-2xl rounded-lg h-fit p-4">
        <div className="border-gray-300 px-4 py-4">
          <div className="text-2xl font-semibold mb-6">
            Sign in{" "}
            <span className="text-gray-600 font-normal text-xl">
              to Unlock Best Features of{" "}
            </span>
            Learn Blocks
          </div>
          <div className="form">
            <label className="text-gray-800 text-sm font-semibold">
              Email
            </label>
            <input
              className="w-full border-2 border-gray-800 rounded-md px-4 py-3 mt-1 text-xs"
              type="email"
              id='email'
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required={true}
            />
            <label className="text-gray-800 text-sm font-semibold mt-4">
              Password
            </label>
            <input
              className="w-full border-2 border-gray-800 rounded-md px-4 py-3 mt-1 text-xs"
              type="password"
              id='password'
              placeholder=""
              value={password}
              onChange={handlePasswordChange}
              required={true}
            />
            <div className="text-xs mt-1 cursor-pointer">
              Forgot Password?
            </div>
            <button
              className="w-full text-center bg-gray-900 cursor-pointer font-medium hover:bg-slate-600 text-white rounded-full px-4 py-3 mt-4 text-sm"
              onClick={handleSubmit}
            >
              Sign in
            </button>
          </div>
          <div className=" text-center text-gray-500 my-4 text-xs">OR</div>
          <button onClick={handleGoogleSignIn} className="w-full mt-4 text-center text-black font-medium px-4 py-3 border-gray-900 border-2 rounded-full items-center flex hover:bg-black hover:text-white cursor-pointer transition-all">
            <img
              src="/google.svg"
              alt=""
              className="mr-12 max-sm:mr-4 "
              height={20}
              width={20}
            />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
    <img className="fixed bottom-0" src="/wave.svg" alt="" />
    </div>
  );
};

export default Signin;