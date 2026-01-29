import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
    console.log(props); //Returns as an object containing all the props passed (here resData object is the prop passed)
    const {resData} = props; //Destructuring props to get resData object

    const {name, cuisines, avgRating, deliveryTime, costForTwo, cloudinaryImageId} = resData?.data;
    return (
        <div className="res-card">
            <img className="res-logo" src={ CDN_URL + cloudinaryImageId} />
            <h3>{name}</h3>
            <h3>{cuisines.join(", ")}</h3>
            <h3>{avgRating}</h3>
            <h3>{deliveryTime} mins</h3>
            <h3>Rs.{costForTwo/100} for Two</h3>
        </div>
    )
}

export default RestaurantCard;