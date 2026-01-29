import RestaurantCard from "./RestaurantCard";
import { resList }from "../utils/mockData";
import { useState, useEffect } from "react";
import {ShimmerUi} from "./Shimmer";

const Body = () => {
    console.log("Body component is rendered");
    const [listOfRestaurants, setListOfRestaurants] = useState([]); //Initializing state variable as an empty array
    // keep the listofRestaurants intact here 
    //Use the below state variable to store the filtered restaurants 
    const [filteredRestaurants, setFilteredRestaurants] = useState([]); //State variable for filtered restaurants
    const [searchText, setSearchText] = useState(""); //State variable for search input
    
    //This useEffect will run once the component has rendered (means body component is rendered on the screen)
    //Accepts a callback function as the first argument and a dependency array as the second argument
    useEffect(() => {
        fetchData();  /*Function to fetch data from API after initial render*/
        console.log("useEffect is called after render");
    }, []);

    const fetchData = async() => {
        const data = await fetch("https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.97530&lng=77.59100&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING#");
        const res = await data.json();
        console.log(res);
        console.log(res.data.cards[1].card.card.gridElements.infoWithStyle.restaurants);
        setListOfRestaurants(res?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants); //Updating the state variable with the fetched data from API
        setFilteredRestaurants(res?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants); //Setting the filtered restaurants with all restaurants initially

    }

    console.log("Body component is rendered");


    //Conditional rendering - Show Shimmer UI when the data is not yet fetched from the API
    if(listOfRestaurants.length === 0){
        return <ShimmerUi />; //Showing Shimmer UI until the data is fetched from API
    }
//can do it with ternary operator also
// return (listOfRestaurants.length === 0) ? <ShimmerUi /> : (
    return (
        <div className="body">
            <div className="container">
            <div className="search-section">
                <input type="text" className="search-input" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                <button className="search-btn" onClick ={() => {
                    const filteredSearchList = listOfRestaurants.filter((res) => res.info.name.toLowerCase().includes(searchText)); //Now we are searching in the original listOfRestaurants to avoid filtering on already filtered list
                    setFilteredRestaurants(filteredSearchList); //and setting the filtered list to filteredRestaurants state variable
                }}>Search</button>
            </div>
            <div className="filter-section">
                <button className="filter-btn" onClick={() => {
                    const filteredList = listOfRestaurants.filter((restaurant) => restaurant.info.avgRating > 4.2)
                    setFilteredRestaurants(filteredList)}}>
                        Top Rated Restaurants
                        </button>
            </div>
            </div>
            <div className="res-container">
               {
                filteredRestaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.info.id} resData={restaurant} />
                ))
               }
            </div>
        </div>

    )
}
// User friendly behaviour for customers.
// page/app loads -> Render(initial render) --> fetch the data from api (we will use useEffect hook as it runs after render) --> re render the component with the new data

export default Body;