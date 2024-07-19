import React from "react";
import Header from "./Header";
import { useState, useRef } from "react";
import { validation } from "../utils/validate";
import { VscError } from "react-icons/vsc";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import {
  GOOGLE_POLICIES_URL,
  GOOGLE_TOS_URL,
  LEARN_MORE_TEXT1,
  LEARN_MORE_TEXT2,
  NETFLIX_BGD_IMG,
  USER_AVATAR,
} from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [showData, setShowData] = useState(false);
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const fullNameRef = useRef(null);

  const handlevalidation = () => {
    //validation for password,email and full name
    const message = validation(
      emailRef.current.value,
      passwordRef.current.value
    );
    setShowError(message);
    if (message) return; //agar message null hoga means validation pass ho gya aur not null means not valid email and password
    //SIGN UP LOGIC SIGN IN LOGIC
    if (!isSignInForm) {
      //sign up
      createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          updateProfile(user, {
            displayName: fullNameRef.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = user;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              ); //yahan pr yeh store dobara update islie dobara se store update kia kyuki
              //profile update ke bad null de rha tha at first bcs us time tak onAuth Change me null jaa rha tha
            })
            .catch((error) => {
              // An error occurred
              setShowError(error.message);
            });
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setShowError(errorMessage + "- " + errorCode);
        });
    } else {
      //sign in
      signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setShowError(errorMessage + "- " + errorCode);
        });
    }
  };

  const handleSignIn = () => {
    setIsSignInForm(!isSignInForm);
  };
  const handleShowData = () => {
    setShowData(true);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src={NETFLIX_BGD_IMG}
          alt="Background Img"
          className="object-cover w-full h-full"
        ></img>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault(); //bcs form ki normal tendency submit hone ki hai to hum jab email aur pass likne ke bad uski value use karne ka try kar rhe the to wo refresh hokar uski value chali jaa rhi thi so wh have used this
        }}
        className="absolute bg-black sm:m-0 md:mx-auto sm:my-20 md:my-36 sm:w-full lg:w-4/12 px-[68px] sm:py-[20px] md:py-[38px]  left-0 right-0 text-white rounded-lg bg-opacity-80 flex flex-col gap-4"
      >
        <h1 className="text-[2rem] font-[700] mb-[20px]">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={fullNameRef}
            type="text"
            placeholder="Full Name"
            className="w-full p-3  bg-[#161616b3] border-[#808080b3] border-[0.0625rem] rounded"
          />
        )}
        <input
          ref={emailRef}
          type="text"
          placeholder="Email"
          className="w-full p-3  bg-[#161616b3] border-[#808080b3] border-[0.0625rem] rounded"
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="w-full p-3  bg-[#161616b3] border-[#808080b3] border-[0.0625rem] rounded"
        />
        <p className="text-[0.8125rem] font-[400] text-[#eb3942] mt-[0.375rem] inline">
          {showError && (
            <div>
              <VscError className="inline mr-2 h-5 w-5 mb-1" />
              {showError}
            </div>
          )}
        </p>
        <button
          type="submit"
          className="w-full p-2 bg-[rgb(229,9,20)] hover:bg-red-600  text-xl rounded-[0.1875rem]"
          onClick={handlevalidation}
        >
          {isSignInForm ? "Login" : "Sign Up"}
        </button>
        <div className="mx-auto p-2">
          <p>Forgot Password?</p>
        </div>
        <div className="flex items-center space-x-2 ">
          <input
            type="checkbox"
            name="rememberme"
            className="h-5 w-5 text-blue-600"
          ></input>
          <label
            htmlFor="rememberme"
            className="inline-flex items-center cursor-pointer p-2"
          >
            Remember Me
          </label>
        </div>
        <div className="inline-flex text-lg">
          <p className=" text-[#ffffffb3] text-left">
            {isSignInForm ? "New to Netflix?" : "Already a User"}{" "}
          </p>
          <span
            className="font-[500] mx-2 cursor-pointer"
            onClick={() => handleSignIn()}
          >
            {isSignInForm ? "Sign up now" : "Sign in now"}
          </span>
        </div>
        <div className="inline-flex">
          <p className=" text-[#ffffffb3] text-sm">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.
            <span
              className="  text-sm text-blue-700 cursor-pointer mx-2"
              onClick={handleShowData}
            >
              {showData ? (
                <p className="text-[#ffffffb3]">
                  {LEARN_MORE_TEXT1}
                  <a
                    href={GOOGLE_POLICIES_URL}
                    className="underline text-blue-700"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a
                    href={GOOGLE_TOS_URL}
                    className="underline text-blue-700"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms of Service
                  </a>
                  {LEARN_MORE_TEXT2}
                </p>
              ) : (
                "Learn more"
              )}
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
