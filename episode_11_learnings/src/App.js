import {lazy, Suspense, useEffect, useState} from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import { createBrowserRouter , RouterProvider} from "react-router";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import {Outlet} from "react-router";
import RestaurantMenu from "./components/RestaurantMenu";
import UserContext from "./utils/userContext";
import { useState, useEffect } from "react";
// import Grocery from "./components/Grocery";

//Use lazy loading to make a different chunk of this page (load the code only when we go to the grocery page, it will create different bundle grocery.js file for it)
const Grocery = lazy(() => import("./components/Grocery")); 

//We will wrap our layout component with UserContext.Provider with value (that will override all the default value from createContext)
//In this way we can modify the default values of context. Whatever value passed here will be provided to all components
//Kind of global space, accessible anywheres

//If we wrap only our header component using UserContext.Provider , then header will have only that value. 
//Means component inside it will use those values
//We can use different UserContext.Provider for different component with different values as well. like for header
//  <UserContext.Provider value={{loggedInUser: "Neelam"}}>  Will update the name for header with Neelam and other will have Abhishek
//We can use nested Context Provider as well, like UserContext.Provider, then DialogContext.Provider, then CookieContext.Provider
const AppLayout = () => {

  //We can use state variable to update context values as well like we fetch data from somewhere and update userName.
  const[userName, setUserName ] = useState(null)

  useEffect(() => {
   const data = {
    loggedInUser: "Abhishek Kumar"
   }
   setUserName(data.loggedInUser);
}, [])
    return(
      <UserContext.Provider value={{loggedInUser: userName, setUserName}}> 
        <div className="layout">
           {/* <UserContext.Provider value={{loggedInUser: "Abhishek"}}>     //Abhishek will only show on header, other gets default value */} 
            <Header />
            {/* </UserContext.Provider> */}
            <Outlet />  {/** Will act as a placeholder , the outlet will be filled with the children according to the path on the page we are. (Kind of tunnel where children goes in according to their path)  */}
            <Footer />
        </div>
      </UserContext.Provider>
    )
}

//Defined my routing configuration using CreateBrowserRouter
{/**Add child routes for dynamically rendering the component based on paths */}
//If at "/" route --> outlet is replaced with Body , if "/about" --> outlet is replaced with <About /> 
//Hence we will have Header remain intact on every page, and we are not reloading the page , just the component changes based on the path.
//Known as Single Page Application (SPA) - achived via client side routing (we are not making any network calls), just loading the page or component based on path
const appRouter = createBrowserRouter([
  {
    path: "/", 
    element: <AppLayout />,
    children:[
    {
      path: "/", 
      element: <Body />
    },
    {
      path: "/about",
      element: <About /> 
    }, 
    {
      path: "/contact",
      element: <Contact />
    },
     {
      path: "/grocery",
      element: <Suspense fallback={<h1>Loading....</h1>}><Grocery /></Suspense> //We wrap the component under Suspense with a fallback ui until the grocery component loads and it does not give us any error 
    },
    {
      path: "/restaurant/:resId",
      element: <RestaurantMenu /> 
    }
    ],
    errorElement: <Error />
  },
  // resId is dynamic id here,
  // that's why we have written it like :resID  we can access RestaurantMenu component at /restaurant/123(any dynamic id) */}
  // {
  //     path: "/about",
  //     element: <About /> 
  //   }, 
  //   {
  //     path: "/contact",
  //     element: <Contact />
  //   }
])
const root = ReactDOM.createRoot(document.getElementById("root"));
//Rendering the RouterProvider with the routing configuration
root.render(<RouterProvider router={appRouter} />);