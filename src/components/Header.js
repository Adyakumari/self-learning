import { LOGO_IMG } from "../utils/constants";
import { useState } from "react";
import {Link} from "react-router";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
    // let btnName = "login"; //Normal javascript variable does not cause re-rendering of the component on its value change
    //Hence we see no UI change on button click
    const [btnName, setBtnName] = useState("login");
    //This allows us to create a state variable btnName with initial value "login"
    //This altogether invokes the Header component function again (re-render) whenever the state variable is updated using setBtnName function
    //Hence the btnName is a totally a new instance of state variable that is initialized with the updated value after re render.
    //Therefore the const issue or error of reassigning value to const variable does not occur here.
    console.log("Header component is re-rendered"); // Uses diffing algorithm(reconciliation) but only the node being changed in the DOM is updated not the whole DOM tree

    const onlineStatus = useOnlineStatus();
    return (
        <div className="flex justify-between bg-pink-200 shadow-lg">
            <div className="logo-container">
                <img className="w-56"src={LOGO_IMG} />
            </div>
            <div className="flex items-center">
                <ul className="flex m-4 p-4"> 
                    <li className="px-4">Online Status:{onlineStatus ? "✅" : "🔴"}</li>
                    <li className="px-4"><Link to="/">Home</Link></li> {/** DO NOT USE anchor tag as it will reload the page again, using Link will not refresh/load the page, making it performant */} 
                    <li className="px-4"><Link to="/about">About Us</Link></li>
                    <li className="px-4"><Link to="/contact">Contact Us</Link></li>
                    <li className="px-4"><Link to="/grocery">Grocery</Link></li>
                    <li className="px-4">Cart</li>
                    <button className="login-btn" onClick={() => {
                        (btnName == "login") ? setBtnName("logout") : setBtnName("login");
                        console.log(btnName);
                        console.log("Button clicked");
                    }}>{btnName}</button>
                </ul>
            </div>
        </div>
    )
}

export default Header;