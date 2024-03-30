// src/components/AuthForm.tsx

import firebase from "firebase/app"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth"
import { Milestone } from "lucide-react"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import React, { useState } from "react"

import { auth } from "~firebase/firebaseClient"
import useFirebaseUser from "~firebase/useFirebaseUser"

export default function AuthForm() {
  const [showLogin, setShowLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [password, setPassword] = useState("")
  const { isLoading, onLogin } = useFirebaseUser()
  

const auth = getAuth();

  const signIn = async (e: any) => {
    e.preventDefault()
    // try {
    //     signInWithPopup(auth, provider)
    //     .then((result) => {
    //       // This gives you a Google Access Token. You can use it to access the Google API.
    //       const credential = GoogleAuthProvider.credentialFromResult(result);
    //       const token = credential.accessToken;
    //       // The signed-in user info.
    //       const user = result.user;
    //       // IdP data available using getAdditionalUserInfo(result)
    //       // ...
    //     }).catch((error) => {
    //       // Handle Errors here.
    //       const errorCode = error.code;
    //       const errorMessage = error.message;
    //       // The email of the user's account used.
    //       const email = error.customData.email;
    //       // The AuthCredential type that was used.
    //       const credential = GoogleAuthProvider.credentialFromError(error);
    //       // ...
    //     });
    // } catch (error: any) {
    //   console.log(error.message)
    // }
  }

  return (
    <div className="flex items-center justify-center w-full p-4 overflow-x-hidden rounded-xl overflow-y-auto md:inset-0">
      <div className="w-full max-w-2xl">
        <div className="p-8 px-2 bg-white rounded-lg shadow">
          <div className="flex flex-row items-center justify-center">
            {!isLoading && (
              <span className="text-black font-bold text-2xl text-center">
                {showLogin ? "Login" : "Sign Up"}
              </span>
            )}
            {isLoading && (
              <span className="text-black font-bold text-3xl text-center">
                Loading...
              </span>
            )}
          </div>

          <div className="p-4 rounded-xl bg-white text-black">
            {showLogin && !isLoading && (
              <form className="space-y-4 md:space-y-6" onSubmit={signIn}>
                <div className="flex justify-center">
                  <button
                    onClick={signIn}
                    className="my-2 hover:bg-[#6F3284] hover:text-white border-gray-600 border p-2 px-4 rounded-md flex flex-row gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="2em"
                      height="2em"
                      viewBox="0 0 256 262">
                      <path
                        fill="#4285f4"
                        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                      />
                      <path
                        fill="#34a853"
                        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                      />
                      <path
                        fill="#fbbc05"
                        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                      />
                      <path
                        fill="#eb4335"
                        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                      />
                    </svg>{" "}
                    <p className="text-md my-auto">Sign In with Google</p>
                  </button>
                </div>
                {/* <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                </div> */}
                {/* <button onClick={signInWithGoogle}>Sign in with Google</button> */}
                {/* <button
                  type="submit"
                  className="w-full text-black bg-gray-300 hover:bg-primary-dark focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  Sign in
                </button> */}
                <div className="flex text-sm flex-row gap-3">
                  <p className=" font-light text-gray-500">
                    Don&apos;t have an account yet?
                  </p>
                  <a
                    href="http://localhost:3000/"
                    target="blank"
                    className="bg-transparent font-medium text-primary-600 hover:underline">
                    Sign up
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
