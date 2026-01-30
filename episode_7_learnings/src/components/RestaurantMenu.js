import { useEffect, useState } from "react";
import { MENU_API } from "../utils/constants";
import { ShimmerUi } from "./Shimmer";
import { useParams } from "react-router";

const RestaurantMenu = () => {
    const [menuItem, setMenuItem] = useState(null);
    const restaruantId = useParams(); //Returns an object with dynamic id in route /restaurant/123456 -- return object having resId: 123456
    const { resId } = restaruantId; //Destructur the object to get the id
    console.log("resid", resId);
    useEffect(() => {
      fetchMenu();
    }, []);

    const fetchMenu = async () => {
        const data = await fetch(MENU_API + resId);
        const res = await data.json();
        console.log(res);
        setMenuItem(res.data);
    }
//Return Shimmer ui before accessing or destructing as it will lead to error, as we are fetching data after initial render under useEffect
    if(menuItem === null){
        return <ShimmerUi />
    }

    const { name, avgRating, costForTwoMessage } = menuItem?.cards[2]?.card?.card?.info
    const { itemCards } = menuItem?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card

    return (
        <div className="menu-container">
            <h1>{name}</h1>
            <h2>{avgRating} stars - {costForTwoMessage}</h2>
            <ul>
                {itemCards.map((item) => 
                    <li key={item?.card?.info?.id}>{item?.card?.info?.name}</li>
                )}
            </ul>
        </div>
    )

}

export default RestaurantMenu;