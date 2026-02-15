import RestaurantCard from "./RestaurantCard";
import { resList }from "../utils/mockData";
import { useState, useEffect } from "react";
import {ShimmerUi} from "./Shimmer";
import { Link } from "react-router";
import useOnlineStatus from "../utils/useOnlineStatus";
import { WithPromotedLabel } from "./RestaurantCard";
import UserContext from "../utils/userContext";
import { useContext } from "react";

const Body = () => {
    console.log("Body component is rendered");
    const [listOfRestaurants, setListOfRestaurants] = useState([]); //Initializing state variable as an empty array
    // keep the listofRestaurants intact here 
    //Use the below state variable to store the filtered restaurants 
    const [filteredRestaurants, setFilteredRestaurants] = useState([]); //State variable for filtered restaurants
    const [searchText, setSearchText] = useState(""); //State variable for search input


    //To modify the context value of provider
    //It also modifies it in lazy loaded compoennts as well
    //Get the stateVariable passed to the UserContext.Provider and modify it globally from anywhere
    // Will re-render every places name is being used and update with new name 
    const { loggedInUser, setUserName } = useContext(UserContext);

//Enhanced component returned by HOC
    const RestaurantCardPromoted = WithPromotedLabel(RestaurantCard);
    
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

    const onlineStatus = useOnlineStatus();

    if(onlineStatus == false){
        return <h1> Looks like you are offline !!! Please see your internet connection !!</h1>
    }


    //Conditional rendering - Show Shimmer UI when the data is not yet fetched from the API
    if(listOfRestaurants.length === 0){
        return <ShimmerUi />; //Showing Shimmer UI until the data is fetched from API
    }
//can do it with ternary operator also
// return (listOfRestaurants.length === 0) ? <ShimmerUi /> : (
    return (
        <div className="body">
            <div className="container flex items-center">
            <div className="p-4 m-4">
                <input type="text" className="bg-white border-2 border-solid rounded-lg" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                <button className="bg-green-200 m-4 w-20 rounded" onClick ={() => {
                    const filteredSearchList = listOfRestaurants.filter((res) => res.info.name.toLowerCase().includes(searchText)); //Now we are searching in the original listOfRestaurants to avoid filtering on already filtered list
                    setFilteredRestaurants(filteredSearchList); //and setting the filtered list to filteredRestaurants state variable
                }}>Search</button>
            </div>
            <div className="filter-section bg-gray-200 hover:bg-amber-50 rounded-lg">
                <button className="filter-btn" onClick={() => {
                    const filteredList = listOfRestaurants.filter((restaurant) => restaurant.info.avgRating > 4.4)
                    setFilteredRestaurants(filteredList)}}>
                        Top Rated Restaurants
                        </button>
            </div>
            <div>
                <input className="border border-black px-4" type="text" value={loggedInUser} onChange={(e) => setUserName(e.target.value)} />
            </div> {/** Here we are updating the context value on the fly using state variable passed in context, we can now change the value from our component */}
            </div>
            <div className="res-container flex flex-wrap">
               {
                filteredRestaurants.map((restaurant) => (
                   <Link key={restaurant.info.id} to={"/restaurant/" + restaurant.info.id}>
                    {restaurant.info.veg == true ? <RestaurantCardPromoted resData={restaurant}/>: <RestaurantCard resData={restaurant}/>}
                   </Link>
                ))
               } {/** //Wrapped the Restaurant card with Link component so that when we click on the card, we go to the menu page of that restaurant. */}
            </div>
        </div>

    )
}
// User friendly behaviour for customers.
// page/app loads -> Render(initial render) --> fetch the data from api (we will use useEffect hook as it runs after render) --> re render the component with the new data

export default Body;