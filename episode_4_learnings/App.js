import React from "react";
import ReactDOM from "react-dom/client";

//Food ordering app 
/* Header
  - Logo
  - Nav items (Right side)
*Body 
    - Search bar
    - Restaurant Container
        - Restaurant Card (many cards)
            - Image
            - Name
            - Cuisines
            - Rating
            - Time of Delivery
*Footer
    - Copyright Information
    - Links
    - Address
    - Contact
*/

const Header = () => {
    return (
        <div className="header">
            <div className="logo-container">
                <img className="logo"src="https://i.pinimg.com/originals/34/0c/6a/340c6add7519212185a08d4205eb1965.png" />
            </div>
            <div className="nav-items">
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>Cart</li>
                </ul>
            </div>
        </div>
    )
}
const RestaurantCard = () => {
    return (
        <div className="res-card">
            <img className="res-logo" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2025/6/16/33951293-7a8d-44da-93be-5935133098bc_356343.jpg" />
            <h3>Belgian waffle</h3>
            <h3>Cuisines, Belgian waffles, desserts</h3>
            <h3>4.5 ⭐ (100+ ratings)</h3>
            <h3>30 min</h3>
        </div>
    )
}
const Body = () => {
    return (
        <div className="body">
            <div className="search">Search</div>
            <div className="res-container">
                <RestaurantCard />
                <RestaurantCard />
                <RestaurantCard />
                <RestaurantCard />
                <RestaurantCard />
                <RestaurantCard />
                <RestaurantCard />
                <RestaurantCard />
                <RestaurantCard />
                <RestaurantCard />
                <RestaurantCard />
                <RestaurantCard />
                <RestaurantCard />
                <RestaurantCard />
                <RestaurantCard />
            </div>
        </div>

    )
}

const Footer = () => {
    return (
        <div className= "footer">
            <h3>Copyright © 2023 Namaste React</h3>
            <h3>All Rights Reserved</h3>
        </div>
    )
}
const AppLayout = () => {
    return(
        <div className="layout">
            <Header />
            <Body />
            <Footer />
        </div>
    )
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);