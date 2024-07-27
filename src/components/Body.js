import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Login";
import Browse from "./Browse";
import WatchTrailer from "./WatchTrailer";


const Body = () => {

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "browse/",
      element: <Browse />,
    },
    {
      path: "/browse/watch/:id",
      element: <WatchTrailer/> ,
    },
  ]);



  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
