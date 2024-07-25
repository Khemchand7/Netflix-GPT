import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { NETFLIX_LOGO, SUPPORTED_LANGUAGE } from "../utils/constants";
import { toggleGptSearch } from "../utils/GptSearchSlice";
import { setLang } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store?.user);
  const dispatch = useDispatch();
  const showSelectBox = useSelector((store) => store.gpt.showGptSearch); //change this when you make multi lang for whole web using this for rendering select box only on gpt search page

  const handleGPTPageLanguage = (e) => {
    //onchange event handler ek event generate karega jisko humne yahan catch kia hai aur uski value li hai
    //iski jagah hum useref bhi use kar sakte the
    dispatch(setLang(e.target.value));
  };

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
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className=" object-cover w-44 fill-[rgb(229,9,20)]"
        src={NETFLIX_LOGO}
        alt="Netflix Logo"
      ></img>
      <div className="flex justify-between items-center">
        {showSelectBox && (
          <select
            onChange={handleGPTPageLanguage}
            className="block mt-1 rounded-md border bg-[#161616b3] border-[#808080b3] text-white font-bold py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {SUPPORTED_LANGUAGE.map((language) => (
              <option key={language.identifier} value={language.identifier}>
                {language.name}
              </option>
            ))}
          </select>
        )}
        {user && (
          <div className="flex justify-between items-center">
            <button
              onClick={handleShowGppSearch}
              className="font-bold text-xl text-white p-2 m-2"
            >
              Gpt Search
            </button>
            <img
              src={user?.photoURL}
              alt="PhotURL"
              className="object-cover h-10 w-10"
            ></img>
            <button
              onClick={handleSignOut}
              className="font-bold text-xl text-white p-2 m-2"
            >
              Signout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
