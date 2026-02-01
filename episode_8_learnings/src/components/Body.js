import RestaurantCard from "./RestaurantCard";
import { resList }from "../utils/mockData";
import { useState, useEffect } from "react";
import {ShimmerUi} from "./Shimmer";
import { Link } from "react-router";

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
        const timer = setInterval(() => {
            console.log("SetInterval is called in useEffect..")
        }, 1000);
        // We use the return method to clear all the mess we created like setInterval otherwise it will go on running and effect performance
        //Will be called when component will unmount
        return () => {
            clearInterval(timer);
        }
    }, []);

    const fetchData = async() => {
        const data = await fetch("https://namastedev.com/api/v1/listRestaurants");
        const res = await data.json();
        console.log(res);
        console.log(res.data.data.cards[1].card.card.gridElements.infoWithStyle.restaurants)
        // console.log(res.data.cards[1].card.card.gridElements.infoWithStyle.restaurants);
        setListOfRestaurants(res.data.data.cards[1].card.card.gridElements.infoWithStyle.restaurants); //Updating the state variable with the fetched data from API
        setFilteredRestaurants(res.data.data.cards[1].card.card.gridElements.infoWithStyle.restaurants); //Setting the filtered restaurants with all restaurants initially

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
                    const filteredList = listOfRestaurants.filter((restaurant) => restaurant.info.avgRating > 4.4)
                    setFilteredRestaurants(filteredList)}}>
                        Top Rated Restaurants
                        </button>
            </div>
            </div>
            <div className="res-container">
               {
                filteredRestaurants.map((restaurant) => (
                   <Link key={restaurant.info.id} to={"/restaurant/" + restaurant.info.id}><RestaurantCard resData={restaurant} /></Link>
                ))
               } {/** //Wrapped the Restaurant card with Link component so that when we click on the card, we go to the menu page of that restaurant. */}
            </div>
        </div>

    )
}
// User friendly behaviour for customers.
// page/app loads -> Render(initial render) --> fetch the data from api (we will use useEffect hook as it runs after render) --> re render the component with the new data

export default Body;