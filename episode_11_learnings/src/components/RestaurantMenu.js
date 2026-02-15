import { ShimmerUi } from "./Shimmer";
import { useParams } from "react-router";
import useRestaurantMenu from "../utils/useRestaurantMenu"
import  RestaurantCategory from "./RestaurantCategory"
import { useState } from "react";

const RestaurantMenu = () => {
    const restaruantId = useParams(); //Returns an object with dynamic id in route /restaurant/123456 -- return object having resId: 123456
    const { resId } = restaruantId; //Destructur the object to get the id

    const resInfo = useRestaurantMenu(resId);

    const [showIndex, setShowIndex] = useState(null);

//Return Shimmer ui before accessing or destructing as it will lead to error, as we are fetching data after initial render under useEffect
    if(resInfo === null){
        return <ShimmerUi />
    }

    const { name, avgRating, costForTwoMessage, cuisines } = resInfo?.cards[2]?.card?.card?.info
    const { itemCards } = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card
    console.log(resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards)
    const categories = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards
    const filterList = categories.filter((item) => item?.card?.card?.["@type"] === 
"type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")
console.log(filterList);

// show accordian style restaurant menu page 
// RestaurantCategory - iterating over catergory filter array of objects, pass it as prop to <RestaurantCategory /> component
// This will show catergory title with length (data.title from props) with an arrow (like the accoriding outer part)
//This will internally call for itemList component (that will be also taking props from it for itemCards(array list of menu items for each category))
// Map over the itemCards and show a ul under divs for the menu with their name,  prices, description, image, add + button
// Then add the logic to toggle the accordion when clicking on the title div (Use a clickHandler function on outer title div in RestaurantCategory)
// which will set the state to show or not show (initially set to false), when setItem is true , then only show the itemList component.
// setShowItem(!showItem) -- toggle logic
    return (
        <div className="text-center">
            <h1 className="my-6 font-extrabold ">{name}</h1>
            <p className="font-bold text-lg">{cuisines.join(", ")} - {costForTwoMessage}</p>
            {filterList.map((item, index) => (
                 <RestaurantCategory
                  key={item.card.card.title}
                  data={item.card.card}
                  showItem = {showIndex == index ? true : false}  //show or open the itemlist for that index only
                  setShowItem= {() => setShowIndex(index)}/> //Onclick of the accordion heading , set to that index so that it
                  // opens and other collapse as for other index will not be equal to showIndex
                
            ))
            
            
            }
        </div>
    )

}

export default RestaurantMenu;