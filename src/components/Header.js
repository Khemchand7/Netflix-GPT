import { FaSearch } from "react-icons/fa";
import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { NETFLIX_LOGO, SUPPORTED_LANGUAGE } from "../utils/constants";
import { toggleGptSearch } from "../utils/GptSearchSlice";
import { setLang } from "../utils/configSlice";
import { IoLanguageSharp } from "react-icons/io5";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const navigate = useNavigate();
  const user = useSelector((store) => store?.user);
  const dispatch = useDispatch();
  const onGptSearchPage = useSelector((store) => store.gpt.showGptSearch); //change this when you make multi lang for whole web using this for rendering select box only on gpt search page
  const handleGPTPageLanguage = (e) => {
    //onchange event handler ek event generate karega jisko humne yahan catch kia hai aur uski value li hai
    //iski jagah hum useref bhi use kar sakte the
    dispatch(setLang(e.target.value));
  };
  if (!onGptSearchPage) {
    dispatch(setLang("eng")); //yahan pr ek bug solve kia hai ki jab hum gpt page se away move kar rhe the to select box me language
    //eng ho rhi thi magar page ki language same thi jo last time thi dono me difference tha
    //magar jab hum pure page pr multi lang support denge to simple ise hata dena hai aur componet se condition hata deni hai for conditional rendering.
  }

  const handleShowGppSearch = () => {
    dispatch(toggleGptSearch());
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    //this will unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <nav className="bg-gradient-to-b from-black text-white border-gray-200 px-4 lg:px-6 dark:bg-gray-800 relative">
      <div className="w-full flex flex-wrap justify-between items-center mx-auto max-w-screen-xl py-3 absolute z-[999]">
        <a href="https://flowbite.com" className="flex items-center">
          <img
            src={NETFLIX_LOGO}
            className="mr-3 w-20 h-10 sm:h-9 object-cover fill-[rgb(229,9,20)]"
            alt="Flowbite Logo"
          />
        </a>
        <div className="flex items-center lg:order-2">
          { user && <button className="font-medium rounded-lg text-xl px-4 lg:px-5 py-2 lg:py-2.5 mr-2 " onClick={handleShowGppSearch}>
            {!onGptSearchPage && <FaSearch className="inline" />} {onGptSearchPage ? "Homepage" : "Gpt Search"}
          </button>} 
          {user && <div onClick={handleSignOut} className="cursor-pointer text-white bg-[rgb(229,9,20)]  hover:bg-red-600 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
            Sign Out
          </div>}
          <button
            onClick={handleMobileMenuToggle}
            type="button"
            className="inline-flex items-center p-2 ml-1 text-xl text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className={`w-6 h-6 text-white ${isMobileMenuOpen ? "hidden" : "block"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className={`w-6 h-6 ${isMobileMenuOpen ? "block" : "hidden"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        {user && <div
          className={`${
            isMobileMenuOpen ? "flex bg-[#161616b3] w-1/2 mr-0" : "hidden"
          } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
          id="mobile-menu-2"
        >
          <ul className=" text-shadow flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
              <div
                className="block py-2 pr-4 pl-3 text-white rounded lg:bg-transparent lg:text-primary-700 lg:p-0 hover:text-white"
                aria-current="page"
              >
                Home
              </div>
            </li>
            <li>
              <div className="block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 hover:text-white">
                TV Shows
              </div>
            </li>
            <li>
              <div className="block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 hover:text-white">
                Movies
              </div>
            </li>
            <li>
              <div className="block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 hover:text-white">
                New & Popular
              </div>
            </li>
            <li>
              <div className="block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 hover:text-white">
                My List
              </div>
            </li>
            <li>
              <div className="block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 hover:text-white">
              {onGptSearchPage && (
          <select
            onChange={handleGPTPageLanguage}
            className="custom-select block mt-1 rounded-md border bg-[#161616b3] border-[#808080b3] text-white font-bold py-2 md:px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
          >
            {SUPPORTED_LANGUAGE.map((language) => (
              <option key={language.identifier} value={language.identifier}>
              <IoLanguageSharp /> {language.name}
              </option>
            ))}
          </select>
        )}

              </div>
            </li>
          </ul>
        </div>}
      </div>
    </nav>
  );
};

export default Navbar;
