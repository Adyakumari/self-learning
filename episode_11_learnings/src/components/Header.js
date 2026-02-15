import { LOGO_IMG } from "../utils/constants";
import { useState, useContext } from "react";
import {Link} from "react-router";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/userContext";

const Header = () => {
    const [btnName, setBtnName] = useState("login");
    console.log("Header component is re-rendered"); // Uses diffing algorithm(reconciliation) but only the node being changed in the DOM is updated not the whole DOM tree

    // const contextValue = useContext(UserContext);
    // console.log("See the context value", contextValue); // It will return a object with context values {loggedInUser: 'Adya Kumari'}
    //Hence we can destructure and use the loggedInUser value
    const {loggedInUser} = useContext(UserContext); //Initially it returns the default value from createContext(if no value provided in UserContext.provider)
    //Otherwise the value provided at the UserContext.provider will be availble at everywhere in the components using context(and the components wrapped under it)
    //We can use useContext hook to access or use the data anywhere in our application so easily (context is like a global place)
    //Just use useContext(ContextName creted using createContext)

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
                    <li className="px-4"><Link to="/user">{loggedInUser}</Link></li>
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