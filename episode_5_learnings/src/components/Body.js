import RestaurantCard from "./RestaurantCard";
import { resList }from "../utils/mockData";
import { useState } from "react";

const Body = () => {
    // Local state variable -  Superpowerful react variables
    const [listOfRestaurants, setListOfRestaurants] = useState(resList);

    //Above is just araray destructuring
    //Can also be written as:

    // const arr = useState(resList);
    // const listOfRestaurants = arr[0];
    // const setListOfRestaurants = arr[1];

    //works same
    // const [listOfRestaurants, setListOfRestaurants] = arr;
    return (
        <div className="body">
            <div className="filter-section">
                <button className="filter-btn" onClick={() => {
                    const filteredList = listOfRestaurants.filter((restaurant) => restaurant.data.avgRating > 4)
                    setListOfRestaurants(filteredList)}}>
                        Top Rated Restaurants
                        </button>
            </div>
            <div className="res-container">
               {
                listOfRestaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.data.id} resData={restaurant} />
                ))
               }
            </div>
        </div>

    )
}

// Just modifying the resList (or listOfRestaurants) variable with filter logic and then rendering the RestaurantCard
//  components again will not work as React will not be able to track the changes in the variable and
//  hence will not re-render the component with updated data.

//That's why we use useState hoook to create a state variable (super powerful react variable) - 
// which helps React to track the changes in the variable

//useState is just a normal javascript function which returns an array of two elements -
// first element is the current value of the state variable
// second element is a function which is used to update the state variable


// First useState gives the current state value
// then the function setState is used to update the state value - as soon as the state variable is updated, the component re-renders with the new value
// to the listOfRestaurants state variable, we are passing the resList from mockData.js file

export default Body;