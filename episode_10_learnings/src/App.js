import {lazy, Suspense} from "react";
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
// import Grocery from "./components/Grocery";

//Use lazy loading to make a different chunk of this page (load the code only when we go to the grocery page, it will create different bundle grocery.js file for it)
const Grocery = lazy(() => import("./components/Grocery")); 

const AppLayout = () => {
    return(
        <div className="layout">
            <Header />
            <Outlet />  {/** Will act as a placeholder , the outlet will be filled with the children according to the path on the page we are. (Kind of tunnel where children goes in according to their path)  */}
            <Footer />
        </div>
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