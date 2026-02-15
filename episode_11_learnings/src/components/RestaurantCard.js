import { CDN_URL } from "../utils/constants";
import UserContext from "../utils/userContext";
import { useContext } from "react";

const RestaurantCard = (props) => {
    console.log(props); //Returns as an object containing all the props passed (here resData object is the prop passed)
    const {resData} = props; //Destructuring props to get resData object

     const {loggedInUser } = useContext(UserContext);
     //We can access it anywhere , Restaurant cards as well will show the loggedInUser

    const {name, cuisines, avgRating, deliveryTime, costForTwo, cloudinaryImageId, sla} = resData?.info;
    return (
        <div className="res-card p-4 m-4 bg-amber-100 hover:bg-gray-200">
            <img className="res-logo w-50 rounded-2xl" src={ CDN_URL + cloudinaryImageId} />
            <h3>{name}</h3>
            <h3>{cuisines.join(", ")}</h3>
            <h3>{avgRating} stars</h3>
            <h3>{sla.deliveryTime} mins</h3>
            <h3>{costForTwo}</h3>
            <h3>{loggedInUser}</h3> 
        </div>
    )
}


//Higher Order component (HOC) - these are like normal javascript functions that takes component as input and returns a component as output.
//Takes in a component as input(like RestaurantCard) --> enhances it --> return the enhanced compoent(these are also normal javascript functions as we know) as output

//To write HOCs define the contract first (input and output) -- i.e input component it takes and output component it will return 
export const WithPromotedLabel = (RestaurantCard) => {
    return (props) => {
        return(
        <div>
        <label className="bg-black text-white absolute p-2 m-2 rounded-lg">Promoted</label>
        <RestaurantCard {...props} />
        </div>
        );
    }
}

export default RestaurantCard;